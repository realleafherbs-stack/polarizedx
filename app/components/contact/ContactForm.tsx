"use client";

import { useState } from "react";
import { Assistant } from "next/font/google";

const assistant = Assistant({ subsets: ["hebrew", "latin"], weight: "variable" });

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="w-full bg-white py-12">
      <div dir="rtl" className={`${assistant.className} mt-10 mx-auto max-w-lg px-6 text-center text-black`}>
        <h2 className="text-5xl lg:text-6xl font-bold">יצירת קשר</h2>
        <p className="mt-2 text-2xl lg:text-3xl text-black">השאירו פרטים ונציג יחזור אליכם בהקדם</p>

        {status === "sent" ? (
          <p className="mt-10 text-xl font-bold text-black">תודה! פנייתך נשלחה בהצלחה.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5 text-right">
            <label className="flex flex-col gap-1.5">
              <span className="text-lg text-black">שם פרטי/ עסק</span>
              <input
                type="text"
                required
                placeholder="שם פרטי/ עסק"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                dir="rtl"
                className="rounded-md border border-black px-5 py-3.5 text-lg text-black outline-none placeholder:text-black focus:border-black"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-lg text-black">טלפון</span>
              <input
                type="tel"
                required
                placeholder="טלפון"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                dir="rtl"
                className="rounded-md border border-black px-5 py-3.5 text-lg text-black outline-none placeholder:text-black focus:border-black"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-lg text-black">אימייל</span>
              <input
                type="email"
                required
                placeholder="אימייל"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                dir="rtl"
                className="rounded-md border border-black px-5 py-3.5 text-lg text-black outline-none placeholder:text-black focus:border-black"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-lg text-black">הודעה</span>
              <textarea
                placeholder="הודעה"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                dir="rtl"
                className="resize-none rounded-md border border-black px-5 py-3.5 text-lg text-black outline-none placeholder:text-black focus:border-black"
              />
            </label>
            <div className="mt-2 flex flex-col items-center gap-3">
              {status === "error" && (
                <p className="text-sm font-bold text-red-600">שגיאה בשליחה, נסה שוב מאוחר יותר.</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-black px-12 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "שולח..." : "שליחה"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
