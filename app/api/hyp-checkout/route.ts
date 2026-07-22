import { NextRequest, NextResponse } from "next/server";
import { getProducts, SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "../../../lib/products";
import { calculateItemsTotal } from "../../../lib/pricing";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  variantId?: string;
}

export interface HypCheckoutBody {
  coupon?: string;
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    houseNumber: string;
    apartment?: string;
    address: string; // pre-built full street string
    city: string;
    notes?: string;
  };
  items?: CartItem[];
}

export async function POST(req: NextRequest) {
  const masof = process.env.HYP_MASOF;
  const key = process.env.HYP_KEY;
  const passP = process.env.HYP_PASSP;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!masof || !key || !passP) {
    return NextResponse.json(
      { error: "Hyp Pay credentials not configured. Set HYP_MASOF, HYP_KEY, HYP_PASSP in .env.local" },
      { status: 500 }
    );
  }

  const body: HypCheckoutBody = await req.json();
  const { coupon, customer, items } = body;

  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const products = await getProducts();
  const pricedItems: { price: number; qty: number }[] = [];
  for (const item of items) {
    const product = products.find((p) => p.id === item.id || p.variantId === item.id);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${item.id}` }, { status: 400 });
    }
    pricedItems.push({ price: product.price, qty: item.qty });
  }
  const itemsTotal = calculateItemsTotal(pricedItems);

  let discount = 0;
  if (coupon) {
    try {
      const couponRes = await fetch(
        `${process.env.CRM_URL}/api/${process.env.CRM_SITE_SLUG}/validate-coupon`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: coupon }),
        }
      );
      if (couponRes.ok) {
        const couponData = await couponRes.json();
        discount =
          couponData.type === "PERCENT"
            ? Math.round(((itemsTotal * couponData.value) / 100) * 100) / 100
            : Math.min(couponData.value, itemsTotal);
      }
    } catch {
      // Coupon service unreachable — proceed without a discount rather than block checkout.
    }
  }

  const shipping = itemsTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const amount = Math.max(0, itemsTotal - discount) + shipping;

  if (amount <= 0) {
    return NextResponse.json({ error: "Invalid order total" }, { status: 400 });
  }

  // Generated server-side — never trust a client-supplied order id.
  const orderId = `PX-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

  // Save pending order to CRM (best-effort — don't block payment if CRM is down)
  if (customer && items?.length) {
    try {
      await fetch(`${process.env.CRM_URL}/api/${process.env.CRM_SITE_SLUG}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.CRM_API_KEY!,
        },
        body: JSON.stringify({ id: orderId, total: amount, shipping, discount, coupon, customer, items }),
      });
    } catch {
      // Non-fatal
    }
  }

  const params = new URLSearchParams({
    action: "APISign",
    What: "SIGN",
    Sign: "True",
    KEY: key,
    PassP: passP,
    Masof: masof,
    Amount: String(amount),
    Coin: "1",
    Order: orderId,
    PageLang: "HEB",
    sendemail: "True",
    MoreData: "True",
    tmp: "2",
    SuccessUrl: `${siteUrl}/payment/success`,
    ErrorUrl: `${siteUrl}/payment/failure`,
  });

  let signedParams: string;
  try {
    const resp = await fetch(`https://pay.hyp.co.il/p/?${params.toString()}`);
    signedParams = await resp.text();
  } catch (err) {
    console.error("Hyp APISign request failed:", err);
    return NextResponse.json({ error: "Failed to connect to Hyp Pay" }, { status: 502 });
  }

  if (signedParams.includes("CCode=") && !signedParams.includes("action=pay")) {
    return NextResponse.json({ error: "Hyp Pay returned an error", details: signedParams }, { status: 400 });
  }

  const paymentUrl = `https://pay.hyp.co.il/p/?${signedParams}`;
  return NextResponse.json({ paymentUrl });
}
