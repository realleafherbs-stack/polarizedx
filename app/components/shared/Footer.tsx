"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const collection = [
  { label: "BLACK X", href: "/shop/black-x-polarized-sunglasses" },
  { label: "MULTICOLOR X", href: "/shop/multicolor-x-polarized-sunglasses" },
  { label: "WOOD X", href: "/shop/wood-x-polarized-sunglasses" },
  { label: "WILD X", href: "/shop/wild-x-polarized-sunglasses" },
  { label: "BLUE X", href: "/shop/blue-x-polarized-sunglasses" },
  { label: "CLEAR X", href: "/shop/clear-x-polarized-sunglasses" },
];

const brand = [
  { label: "צור קשר", href: "/contact" },
  { label: "הסיפור B2B", href: "/b2b" },
  { label: "האיכות", href: "/about" },
  { label: "קמעונאים", href: "/b2b" },
  { label: "שאלות נפוצות", href: "/faq" },
];

const service = [
  { label: "מדיניות פרטיות", href: "/privacy" },
  { label: "הצהרת נגישות", href: "/accessibility" },
  { label: "תקנון ותנאי שימוש", href: "/terms-of-service" },
  { label: "מדיניות משלוחים", href: "/shipping" },
];

const trustBadges = [
  { label: "שירות לקוחות", sub: "זמינות ומענה מקצועי", icon: "/icn/Group84.png" },
  { label: "משלוח מהיר", sub: "עד 3 ימי עסקים", icon: "/icn/Group82.png" },
  { label: "אחריות מלאה", sub: "החלפה ורכישה מאובטחת", icon: "/icn/Group83.png" },
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
    <div className="mt-8 text-center md:mt-0">
      <p className="text-sm leading-relaxed text-zinc-300">
        הישאר מעודכן קולקציה חדשה כל שנה.
        <br />
        תהיה הראשון לדעת.
      </p>
      <div className="mx-auto mt-4 flex max-w-xs flex-col gap-3">
        <input
          type="email"
          placeholder="כתובת אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          dir="rtl"
          className="w-full rounded-md border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full rounded-md bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90 disabled:opacity-60"
        >
          {status === "loading" ? "נרשם..." : "הרשמה"}
        </button>
        {message && (
          <p className={`text-xs ${status === "success" ? "text-green-400" : "text-red-400"}`}>{message}</p>
        )}
      </div>
    </div>
  );
}

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="text-center">
      <h3 className="text-sm font-semibold tracking-wide text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="transition-colors hover:text-white">
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
      className={`h-8 w-8 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
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
        className="flex w-full items-center justify-between py-4 text-2xl font-semibold text-white"
      >
        <span>{title}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <ul className="space-y-2.5 pb-4 text-center text-base text-white">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="site-container flex flex-col px-6 py-10 lg:px-12">

        {/* Brand row */}
        <div className="order-3 flex flex-col items-center gap-2 pb-8 text-center md:order-1 md:flex-row md:gap-6 md:text-right">
          <Image src="/logo/logo2w.png" alt="POLARIZED-X" width={160} height={46} className="h-3 w-auto" />
          <span className="text-sm text-zinc-400">קלסיקה אמיתית שהולכת איתך.</span>
        </div>

        <div className="order-4 border-t border-white/10 md:order-2" />

        {/* Columns */}
        <div className="order-1 py-10 md:order-3 md:grid md:grid-cols-4 md:gap-10">
          {/* Mobile: accordions */}
          <div dir="rtl" className="md:hidden">
            <LinkAccordion title="הקולקציה" links={collection} />
            <LinkAccordion title="המותג" links={brand} />
            <LinkAccordion title="שירות" links={service} />
          </div>

          {/* Desktop: static columns */}
          <div className="hidden md:contents">
            <LinkColumn title="הקולקציה" links={collection} />
            <LinkColumn title="המותג" links={brand} />
            <LinkColumn title="שירות" links={service} />
          </div>

          {/* Newsletter */}
          <Newsletter />
        </div>

        <div className="order-2 border-t border-white/10 md:order-4" />

        {/* Trust badges */}
        <div dir="rtl" className="order-5 grid grid-cols-1 items-center justify-items-center gap-y-8 py-10 text-center sm:grid-cols-3 sm:gap-x-10 sm:gap-y-8 md:gap-x-36 lg:flex lg:flex-row lg:justify-center lg:gap-52">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-2 px-2">
              <Image src={badge.icon} alt={badge.label} width={62} height={62} className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
              <span className="text-base font-semibold text-white sm:text-lg lg:whitespace-nowrap lg:text-2xl">{badge.label}</span>
              <span className="text-sm font-light text-white sm:text-base lg:whitespace-nowrap lg:text-xl">{badge.sub}</span>
            </div>
          ))}
        </div>

        <div className="order-6 border-t border-white/10" />

        {/* Bottom bar */}
        <div className="order-7 flex flex-col items-center gap-5 pt-6 text-xs text-zinc-400 md:items-start">
          {/* Company info */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:justify-start">
            <span>© 2026 POLARIZED-X</span>
            <span>B2B MARKT LTD יבואנית בלעדית</span>
             <span>המרכבה 25, חולון</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
