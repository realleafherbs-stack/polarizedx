"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<"confirming" | "done" | "error">("confirming");

  useEffect(() => {
    const orderId = searchParams.get("Order");
    if (!orderId) {
      setStatus("error");
      return;
    }
    fetch("/api/payment/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error ?? "Order confirmation failed");
        clearCart();
        setStatus("done");
      })
      .catch(() => setStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main dir="rtl" className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      {status === "confirming" && <p className="text-lg text-zinc-600">מאשר את ההזמנה...</p>}
      {status === "done" && (
        <>
          <h1 className="text-3xl font-bold text-black">התשלום התקבל בהצלחה!</h1>
          <p className="text-zinc-600">שלחנו לך מייל אישור עם פרטי ההזמנה.</p>
        </>
      )}
      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold text-black">התשלום עבר, אך אירעה שגיאה באישור ההזמנה</h1>
          <p className="text-zinc-600">אנא צרו קשר איתנו ונוודא שההזמנה נקלטה.</p>
        </>
      )}
      <Link href="/shop" className="mt-4 rounded-md bg-black px-6 py-3 text-sm font-semibold text-white">
        המשך בקניות
      </Link>
    </main>
  );
}
