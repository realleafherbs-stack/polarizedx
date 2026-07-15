"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

type Step = "shipping" | "payment";

function FormField({
  label, name, type = "text", value, onChange, placeholder, showError,
}: {
  label: string; name: string; type?: string;
  value: string; onChange: (v: string) => void; placeholder?: string; showError?: boolean;
}) {
  const invalid = showError && !value.trim();
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-zinc-600">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        dir="rtl"
        className={`w-full border px-4 py-3 text-sm text-black outline-none transition-colors ${
          invalid ? "border-red-400 bg-red-50" : "border-zinc-300 bg-white focus:border-black"
        }`}
      />
      {invalid && <span className="text-xs text-red-500">שדה חובה</span>}
    </div>
  );
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}

export default function CheckoutPage() {
  const { items, total, savings } = useCart();
  const shipping = total >= 199 ? 0 : 29;

  const [step, setStep] = useState<Step>("shipping");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; type: string; value: number } | null>(null);

  const discount = appliedCoupon
    ? appliedCoupon.type === "PERCENT"
      ? Math.round(((total * appliedCoupon.value) / 100) * 100) / 100
      : Math.min(appliedCoupon.value, total)
    : 0;
  const finalTotal = Math.max(0, total - discount) + shipping;

  async function handleCoupon() {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CRM_URL}/api/${process.env.NEXT_PUBLIC_CRM_SITE_SLUG}/validate-coupon`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: couponCode }),
        }
      );
      const data = await res.json();
      if (!res.ok) setCouponError(data.error ?? "קוד קופון לא תקין");
      else {
        setAppliedCoupon(data);
        setCouponCode("");
      }
    } catch {
      setCouponError("שגיאה באימות הקופון");
    }
    setCouponLoading(false);
  }

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    street: "", houseNumber: "", apartment: "", city: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const set = (key: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const isShippingValid =
    form.firstName.trim() && form.lastName.trim() && form.email.trim() &&
    form.phone.trim() && form.street.trim() && form.houseNumber.trim() && form.city.trim();

  function handleContinue() {
    setSubmitted(true);
    if (isShippingValid) setStep("payment");
  }

  async function handlePay() {
    if (!termsAccepted) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    setLoading(true);
    setError(null);
    try {
      const fullAddress = `${form.street} ${form.houseNumber}${form.apartment ? ` דירה ${form.apartment}` : ""}`;
      const res = await fetch("/api/hyp-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalTotal,
          shipping,
          discount,
          coupon: appliedCoupon?.code,
          customer: { ...form, address: fullAddress },
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty, variantId: i.variantId ?? "" })),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error ?? "שגיאה בחיבור לשער התשלומים");
        setLoading(false);
        return;
      }

      window.location.href = data.paymentUrl;
    } catch {
      setError("שגיאה בחיבור לשער התשלומים. אנא נסה שוב.");
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="w-full bg-white pt-32 pb-16">
        <div dir="rtl" className="site-container px-6 lg:px-12">
          <h1 className="text-3xl font-bold text-black lg:text-4xl">קופה</h1>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10">
            {/* Form */}
            <div className="order-2 flex flex-col gap-6 lg:order-1 lg:col-span-2">
              {/* Step tabs */}
              <div className="flex gap-2">
                {(["shipping", "payment"] as Step[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => s === "shipping" && setStep("shipping")}
                    className={`border px-5 py-2 text-sm font-semibold transition-colors ${
                      step === s
                        ? "border-black bg-black text-white"
                        : "border-zinc-300 text-zinc-500"
                    }`}
                  >
                    {s === "shipping" ? "פרטי משלוח" : "תשלום"}
                  </button>
                ))}
              </div>

              {/* Step 1: Shipping */}
              {step === "shipping" && (
                <div className="flex flex-col gap-5 border border-zinc-200 p-6">
                  <h2 className="text-lg font-bold text-black">פרטים אישיים</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField label="שם פרטי" name="firstName" value={form.firstName} onChange={set("firstName")} showError={submitted} />
                    <FormField label="שם משפחה" name="lastName" value={form.lastName} onChange={set("lastName")} showError={submitted} />
                  </div>
                  <FormField label="אימייל" name="email" type="email" value={form.email} onChange={set("email")} showError={submitted} />
                  <FormField label="טלפון" name="phone" type="tel" value={form.phone} onChange={set("phone")} showError={submitted} />

                  <h2 className="pt-2 text-lg font-bold text-black">כתובת למשלוח</h2>
                  <FormField label="רחוב" name="street" value={form.street} onChange={set("street")} showError={submitted} />
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <FormField label="מספר בית" name="houseNumber" value={form.houseNumber} onChange={set("houseNumber")} showError={submitted} />
                    <FormField label="דירה" name="apartment" value={form.apartment} onChange={set("apartment")} />
                  </div>
                  <FormField label="עיר" name="city" value={form.city} onChange={set("city")} showError={submitted} />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-zinc-600">הערות להזמנה (אופציונלי)</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={(e) => set("notes")(e.target.value)}
                      placeholder="לדוגמה קומה, קוד כניסה / בקשות נוספות"
                      dir="rtl"
                      rows={3}
                      className="w-full resize-none border border-zinc-300 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-black"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleContinue}
                    className="mt-2 w-full self-start bg-black px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-zinc-800 sm:w-auto"
                  >
                    המשך לתשלום
                  </button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === "payment" && (
                <div className="flex flex-col gap-6 border border-zinc-200 p-6">
                  <h2 className="text-lg font-bold text-black">תשלום מאובטח</h2>

                  <div className="flex flex-col gap-2 bg-zinc-50 p-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">שם</span>
                      <span className="font-medium text-black">{form.firstName} {form.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">אימייל</span>
                      <span className="font-medium text-black">{form.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">כתובת</span>
                      <span className="font-medium text-black">
                        {form.street} {form.houseNumber}{form.apartment ? ` דירה ${form.apartment}` : ""}, {form.city}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="mt-1 self-start text-xs text-black underline transition-opacity hover:opacity-60"
                    >
                      ערוך פרטים
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                      type="button"
                      onClick={handlePay}
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 bg-black py-4 text-base font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <LockIcon />
                      {loading ? "מעבד..." : "לתשלום מאובטח"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary sidebar */}
            <div className="order-1 lg:order-2 lg:col-span-1">
              <div className="flex flex-col gap-4 border border-zinc-200 p-6 lg:sticky lg:top-24">
                <h2 className="text-lg font-bold text-black">סיכום הזמנה</h2>
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      {item.image && (
                        <Image src={item.image} alt={item.name} width={48} height={48} className="h-12 w-12 shrink-0 object-contain" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-black">{item.name}</p>
                        <p className="text-xs text-zinc-500">× {item.qty}</p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-black">₪{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 border-t border-zinc-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">סכום ביניים</span>
                    <span className="text-black">₪{total.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">חיסכון בזוג שני</span>
                      <span className="text-green-600">-₪{savings.toFixed(2)}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">הנחה ({appliedCoupon?.code})</span>
                      <span className="text-green-600">-₪{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">משלוח</span>
                    <span className="text-black">{shipping === 0 ? "חינם" : `₪${shipping}`}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-base font-bold text-black">
                    <span>סה״כ</span>
                    <span>₪{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-zinc-200 pt-4">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-green-600">✓ קוד {appliedCoupon.code} הוחל</span>
                      <button type="button" onClick={() => setAppliedCoupon(null)} className="text-xs text-zinc-500 underline">
                        הסר
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === "Enter" && handleCoupon()}
                        placeholder="קוד קופון"
                        dir="rtl"
                        className="flex-1 border border-zinc-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
                      />
                      <button
                        type="button"
                        onClick={handleCoupon}
                        disabled={couponLoading}
                        className="bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                      >
                        {couponLoading ? "…" : "החל"}
                      </button>
                    </div>
                  )}
                  {couponError && <p className="text-xs text-red-600">{couponError}</p>}
                </div>

                <div className="flex flex-col gap-3 border-t border-zinc-200 pt-4">
                  <label className="flex cursor-pointer items-start gap-2">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => {
                        setTermsAccepted(e.target.checked);
                        if (e.target.checked) setTermsError(false);
                      }}
                      className="mt-0.5 shrink-0 accent-black"
                    />
                    <span className={`text-xs ${termsError ? "text-red-600" : "text-zinc-600"}`}>
                      קראתי ואני מסכים/ה{" "}
                      <a href="/terms-of-service" target="_blank" className="font-semibold text-black underline">
                        לתנאי השימוש
                      </a>{" "}
                      *
                    </span>
                  </label>
                  {termsError && <p className="-mt-2 text-xs text-red-600">יש לאשר את תנאי השימוש להמשך</p>}
                  <label className="flex cursor-pointer items-start gap-2">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-0.5 shrink-0 accent-black"
                    />
                    <span className="text-xs text-zinc-600">מאשר/ת לקבל מבצעים והנחות במייל</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
