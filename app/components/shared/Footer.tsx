"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const collection = [
  { label: "WOOD X", href: "/shop/wood-x-polarized-sunglasses" },
  { label: "WILD X", href: "/shop/wild-x-polarized-sunglasses" },
  { label: "MULTICOLOR X", href: "/shop/multicolor-x-polarized-sunglasses" },
  { label: "BLUE X", href: "/shop/blue-x-polarized-sunglasses" },
  { label: "BLACK X", href: "/shop/black-x-polarized-sunglasses" },
  { label: "CLEAR X", href: "/shop/clear-x-polarized-sunglasses" },
];

const brand = [
  { label: "הסיפור שלנו", href: "/about" },
  { label: "B2B לבעלי עסקים", href: "/b2b" },
  { label: "שאלות נפוצות", href: "/faq" },
  { label: "צור קשר", href: "/contact" },
];

const service = [
  { label: "מדיניות משלוחים", href: "/shipping" },
  { label: "תקנון ותנאי שימוש", href: "/terms-of-service" },
  { label: "מדיניות פרטיות", href: "/privacy" },
  { label: "הצהרת נגישות", href: "/accessibility" },
];

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "שגיאה בהרשמה");
        return;
      }
      setStatus("success");
      setMessage("נרשמת בהצלחה!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("שגיאה בהרשמה. אנא נסה שוב.");
    }
  }

  return (
    <div>
      <h4 className="text-gold mb-1 text-xl font-black">הישארו מעודכנים</h4>
      <p className="mb-2 leading-relaxed text-zinc-400">
        קולקציה חדשה כל שנה. היו הראשונים לדעת.
      </p>
      <label htmlFor="newsletter-email" className="mb-1 block font-bold text-zinc-200">
        כתובת אימייל
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="כתובת אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          dir="rtl"
          className="min-h-12 min-w-0 flex-1 border border-zinc-700 bg-black px-3 text-white outline-none placeholder:text-zinc-500 focus-visible:border-gold"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="bg-gold min-h-12 shrink-0 whitespace-nowrap px-5 font-bold text-black transition-colors hover:bg-[#e0bd48] disabled:opacity-60"
        >
          {status === "loading" ? "נרשם..." : "הרשמה"}
        </button>
      </div>
      <p className={`mt-2 min-h-[1.3em] font-bold ${status === "success" ? "text-green-400" : status === "error" ? "text-red-400" : "text-zinc-400"}`}>
        {message}
      </p>
    </div>
  );
}

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-gold mb-2 text-xl font-black">{title}</h4>
      <ul className="flex flex-col gap-1.5 text-zinc-400">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-6 w-6 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function LinkAccordion({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="text-gold flex w-full items-center justify-between py-4 text-xl font-black"
      >
        <span>{title}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <ul className="flex flex-col gap-1.5 pb-4 text-zinc-300">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/972587991094"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="וואטסאפ"
      className="fixed bottom-5 left-5 z-90 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-107"
      style={{ background: "#25d366", boxShadow: "0 6px 18px rgba(0,0,0,.45)" }}
    >
      <svg viewBox="0 0 32 32" className="h-7.5 w-7.5" fill="#fff">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.6.8 5 2.3 7L4 29l7.2-2.2c1.9 1 4 1.6 6.2 1.6h.6c6.6 0 12-5.4 12-12S22.6 3 16 3zm7 17.2c-.3.8-1.7 1.6-2.4 1.7-.6.1-1.4.1-2.2-.1-.5-.2-1.2-.4-2-.8-3.6-1.5-5.9-5.1-6.1-5.4-.2-.2-1.4-1.9-1.4-3.6s.9-2.5 1.2-2.9c.3-.3.7-.4.9-.4h.7c.2 0 .5-.1.8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.6.7c-.2.2-.4.4-.2.8.2.3 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.4.2.6.1.8-.1.2-.2.9-1 1.1-1.4.2-.3.5-.3.8-.2.3.1 2.1 1 2.4 1.2.4.2.6.3.7.4.1.3.1.9-.3 1.7z" />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <>
      <footer dir="rtl" className="text-white" style={{ background: "#080808", borderTop: "1px solid #2a2a2a" }}>
        <div className="site-container px-6 py-10 lg:px-12">
          <div className="mb-8 text-center md:text-right">
            <Image src="/logo/logo2w.png" alt="POLARIZED-X" width={220} height={17} className="mx-auto h-4.5 w-auto md:mx-0" />
          </div>

          {/* Mobile: accordions */}
          <div className="md:hidden">
            <LinkAccordion title="הקולקציה" links={collection} />
            <LinkAccordion title="המותג" links={brand} />
            <LinkAccordion title="שירות" links={service} />
            <div className="border-t border-white/10 py-6">
              <h4 className="text-gold mb-2 text-xl font-black">דברו איתנו</h4>
              <a href="https://wa.me/972587991094" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-zinc-400 transition-colors hover:text-white">
                וואטסאפ: 058-799-1094
              </a>
            </div>
            <div className="border-t border-white/10 pt-6">
              <Newsletter />
            </div>
          </div>

          {/* Desktop: 5-column grid */}
          <div className="hidden gap-8 md:grid" style={{ gridTemplateColumns: "1.15fr repeat(4,minmax(0,1fr))" }}>
            <LinkColumn title="הקולקציה" links={collection} />
            <LinkColumn title="המותג" links={brand} />
            <LinkColumn title="שירות" links={service} />
            <div>
              <h4 className="text-gold mb-2 text-xl font-black">דברו איתנו</h4>
              <a href="https://wa.me/972587991094" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-zinc-400 transition-colors hover:text-white">
                וואטסאפ: 058-799-1094
              </a>
            </div>
            <Newsletter />
          </div>

          {/* Legal bar */}
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-zinc-400">
            <p className="mb-2 text-xl font-black text-white">קלאסיקה אמיתית שהולכת איתך.</p>
            <p className="text-sm">© 2026 POLARIZED-X · B2B MARKT LTD יבואנית בלעדית · המרכבה 25, חולון</p>
          </div>
        </div>
      </footer>
      <WhatsAppFloat />
    </>
  );
}
