"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

const DEEP = "#171714";
const ON_DEEP = "#f8f8f5";
const ACCENT = "#c5a43a";
const INK = "#11110f";
const MUTED = "#5c5a52";
const LINE = "#c9c6bc";
const SURFACE = "#f8f8f5";

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" className="h-9 w-9 sm:h-11 sm:w-11">
      <circle cx="24" cy="24" r="22" stroke={ACCENT} strokeWidth="2" />
      <path d="M14.5 24.5 20.5 30.5 33.5 17.5" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const orderId = searchParams.get("Order");

  useEffect(() => {
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main dir="rtl">
      <section
        className="relative overflow-hidden border-b-[3px] px-6 py-16 text-center sm:py-20"
        style={{ background: DEEP, borderColor: ACCENT }}
      >
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
          <CheckIcon />
          <h1 className="text-3xl font-black sm:text-4xl" style={{ color: ON_DEEP }}>
            התשלום התקבל בהצלחה!
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "rgba(248,248,245,.76)" }}>
            שלחנו לך מייל אישור עם פרטי ההזמנה.
          </p>
          {orderId && (
            <p dir="ltr" className="mt-1 text-sm font-bold tracking-wide" style={{ color: ACCENT }}>
              #{orderId}
            </p>
          )}
        </div>
      </section>

      <section style={{ background: SURFACE }}>
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 px-6 py-12 sm:grid-cols-3 sm:py-16">
          {[
            { step: "01", text: "אורזים את ההזמנה שלך במחסן." },
            { step: "02", text: "מקבלים SMS עם קישור למעקב אחר המשלוח." },
            { step: "03", text: "המשלוח מגיע אליך עד 3 ימי עסקים." },
          ].map(({ step, text }) => (
            <div key={step} className="border-t-2 pt-3 text-center sm:text-right" style={{ borderColor: ACCENT }}>
              <span dir="ltr" className="text-xs font-black tracking-widest" style={{ color: ACCENT }}>
                {step}
              </span>
              <p className="mt-1 text-sm" style={{ color: MUTED }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16" style={{ background: SURFACE }}>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 border-t pt-10 sm:flex-row sm:justify-center" style={{ borderColor: LINE }}>
          <Link
            href="/shop"
            className="inline-flex min-h-12.5 w-full items-center justify-center px-8 text-lg font-black transition-transform hover:-translate-y-0.5 sm:w-auto"
            style={{ background: INK, color: SURFACE }}
          >
            המשך בקניות
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12.5 w-full items-center justify-center border px-8 text-lg font-black transition-colors hover:bg-black hover:text-white sm:w-auto"
            style={{ borderColor: INK, color: INK }}
          >
            צור קשר
          </Link>
        </div>
      </section>
    </main>
  );
}
