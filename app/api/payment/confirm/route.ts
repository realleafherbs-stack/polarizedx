import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { orderId } = await req.json();
  if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

  try {
    const res = await fetch(
      `${process.env.CRM_URL}/api/${process.env.CRM_SITE_SLUG}/orders/${orderId}/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.CRM_API_KEY!,
        },
      }
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[payment/confirm] CRM call failed:", err);
    return NextResponse.json({ error: "CRM unavailable" }, { status: 502 });
  }
}
