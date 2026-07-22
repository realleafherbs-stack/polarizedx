"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { StoreProduct as Product } from "../../../lib/products";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

const FALLBACK_IMG = "/images/mockproduct.jpg";

const PAPER = "#f1ece2";
const PAPER_RAISED = "#fbf8f2";
const INK = "#11110f";
const INK_SOFT = "#625d54";
const LINE = "#d4ccbf";

export type Review = { id: string; name: string; rating: number; text: string; createdAt: string };

function PolarizedProofIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0" style={{ color: "#705809" }}>
      <path d="M5.5 18.5 9 16h10.5l2.75 2.25h3.5L28.5 16H39l3.5 2.5" />
      <path d="M8 19.25c.35 7.2 2.45 10.8 7.1 10.8 4.1 0 6.05-2.8 7.15-9.05M40 19.25c-.35 7.2-2.45 10.8-7.1 10.8-4.1 0-6.05-2.8-7.15-9.05" />
      <path d="M11.5 23.25h7M29.5 23.25h7" />
    </svg>
  );
}
function UvProofIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0" style={{ color: "#705809" }}>
      <circle cx="13.5" cy="14" r="4" />
      <path d="M13.5 6.5V4M13.5 24v-2.5M6 14H3.5M23.5 14H21M27.5 10.5 39 15v8.25c0 8.15-4.65 13.4-11.5 17.25C20.65 36.65 16 31.4 16 23.25V15zM22 25.25 26 29l7.5-8" />
    </svg>
  );
}
function ShippingProofIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0" style={{ color: "#705809" }}>
      <path d="M5 11.5h23v23H5zM28 19h7l8 8v7.5H28zM34.5 19v8H43" />
      <circle cx="12" cy="36" r="3.5" />
      <circle cx="36.5" cy="36" r="3.5" />
    </svg>
  );
}
function WarrantyProofIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0" style={{ color: "#705809" }}>
      <path d="M24 5.5 38 11v10c0 9.9-5.65 16.25-14 21-8.35-4.75-14-11.1-14-21V11z" />
      <circle cx="24" cy="21" r="7" />
      <path d="m20.75 21 2.2 2.25 4.7-4.85" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg viewBox="0 0 22.5 20" fill={INK} className="h-5 w-5">
      <path d="M0 0.9375C0 0.417969 0.417969 0 0.9375 0H2.71484C3.57422 0 4.33594 0.5 4.69141 1.25H20.7461C21.7734 1.25 22.5234 2.22656 22.2539 3.21875L20.6523 9.16797C20.3203 10.3945 19.207 11.25 17.9375 11.25H6.66797L6.87891 12.3633C6.96484 12.8047 7.35156 13.125 7.80078 13.125H19.0625C19.582 13.125 20 13.543 20 14.0625C20 14.582 19.582 15 19.0625 15H7.80078C6.44922 15 5.28906 14.0391 5.03906 12.7148L3.02344 2.12891C2.99609 1.98047 2.86719 1.875 2.71484 1.875H0.9375C0.417969 1.875 0 1.45703 0 0.9375ZM5 18.125C5 17.8788 5.0485 17.635 5.14273 17.4075C5.23695 17.18 5.37506 16.9733 5.54917 16.7992C5.72328 16.6251 5.92998 16.487 6.15747 16.3927C6.38495 16.2985 6.62877 16.25 6.875 16.25C7.12123 16.25 7.36505 16.2985 7.59253 16.3927C7.82002 16.487 8.02672 16.6251 8.20083 16.7992C8.37494 16.9733 8.51305 17.18 8.60727 17.4075C8.7015 17.635 8.75 17.8788 8.75 18.125C8.75 18.3712 8.7015 18.615 8.60727 18.8425C8.51305 19.07 8.37494 19.2767 8.20083 19.4508C8.02672 19.6249 7.82002 19.763 7.59253 19.8573C7.36505 19.9515 7.12123 20 6.875 20C6.62877 20 6.38495 19.9515 6.15747 19.8573C5.92998 19.763 5.72328 19.6249 5.54917 19.4508C5.37506 19.2767 5.23695 19.07 5.14273 18.8425C5.0485 18.615 5 18.3712 5 18.125ZM18.125 16.25C18.6223 16.25 19.0992 16.4475 19.4508 16.7992C19.8025 17.1508 20 17.6277 20 18.125C20 18.6223 19.8025 19.0992 19.4508 19.4508C19.0992 19.8025 18.6223 20 18.125 20C17.6277 20 17.1508 19.8025 16.7992 19.4508C16.4475 19.0992 16.25 18.6223 16.25 18.125C16.25 17.6277 16.4475 17.1508 16.7992 16.7992C17.1508 16.4475 17.6277 16.25 18.125 16.25Z" />
    </svg>
  );
}

const SPEC_ICONS: Record<string, string> = {
  "עדשות": "/icn/productPage/icon1.png",
  "מסגרת": "/icn/productPage/icon2.png",
  "הגנה": "/icn/productPage/icon3.png",
  "משקל": "/icn/productPage/icon7.png",
  "התאמה": "/icn/productPage/icon4.png",
  "אחריות": "/icn/productPage/icon9.png",
};

export default function ProductDetail({ product, relatedProducts = [], reviews = [] }: { product: Product; relatedProducts?: Product[]; reviews?: Review[] }) {
  const [qty, setQty] = useState(1);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const { addItem } = useCart();
  const { toggle, isFavorite } = useFavorites();
  const router = useRouter();

  const activePrice = product.price;
  const activeVariantId = product.variantId || product.id;

  const allImages = product.images?.length
    ? product.images
    : product.thumbnail
      ? [product.thumbnail]
      : [FALLBACK_IMG];
  const activeImg = allImages[selectedThumb] ?? FALLBACK_IMG;
  const lifestyleImg = allImages.length > 1 ? allImages[1] : null;
  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : (product.rating ?? 0);

  function addToCart() {
    addItem({
      id: activeVariantId,
      name: product.name,
      price: activePrice,
      variantId: activeVariantId,
      image: activeImg,
      description: product.description,
      material: product.material,
    }, qty);
  }

  return (
    <section className="mt-20 px-4 pt-8 pb-16 sm:px-6 sm:pt-10 sm:pb-24 lg:px-10" style={{ background: PAPER }}>
      <div className="site-container" style={{ maxWidth: 1260 }}>

        <Link
          href="/shop"
          dir="rtl"
          className="mb-6 inline-flex min-h-12 items-center gap-3 border px-3 text-base transition-transform hover:translate-x-1"
          style={{ borderColor: LINE, background: PAPER_RAISED, color: INK }}
        >
          <span className="grid h-7.5 w-7.5 place-items-center text-lg" style={{ background: INK, color: PAPER_RAISED }}>←</span>
          <span>חזרה לחנות</span>
        </Link>

        {/* ── Gallery + purchase panel ── */}
        <div dir="rtl" className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.12fr_minmax(360px,0.88fr)] lg:gap-10">

          {/* Gallery */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[1fr_minmax(150px,0.38fr)]">
            <div
              className="relative order-1 aspect-square cursor-zoom-in border"
              style={{ background: "#fff", borderColor: LINE }}
              onClick={() => setLightboxOpen(true)}
            >
              {product.badge && (
                <span className="absolute right-4 top-4 z-10 px-3 py-1.5 text-sm font-bold" style={{ background: INK, color: PAPER_RAISED }}>
                  {product.badge}
                </span>
              )}
              <Image src={activeImg} alt={product.name} fill className="object-contain p-[8%]" />
            </div>
            {lifestyleImg && (
              <div className="relative order-2 min-h-45 border sm:min-h-0" style={{ background: "#d9d1c4", borderColor: LINE }}>
                <Image src={lifestyleImg} alt="" fill className="object-cover" />
              </div>
            )}
            {allImages.length > 1 && (
              <div className="order-3 flex flex-wrap gap-2.5 sm:col-span-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedThumb(i)}
                    className="grid h-18 w-21.5 shrink-0 place-items-center overflow-hidden border p-1 transition-transform hover:-translate-y-0.5"
                    style={{ borderColor: selectedThumb === i ? INK : LINE, borderWidth: selectedThumb === i ? 2 : 1, background: PAPER_RAISED }}
                  >
                    <Image src={img} alt="" width={80} height={62} className="h-full w-full object-contain" style={{ background: "#fff" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Purchase panel */}
          <div dir="rtl" className="border p-6 sm:p-8" style={{ background: PAPER_RAISED, borderColor: LINE, boxShadow: "0 24px 70px rgba(55,43,25,.08)" }}>
            <span dir="ltr" className="mb-4 block w-max text-sm font-black tracking-[0.1em]" style={{ color: "#705809" }}>
              PUT AN <span className="align-middle">X</span> ON IT
            </span>
            <h1 className="mb-3 text-[clamp(2.6rem,6.5vw,4.2rem)] leading-[0.95] font-black" style={{ color: INK }}>
              {product.name}
            </h1>

            <div className="mb-4 flex items-center gap-3 flex-wrap">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <svg key={n} width="18" height="18" viewBox="0 0 24 24" fill={avgRating >= n ? "#d9b538" : "#e5e0d3"} stroke={avgRating >= n ? "#d9b538" : "#e5e0d3"} strokeWidth="0.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              {(product.rating || reviews.length > 0) ? (
                <span className="text-sm font-bold" style={{ color: INK_SOFT }}>
                  {reviews.length > 0 ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10 : product.rating} ({reviews.length || product.reviewCount || 0})
                </span>
              ) : (
                <span className="text-sm" style={{ color: INK_SOFT }}>אין חוות דעת עדיין</span>
              )}
            </div>
            <button onClick={() => setShowReview(true)}
              className="mb-4 w-max border px-4 py-2 text-sm font-bold text-[#11110f] transition-colors hover:bg-[#11110f] hover:text-[#fbf8f2]"
              style={{ borderColor: INK }}>
              כתבו חוות דעת
            </button>

            <div className="mb-2 text-[clamp(1.75rem,3vw,2.2rem)] font-black" style={{ color: INK }}>{activePrice} ₪</div>
            <div className="mb-4 flex items-center gap-2 text-base font-bold" style={{ color: "#22c55e" }}>
              <span className="h-2 w-2 rounded-full" style={{ background: "#22c55e" }} />
              במלאי
            </div>
            {product.description && (
              <p className="mb-5 text-base leading-relaxed" style={{ color: INK_SOFT }}>{product.description}</p>
            )}

            <div className="mb-4 flex items-center justify-between gap-4">
              <strong className="text-base" style={{ color: INK }}>כמות</strong>
              <div className="flex border" style={{ borderColor: INK, background: PAPER_RAISED }}>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-12.5 w-13 place-items-center text-xl text-[#11110f] transition-colors hover:bg-[#11110f] hover:text-[#fbf8f2]">+</button>
                <span className="grid h-12.5 w-13 place-items-center border-x text-xl" style={{ borderColor: LINE, color: INK }}>{qty}</span>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} className="grid h-12.5 w-13 place-items-center text-xl text-[#11110f] transition-colors hover:bg-[#11110f] hover:text-[#fbf8f2] disabled:opacity-30">−</button>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={addToCart}
                className="flex items-stretch overflow-hidden text-right transition-transform hover:-translate-y-0.5"
                style={{ background: INK, color: PAPER_RAISED, minHeight: 68 }}
              >
                <span className="grid w-17 shrink-0 place-items-center" style={{ background: "#d9b538" }}>
                  <CartIcon />
                </span>
                <span className="flex flex-1 flex-col justify-center gap-0.5 px-4">
                  <b className="text-xl font-black">הוסף לסל</b>
                  <small className="text-xs font-bold" style={{ color: "#cfc8ba" }}>משלוח חינם מעל ₪199</small>
                </span>
              </button>
              <button
                onClick={() => { addToCart(); router.push("/checkout"); }}
                className="min-h-13 border font-bold text-[#11110f] underline underline-offset-4 transition-colors hover:bg-[#11110f] hover:text-[#fbf8f2]"
                style={{ borderColor: INK }}
              >
                קנה עכשיו
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between border-t pt-3" style={{ borderColor: LINE }}>
              <button onClick={() => toggle({ id: product.id, name: product.name, price: product.price, thumbnail: product.thumbnail })}
                className="flex items-center gap-1.5 py-2 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: isFavorite(product.id) ? "#e11d48" : INK_SOFT }}>
                <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={isFavorite(product.id) ? "#e11d48" : "none"} stroke={isFavorite(product.id) ? "#e11d48" : INK_SOFT}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {isFavorite(product.id) ? "הסר ממועדפים" : "שמור למועדפים"}
              </button>
              <button onClick={() => { if (navigator.share) { navigator.share({ title: product.name, url: window.location.href }); } else { navigator.clipboard.writeText(window.location.href); } }}
                className="flex items-center gap-1.5 py-2 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: INK_SOFT }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                שתף
              </button>
            </div>
          </div>
        </div>

        {/* ── Proof row ── */}
        <ul dir="rtl" className="mt-6 grid list-none grid-cols-2 gap-y-3 border-y sm:grid-cols-4 sm:gap-y-0" style={{ borderColor: LINE, background: PAPER_RAISED }}>
          {[
            { Icon: PolarizedProofIcon, title: "POLARIZED", sub: "הגנה מסנוור" },
            { Icon: UvProofIcon, title: "UV 400", sub: "הגנה מקרינת UV" },
            { Icon: ShippingProofIcon, title: "משלוח מהיר", sub: "עד 3 ימי עסקים" },
            { Icon: WarrantyProofIcon, title: "אחריות ושירות", sub: "שנה אחריות" },
          ].map(({ Icon, title, sub }, i) => (
            <li key={title} className="flex min-h-18 items-center gap-2.5 border-e px-3 sm:px-4" style={{ borderColor: i % 2 === 1 ? "transparent" : LINE }}>
              <Icon />
              <span className="grid gap-0.5">
                <b className="text-sm" style={{ color: INK }}>{title}</b>
                <small className="text-xs leading-tight" style={{ color: INK_SOFT }}>{sub}</small>
              </span>
            </li>
          ))}
        </ul>

        {/* ── Editorial ── */}
        <div className="relative mt-16 grid grid-cols-1 sm:grid-cols-[1fr_minmax(320px,0.82fr)]" style={{ background: "#171717" }}>
          <div className="relative min-h-45 sm:min-h-0" style={{ background: "#202020" }}>
            <Image src={product.videoUrl ? "/images/campaign/product-glare-v2.png" : "/images/campaign/product-glare-v2.png"} alt="" fill className="object-cover" />
          </div>
          <div dir="rtl" className="flex flex-col items-start justify-center gap-4 p-8 text-right sm:p-12" style={{ color: "#f5f1e8" }}>
            <span className="w-max border px-3 py-1.5 text-sm tracking-[0.1em]" style={{ borderColor: "rgba(247,242,232,.62)", background: "#171717" }}>
              ביצועים בלי רעש
            </span>
            <h2 className="w-full text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] font-black">
              לראות את הדרך <span style={{ color: "#f7f2e8" }}>כמו שצריך</span>
            </h2>
            <p className="max-w-[36ch] text-base" style={{ color: "#f7f2e8" }}>
              עדשה איכותית מסננת השתקפויות חזקות ושומרת על תמונה חדה, נקייה ונוחה יותר לאורך היום.
            </p>
          </div>
        </div>

        {/* ── Specs accordion ── */}
        <ProductTabs
          specsRaw={product.specsRaw ?? null}
          inTheBox={product.inTheBox ?? null}
          usageInstructions={product.usageInstructions ?? null}
          warrantyInfo={product.warrantyInfo ?? null}
        />

        {/* ── Second pair promo ── */}
        <div dir="ltr" className="relative mt-10 grid grid-cols-1 overflow-hidden border sm:grid-cols-[1.2fr_minmax(320px,0.8fr)]" style={{ background: PAPER_RAISED, borderColor: LINE, borderTop: "3px solid #d9b538" }}>
          <div className="relative order-2 min-h-55 sm:order-1 sm:min-h-75" style={{ background: "#ebe6dc" }}>
            <Image src="/images/campaign/second-pair-campaign-desktop-v4.png" alt="משקפי POLARIZED-X בקומפוזיציית מבצע" fill className="object-cover" />
          </div>
          <div dir="rtl" className="order-1 flex flex-col items-start justify-center gap-2 p-6 text-right sm:order-2 sm:p-9">
            <span dir="ltr" className="w-max text-sm font-black tracking-[0.12em]" style={{ color: "#705809" }}>PUT AN X ON IT</span>
            <h2 className="text-[clamp(2rem,3.8vw,2.75rem)] leading-[0.95] font-black" style={{ color: INK }}>
              זוג שני <strong className="font-black whitespace-nowrap" style={{ color: "#705809" }}>ב-99 ₪</strong>
            </h2>
            <p className="max-w-[40ch] text-base leading-snug" style={{ color: INK_SOFT }}>
              בחרו כל שני דגמים, בכל שילוב, במחיר מבצע אחד.
            </p>
            <Link
              href="/shop"
              className="mt-2 inline-flex min-h-11.5 items-center gap-2 border px-4 text-base font-bold text-[#11110f] transition-colors hover:bg-[#11110f] hover:text-[#fbf8f2]"
              style={{ borderColor: INK }}
            >
              <span>לבחירת שני זוגות</span>
              <span aria-hidden>←</span>
            </Link>
          </div>
        </div>

        {/* ── Related products ── */}
        {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
      </div>

      <Reviews
        productId={product.id}
        showReview={showReview}
        setShowReview={setShowReview}
      />

      {/* FAQ section */}
      {product.faqRaw && <FAQ faqRaw={product.faqRaw} />}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-200 flex items-center justify-center bg-white"
          onClick={() => setLightboxOpen(false)}
        >
          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {allImages.map((img, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setSelectedThumb(i); }}
                  className="rounded-lg border-2 overflow-hidden"
                  style={{ width: 64, height: 64, borderColor: selectedThumb === i ? "#1a1a1a" : "rgba(0,0,0,0.15)", background: "#f5f5f5" }}>
                  <Image src={img} alt="" width={64} height={64} className="w-full h-full object-contain" unoptimized />
                </button>
              ))}
            </div>
          )}
          <div className="relative w-full max-w-2xl mx-6" style={{ aspectRatio: "1/1" }} onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-12 right-0 text-black text-4xl font-light leading-none hover:opacity-70 transition-opacity"
              onClick={() => setLightboxOpen(false)}
            >
              ✕
            </button>
            <Image src={activeImg} alt={product.name} fill className="object-contain" unoptimized />
          </div>
        </div>
      )}
    </section>
  );
}

const TAB_META = [
  {
    label: "מפרט טכני",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 12h32M8 24h32M8 36h32" />
        <circle cx="18" cy="12" r="3.5" /><circle cx="31" cy="24" r="3.5" /><circle cx="22" cy="36" r="3.5" />
      </svg>
    ),
  },
  {
    label: "מה בקופסה",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
        <path d="m24 5.5 17 8.75v19.5L24 42.5 7 33.75v-19.5z" />
        <path d="m7 14.25 17 8.8 17-8.8M24 23.05V42.5M15.5 9.9l17 8.75" />
      </svg>
    ),
  },
  {
    label: "שימוש ותחזוקה",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 32.5 27.5 14l10 10L19 42.5H9z" />
        <path d="m24 17.5 10 10M35.5 5v7M32 8.5h7M12.5 8v5M10 10.5h5" />
      </svg>
    ),
  },
  {
    label: "אחריות ושירות",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 25v-3C9 13.7 15.7 7 24 7s15 6.7 15 15v3" />
        <path d="M9 24h5v12H9a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3ZM39 24h-5v12h5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3Z" />
        <path d="M34 36c-1.8 3.3-5.1 5-10 5h-2" />
      </svg>
    ),
  },
];

function ProductTabs({ specsRaw, inTheBox, usageInstructions, warrantyInfo }: {
  specsRaw: string | null;
  inTheBox: string | null;
  usageInstructions: string | null;
  warrantyInfo: string | null;
}) {
  const parsedSpecs = specsRaw
    ? specsRaw.split("\n").filter(Boolean).map((line) => line.split("|").map((s) => s.trim()))
    : [];

  const content = [
    parsedSpecs.length > 0 ? (
      <dl className="grid gap-2">
        {parsedSpecs.map(([label, value], i) => (
          <div key={i} className="flex items-center justify-between gap-4 border-b pb-1.5" style={{ borderColor: LINE }}>
            <dt className="flex items-center gap-2 font-black" style={{ color: INK }}>
              <Image src={SPEC_ICONS[label] ?? "/icn/productPage/icon1.png"} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
              {label}
            </dt>
            <dd className="text-left" style={{ color: INK_SOFT }}>{value}</dd>
          </div>
        ))}
      </dl>
    ) : <p style={{ color: INK_SOFT }}>מפרט טכני יתווסף בקרוב.</p>,
    <p key="box" className="whitespace-pre-line" style={{ color: INK_SOFT }}>{inTheBox || 'תוכן "מה בקופסה" יוסף בקרוב.'}</p>,
    <p key="usage" className="whitespace-pre-line" style={{ color: INK_SOFT }}>{usageInstructions || "הוראות שימוש יוספו בקרוב."}</p>,
    <p key="warranty" className="whitespace-pre-line" style={{ color: INK_SOFT }}>{warrantyInfo || "מדיניות האחריות והשירות תוסף בקרוב."}</p>,
  ];

  return (
    <div dir="rtl" className="mt-14 border-y" style={{ borderColor: LINE }}>
      <h2 className="border-b py-6 text-[clamp(2.2rem,5vw,3.5rem)] font-black" style={{ borderColor: LINE, color: INK }}>
        כל מה שצריך לדעת
      </h2>
      <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: LINE }}>
        {TAB_META.map((tab, i) => (
          <details key={tab.label} open={i === 0} className="min-w-0" style={{ background: PAPER_RAISED }}>
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-2.5 px-4 py-3 font-black" style={{ color: INK }}>
              <span className="flex items-center gap-3 min-w-0">
                <span className="grid h-8.5 w-8.5 shrink-0 place-items-center" style={{ color: "#171717" }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </span>
              <span aria-hidden className="text-lg">＋</span>
            </summary>
            <div className="px-4 pb-5 text-sm leading-relaxed">{content[i]}</div>
          </details>
        ))}
      </div>
    </div>
  );
}

function RelatedProducts({ products }: { products: Product[] }) {
  const { addItem } = useCart();
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: "rtl", align: "start" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div dir="rtl" className="mt-16 border-t pt-8" style={{ borderColor: LINE }}>
      <div className="mb-5 flex items-end justify-between gap-6">
        <div>
          <span dir="ltr" className="block text-right text-sm font-black tracking-[0.1em]" style={{ color: "#705809" }}>MORE TO EXPLORE</span>
          <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] font-black" style={{ color: INK }}>אולי תאהבו גם</h2>
          <p className="mt-1.5 font-bold" style={{ color: INK_SOFT }}>עוד דגמים מהקולקציה, עם אותה הגנת POLARIZED.</p>
        </div>
        {products.length > 1 && (
          <div dir="ltr" className="hidden gap-2 sm:flex">
            <button onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev}
              className="grid h-12 w-12 place-items-center border font-black transition-colors disabled:opacity-30"
              style={{ borderColor: LINE, background: PAPER_RAISED, color: INK }}
              onMouseEnter={(e) => { e.currentTarget.style.background = INK; e.currentTarget.style.color = PAPER_RAISED; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = PAPER_RAISED; e.currentTarget.style.color = INK; }}>←</button>
            <button onClick={() => emblaApi?.scrollNext()} disabled={!canNext}
              className="grid h-12 w-12 place-items-center border font-black transition-colors disabled:opacity-30"
              style={{ borderColor: LINE, background: PAPER_RAISED, color: INK }}
              onMouseEnter={(e) => { e.currentTarget.style.background = INK; e.currentTarget.style.color = PAPER_RAISED; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = PAPER_RAISED; e.currentTarget.style.color = INK; }}>→</button>
          </div>
        )}
      </div>

      {/* Mobile-only: hint that the row scrolls horizontally */}
      <div className="mb-2.5 flex items-center justify-start gap-1.5 sm:hidden" style={{ color: "#8d6c12" }}>
        <span className="text-xs font-bold">גלול לצפייה בעוד דגמים</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="slider-hint-arrow h-4 w-4"
        >
          <path d="M15 6 9 12l6 6" />
        </svg>
      </div>

      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex -ms-1.5">
          {products.map((p) => (
            <div key={p.id} className="related-slide min-w-0 shrink-0 grow-0 px-1.5">
              <a href={`/shop/${p.handle || p.id}`} className="group flex h-full flex-col border" style={{ background: PAPER_RAISED, borderColor: LINE }}>
                <div className="relative aspect-square overflow-hidden" style={{ background: "#fff" }}>
                  {p.thumbnail ? (
                    <Image src={p.thumbnail} alt={p.name} fill className="object-contain p-[6%] transition-transform duration-300 ease-out group-hover:scale-110" />
                  ) : (
                    <div className="h-full w-full" style={{ background: "#f0ece2" }} />
                  )}
                </div>
                <div className="flex items-baseline justify-between gap-3 p-4">
                  <b className="text-lg font-black" style={{ color: INK }}>{p.name}</b>
                  <span className="whitespace-nowrap font-black" style={{ color: INK }}>{p.price} ₪</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-only: dot pagination showing position in the slider */}
      {scrollSnaps.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`עבור למוצר ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="h-2 rounded-full transition-all"
              style={{ width: i === selectedIndex ? 24 : 8, background: i === selectedIndex ? INK : "#d9cfc0" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function StarInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button"
          onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
            fill={(hover || value) >= n ? "#d9b538" : "none"}
            stroke="#d9b538" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function Reviews({ productId, showReview, setShowReview }: { productId: string; showReview: boolean; setShowReview: (v: boolean) => void }) {
  const [userRating, setUserRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSent, setReviewSent] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  if (!showReview) return null;

  return (
      createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black/60" style={{ zIndex: 9999 }} onClick={() => setShowReview(false)}>
          <div className="w-full max-w-lg flex flex-col gap-5 p-8" style={{ zIndex: 10000, background: PAPER_RAISED }} onClick={(e) => e.stopPropagation()}>
            {reviewSent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: INK }}>תודה על חוות דעתך!</h3>
                <p style={{ color: INK_SOFT }}>חוות הדעת שלך התקבלה בהצלחה.</p>
                <button onClick={() => { setShowReview(false); setReviewSent(false); setUserRating(0); setReviewName(""); setReviewText(""); }}
                  className="mt-6 px-8 py-3 font-bold" style={{ background: INK, color: PAPER_RAISED }}>
                  סגור
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold" style={{ color: INK }}>כתבו חוות דעת</h3>
                  <button onClick={() => setShowReview(false)} className="text-3xl leading-none" style={{ color: INK_SOFT }}>✕</button>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-semibold" style={{ color: INK }}>דירוג</label>
                  <StarInput value={userRating} onChange={setUserRating} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-semibold" style={{ color: INK }}>שם</label>
                  <input value={reviewName} onChange={(e) => setReviewName(e.target.value)} className="border px-4 py-3 text-base focus:outline-none" style={{ borderColor: LINE, color: INK, background: "#fff" }} placeholder="השם שלך" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-semibold" style={{ color: INK }}>חוות דעת</label>
                  <textarea rows={4} value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="border px-4 py-3 text-base resize-none focus:outline-none" style={{ borderColor: LINE, color: INK, background: "#fff" }} placeholder="ספר לנו על החוויה שלך..." />
                </div>
                <button onClick={async () => {
                  if (!userRating || !reviewName.trim() || !reviewText.trim()) return;
                  setReviewSubmitting(true);
                  try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_CRM_URL}/api/${process.env.NEXT_PUBLIC_CRM_SITE_SLUG}/reviews`, {
                      method: "POST", headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ productId, name: reviewName.trim(), rating: userRating, text: reviewText.trim() }),
                    });
                    if (!res.ok) throw new Error("server error");
                    setReviewSent(true);
                  } catch {
                    alert("אירעה שגיאה בשליחת חוות הדעת. נסה שוב מאוחר יותר.");
                  } finally { setReviewSubmitting(false); }
                }} disabled={reviewSubmitting || !userRating || !reviewName.trim() || !reviewText.trim()}
                  className="py-4 text-lg font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ background: INK, color: PAPER_RAISED }}>
                  {reviewSubmitting ? "שולח..." : "שלח חוות דעת"}
                </button>
              </>
            )}
          </div>
        </div>,
        document.body
      )
  );
}

function FAQ({ faqRaw }: { faqRaw: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const items = faqRaw.split("\n").filter(Boolean).map((line) => {
    const [q, ...rest] = line.split("|");
    return { q: q.trim(), a: rest.join("|").trim() };
  }).filter((item) => item.q && item.a);

  if (items.length === 0) return null;

  return (
    <div className="mt-16 py-12" style={{ background: "#171717" }} dir="rtl">
      <div className="site-container px-4 sm:px-6 lg:px-10" style={{ maxWidth: 1260 }}>
        <h2 className="mb-8 text-center text-3xl font-black text-white">שאלות ותשובות</h2>
        <div className="flex flex-col gap-px max-w-3xl mx-auto" style={{ background: "#2a2a2a" }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: "#171717" }}>
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-4 sm:py-6 text-right"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-2xl font-light leading-none" style={{ color: "#888" }}>
                  {open === i ? "−" : "+"}
                </span>
                <span className="text-sm sm:text-base font-medium text-white flex-1 text-right">{item.q}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-base text-gray-400">
                  <p className="leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
