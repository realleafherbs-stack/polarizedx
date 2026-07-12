"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

const navLinks = [
  { href: "/", label: "דף הבית" },
  { href: "/about", label: "הסיפור שלנו" },
  { href: "/b2b", label: "B2B" },
  { href: "/blog", label: "בלוג" },
  { href: "/contact", label: "צור קשר" },
];


function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="w-12 h-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="w-12 h-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { count: cartCount } = useCart();
  const { count: favCount } = useFavorites();
  const router = useRouter();
  const pathname = usePathname();
  const altTheme = pathname === "/faq" || pathname.startsWith("/shop") || pathname === "/cart" || pathname === "/checkout";

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    setSearchQuery("");
    router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 bg-white ${
        altTheme
          ? "lg:bg-white lg:border-b lg:border-black/10"
          : "lg:bg-black lg:border-b lg:border-white/10"
      }`}
    >
      <nav className="relative mx-auto max-w-5xl lg:max-w-7xl xl:max-w-360 2xl:max-w-420 px-3 sm:px-6 lg:px-4 lg:h-14 lg:py-2 flex flex-col lg:flex-row lg:items-center lg:justify-between">

        {/* ── MOBILE + TABLET: single-row layout ── */}
        <div dir="rtl" className="lg:hidden flex items-center justify-between h-14">
          <div className="flex items-center">
            <button className="p-1.5 sm:p-2" style={{ color: "#000000" }} onClick={() => setMobileOpen(!mobileOpen)} aria-label="תפריט">
              <span className="block scale-75 sm:scale-100">{mobileOpen ? <CloseIcon /> : <MenuIcon />}</span>
            </button>
            <button className="p-1" aria-label="חיפוש" onClick={() => setSearchOpen(true)}>
              <Image src="/icn/search.png" alt="חיפוש" width={24} height={24} className="icon-accent invert" />
            </button>
          </div>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image src="/logo/logo.png" alt="POLARIZED-X" width={140} height={40} className="h-3 w-auto invert sm:h-4" priority />
          </Link>
          <div className="flex items-center">
            <Link href="/cart" className="relative p-1" aria-label="עגלת קניות">
              <Image src="/icn/cart.png" alt="עגלה" width={24} height={24} className="icon-accent invert" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 inset-e-0.5 text-white text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center px-0.5" style={{ background: "#000000" }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/favorites" className="relative p-1" aria-label="מועדפים">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {favCount > 0 && (
                <span className="absolute top-0.5 inset-e-0.5 text-white text-base font-bold min-w-[26px] h-[26px] rounded-full flex items-center justify-center px-1" style={{ background: "#e11d48" }}>
                  {favCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ── DESKTOP ONLY: original single-row layout ── */}
        {/* Logo */}
        <Link href="/" className="hidden lg:block shrink-0 lg:order-3">
          <Image src="/logo/logo.png" alt="POLARIZED-X" width={140} height={40} className={`h-4 w-auto ${altTheme ? "invert" : ""}`} priority />
        </Link>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-8 shrink-0 lg:order-2 lg:mx-[clamp(0px,calc(45vw_-_576px),160px)]">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className={`text-xl font-regular transition-colors whitespace-nowrap ${altTheme ? "text-black" : "text-white"}`}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.75")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions — right side in RTL after swap */}
        <div className="hidden lg:flex items-center gap-3 lg:order-1">
          {/* Favorites — far right in RTL */}
          <Link href="/favorites" className="relative p-2" aria-label="מועדפים">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={altTheme ? "black" : "white"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {favCount > 0 && (
              <span className="absolute top-0.5 inset-e-0.5 text-white text-xs font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1" style={{ background: "#e11d48" }}>
                {favCount}
              </span>
            )}
          </Link>

          {/* Search — middle */}
          <button
            className="p-2 transition-opacity hover:opacity-100"
            aria-label="חיפוש"
            onClick={() => setSearchOpen(true)}
          >
            <Image src="/icn/search.png" alt="חיפוש" width={24} height={24} className={`icon-accent ${altTheme ? "invert" : ""}`} />
          </button>

          {/* Cart */}
          <Link href="/cart" className="relative p-2" aria-label="עגלת קניות">
            <Image src="/icn/cart.png" alt="עגלה" width={24} height={24} className={`icon-accent ${altTheme ? "invert" : ""}`} />
            {cartCount > 0 && (
              <span className="absolute top-0.5 inset-e-0.5 text-white text-base font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center px-0.5" style={{ background: "#000000" }}>
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </nav>

      {/* Free shipping marquee */}
      <div dir="ltr" className="overflow-hidden bg-black py-1.5">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="flex items-center gap-2 px-60 text-base font-medium whitespace-nowrap text-white">
                  <Image src="/icn/wdelivery.png" alt="" width={16} height={16} className="h-4 w-4" />
                  משלוח חינם בקנייה מעל 199 ₪ · אספקה עד 3 ימי עסקים
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t bg-white"
          style={{ borderColor: "rgba(0,0,0,0.07)" }}
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-3 rounded-lg text-2xl font-medium transition-colors"
                style={{ color: "#000000" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-6"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setSearchOpen(false)}
        >
          <form
            className="w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSearch}
          >
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4">
              <Image src="/icn/search.png" alt="חיפוש" width={22} height={22} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חפש מוצר..."
                className="flex-1 bg-transparent text-black text-xl outline-none text-right"
                dir="rtl"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-black text-2xl leading-none"
              >
                ✕
              </button>
            </div>
            <p className="text-white/50 text-sm text-center mt-3">הקש Enter לחיפוש</p>
          </form>
        </div>
      )}
    </header>
  );
}
