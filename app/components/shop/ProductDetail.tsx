"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "../../../lib/products-data";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import ProductSecondPair from "./ProductSecondPair";

const FALLBACK_IMG = "/images/mockproduct.jpg";

const SPEC_ICONS: Record<string, string> = {
  "עדשות": "/icn/productPage/icon1.png",
  "מסגרת": "/icn/productPage/icon2.png",
  "הגנה": "/icn/productPage/icon3.png",
  "משקל": "/icn/productPage/icon7.png",
  "התאמה": "/icn/productPage/icon4.png",
  "אחריות": "/icn/productPage/icon9.png",
};

export type Review = { id: string; name: string; rating: number; text: string; createdAt: string };

export default function ProductDetail({ product, relatedProducts = [], reviews = [] }: { product: Product; relatedProducts?: Product[]; reviews?: Review[] }) {
  const [qty, setQty] = useState(1);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
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
  const cardFeatures = product.cardFeatures ?? [];
  const fullFeatures = product.features ?? [];

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

  const InfoHeader = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col gap-4" dir="rtl">
      {product.badge && (
        <span className="hidden sm:inline-flex self-end text-sm font-normal text-white px-3 py-1 rounded-lg tracking-widest" style={{ background: "#1a1a1a" }}>{product.badge}</span>
      )}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-black leading-none text-center sm:text-right">{product.name}</h1>
      {mobile && (
        <div className="flex items-center justify-center gap-3">
          <div className="text-4xl font-normal text-black">₪{activePrice}</div>
          <div className="flex items-center gap-2 text-base text-green-600 font-semibold shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />במלאי
          </div>
        </div>
      )}
      <div className="flex items-center justify-center gap-3 flex-wrap sm:justify-start">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((n) => {
            const avg = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : (product.rating ?? 0);
            return (
              <svg key={n} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 lg:w-5 lg:h-5" viewBox="0 0 24 24"
                fill={avg > 0 ? "#f59e0b" : "#e5e7eb"} stroke={avg > 0 ? "#f59e0b" : "#e5e7eb"} strokeWidth="0.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            );
          })}
        </div>
        {(product.rating || reviews.length > 0) ? (
          <>
            <span className="text-base lg:text-base font-bold text-gray-800">
              {reviews.length > 0 ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10 : product.rating}
            </span>
            <span className="text-sm lg:text-sm text-gray-400 tracking-wider">(חוות דעת)</span>
          </>
        ) : (
          <span className="text-base lg:text-2xl text-gray-400">אין חוות דעת עדיין</span>
        )}
        {product.soldCount && <span className="hidden w-px h-4 bg-gray-300 mx-2 sm:inline-block" />}
        {product.soldCount && (
          <span className="flex items-center text-base lg:text-base text-gray-600 font-medium tracking-wider">
            <span>נמכרו {product.soldCount} יח&apos;</span>
          </span>
        )}
      </div>
    </div>
  );

  const InfoBody = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col gap-4" dir="rtl">
      {!mobile && (
        <div className="flex items-center gap-4 lg:gap-8 my-4">
          <div className="text-4xl lg:text-4xl font-normal text-black">₪{activePrice}</div>
          <div className="flex items-center gap-2 text-base lg:text-base text-green-600 font-semibold shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />במלאי
          </div>
        </div>
      )}
      {product.color && (
        <span className="text-sm font-medium text-gray-600">צבע: {product.color}</span>
      )}
      {cardFeatures.length > 0 && (
        <ul className="flex flex-col gap-2">
          {cardFeatures.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" width="11" height="11">
                  <path fillRule="evenodd" d="M16.704 5.29a1 1 0 0 1 0 1.415l-7.2 7.2a1 1 0 0 1-1.414 0l-3.2-3.2a1 1 0 1 1 1.414-1.414l2.493 2.492 6.493-6.492a1 1 0 0 1 1.414 0Z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-base lg:text-xl text-gray-600">{f}</span>
            </li>
          ))}
        </ul>
      )}
      {mobile ? (
        <>
          <div className="rounded-lg py-3 px-4 text-center text-sm font-medium text-gray-700" style={{ background: "#f5f5f7" }}>
            הוסף זוג שני ב-100₪ בלבד. כל דגם.
          </div>
          <div className="flex items-center justify-between" dir="rtl">
            <span className="text-base font-medium text-black">כמות</span>
            <div className="flex items-center gap-7 rounded-lg border px-6 py-4" style={{ borderColor: "#1a1a1a" }}>
              <button onClick={() => setQty((q) => q + 1)} className="text-2xl font-normal text-black hover:opacity-70 transition-opacity">+</button>
              <span className="text-xl font-normal text-black">{qty}</span>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-2xl font-normal text-black hover:opacity-70 transition-opacity">−</button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4" dir="rtl">
          <div className="flex items-center border rounded-xl overflow-hidden" style={{ borderColor: "#d0d0d0" }}>
            <button onClick={() => setQty((q) => q + 1)} className="w-14 h-14 flex items-center justify-center text-2xl font-normal text-black hover:bg-gray-50 transition-colors">+</button>
            <span className="w-12 h-14 flex items-center justify-center text-xl font-normal text-black border-x" style={{ borderColor: "#d0d0d0" }}>{qty}</span>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-14 h-14 flex items-center justify-center text-2xl font-normal text-black hover:bg-gray-50 transition-colors">−</button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3 ml-0 sm:ml-6">
        <button className="w-full py-2.5 text-white text-base lg:text-lg font-normal rounded-lg transition-opacity hover:opacity-90"
          style={{ background: "#1a1a1a" }} onClick={addToCart}>
          <span className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            הוסף לעגלה
          </span>
        </button>
        <button className="w-full py-2.5 text-black text-base lg:text-lg font-normal rounded-lg border-2 transition-colors hover:bg-gray-50"
          style={{ borderColor: "#1a1a1a" }}
          onClick={() => { addToCart(); router.push("/checkout"); }}>
          קנה עכשיו
        </button>
      </div>
      <div className="flex items-center justify-between mx-6 sm:mx-6 pt-3 border-t" style={{ borderColor: "#e5e5e5" }}>
        <button onClick={() => toggle({ id: product.id, name: product.name, price: product.price, thumbnail: product.thumbnail })}
          className="flex items-center gap-1.5 py-2 text-sm font-normal transition-all hover:opacity-70"
          style={{ color: isFavorite(product.id) ? "#e11d48" : "#666" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={isFavorite(product.id) ? "#e11d48" : "none"} stroke={isFavorite(product.id) ? "#e11d48" : "#666"}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {isFavorite(product.id) ? "הסר ממועדפים" : "שמור למועדפים"}
        </button>
        <button onClick={() => { if (navigator.share) { navigator.share({ title: product.name, url: window.location.href }); } else { navigator.clipboard.writeText(window.location.href); } }}
          className="flex items-center gap-1.5 py-2 text-sm font-normal hover:opacity-70"
          style={{ color: "#666" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          שתף
        </button>
      </div>
    </div>
  );

  return (
    <section className="mt-10 py-6 lg:py-10 xl:py-16 px-4 lg:px-6 xl:px-12 bg-white">
      <div className="site-container">

        {/* ── MOBILE layout ── */}
        <div className="flex flex-col gap-5 sm:hidden">
          <InfoHeader mobile />
          <div className="rounded-2xl overflow-hidden cursor-zoom-in relative" style={{ aspectRatio: "1/1", maxHeight: 320 }} onClick={() => setLightboxOpen(true)}>
            <Image src={activeImg} alt={product.name} width={700} height={700} className="w-full h-full object-contain p-8" />
            {product.badge && (
              <span className="absolute top-3 right-3 inline-flex text-sm font-normal text-white px-3 py-1 rounded-lg tracking-widest" style={{ background: "#1a1a1a" }}>{product.badge}</span>
            )}
            <div className="absolute bottom-3 right-3 bg-white/80 rounded-full p-1.5 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {allImages.map((img, i) => (
              <button key={i} onClick={() => setSelectedThumb(i)}
                className="rounded-xl border-2 overflow-hidden shrink-0"
                style={{ width: 90, height: 90, borderColor: selectedThumb === i ? "#1a1a1a" : "#e0e0e0", background: "#f5f5f5" }}>
                <Image src={img} alt="" width={90} height={90} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
          <InfoBody mobile />
        </div>

        {/* ── TABLET layout ── */}
        <div className="hidden sm:grid lg:hidden! gap-6 items-start" style={{ gridTemplateColumns: "55fr 45fr" }} dir="ltr">
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl overflow-hidden cursor-zoom-in relative" style={{ aspectRatio: "4/3" }} onClick={() => setLightboxOpen(true)}>
              <Image src={activeImg} alt={product.name} width={700} height={700} className="w-full h-full object-contain p-10" />
              <div className="absolute bottom-3 right-3 bg-white/80 rounded-full p-1.5 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {allImages.map((img, i) => (
                <button key={i} onClick={() => setSelectedThumb(i)}
                  className="rounded-xl border-2 overflow-hidden shrink-0"
                  style={{ width: 64, height: 64, borderColor: selectedThumb === i ? "#1a1a1a" : "#e0e0e0", background: "#f5f5f5" }}>
                  <Image src={img} alt="" width={64} height={64} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4" dir="rtl">
            <InfoHeader />
            <InfoBody />
          </div>
        </div>

        {/* ── DESKTOP layout ── */}
        <div className="hidden lg:grid gap-6 xl:gap-12 items-start mx-auto" style={{ gridTemplateColumns: "55fr 45fr", maxWidth: 1500 }} dir="ltr">
          <div className="flex gap-2 xl:gap-3">
            <div className="flex flex-col gap-2 shrink-0">
              {allImages.map((img, i) => (
                <button key={i} onClick={() => setSelectedThumb(i)}
                  className="rounded-xl border-2 overflow-hidden shrink-0"
                  style={{ width: 160, height: 120, borderColor: selectedThumb === i ? "#9ca3af" : "#e0e0e0", background: "#ffffff" }}>
                  <Image src={img} alt={`${product.name} ${i + 1}`} width={200} height={200} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
            <div className="flex-1 rounded-3xl overflow-hidden flex items-center justify-center cursor-zoom-in relative border" style={{ aspectRatio: "4/3", borderColor: "#e0e0e0" }} onClick={() => setLightboxOpen(true)}>
              <Image src={activeImg} alt={product.name} width={700} height={700} className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="flex flex-col gap-5" dir="rtl">
            <InfoHeader />
            <InfoBody />
          </div>
        </div>

      </div>

      <div className="flex flex-col sm:contents">

      {/* Trust bar */}
      <div className="order-3 sm:order-none -mx-4 lg:-mx-6 xl:-mx-12 mt-10 py-10 bg-black" dir="rtl">
        <div className="site-container grid grid-cols-1 gap-y-10 gap-x-4 sm:grid-cols-4 sm:divide-x sm:divide-white/15">
          {[
            { title: "7 שכבות", sub: "עדשות TAC בעלות 7 שכבות הגנה. קלות, עמידות, ראייה חדה.", icon: "/icn/layers.png" },
            { title: "UV 400", sub: "הגנה מלאה מקרני השמש, שמירה על הראייה ומניעת עייפות עיניים.", icon: "/icn/sun.png" },
            { title: "POLARIZED", sub: "סינון קרני אור חזק. לנהיגה, לספורט, לבילוי בטבע.", icon: "/icn/waves.png" },
            { title: "PC FRAME", sub: "מסגרת פוליקרבונט קלה וגמישה. עמידה בחום ובשברים.", icon: "/icn/wshield.png" },
          ].map(({ title, sub, icon }) => (
            <div key={title} className="flex flex-col items-center gap-3 px-4 text-center">
              <Image src={icon} alt="" width={44} height={44} className={`h-11 w-11 object-contain${icon.includes("wshield") ? "" : " invert"}`} />
              <span className="text-xl font-semibold text-white">{title}</span>
              <span className="mx-auto max-w-[220px] text-sm sm:text-base leading-relaxed text-gray-400">{sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Why choose section */}
      <div className="hidden sm:block order-2 sm:order-none site-container mt-16 mb-8" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-10">
            <h2 className="text-xl lg:text-3xl font-semibold text-black">למה לבחור ב-{product.name}?</h2>
            {product.description && (
              <p className="text-base lg:text-lg text-black leading-relaxed">{product.description}</p>
            )}
            {fullFeatures.length > 0 && (
              <ul className="flex flex-col gap-5">
                {fullFeatures.map((f) => {
                  const [title, subtitle] = f.split("::");
                  return (
                    <li key={f} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#f0f0f0" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-lg lg:text-xl font-semibold text-gray-900" style={{ letterSpacing: "0.02em" }}>{title.trim()}</span>
                        {subtitle && <span className="text-base lg:text-lg text-gray-500" style={{ letterSpacing: "0.02em" }}>{subtitle.trim()}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="hidden sm:block relative rounded-3xl overflow-hidden bg-gray-900 w-full mx-auto" style={{ aspectRatio: product.videoUrl ? "16 / 9" : "517 / 354", maxWidth: 600 }}>
            {product.videoUrl ? (
              (() => {
                const ytMatch = product.videoUrl!.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                if (ytMatch) {
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytMatch[1]}?rel=0`}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                }
                return <video src={product.videoUrl!} controls className="absolute inset-0 w-full h-full object-cover" />;
              })()
            ) : (
              <Image src="/images/productwhyimage.jpg" alt="" fill className="object-contain" />
            )}
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="order-1 sm:order-none sm:contents">
        <ProductTabs
          specsRaw={product.specsRaw ?? null}
          inTheBox={product.inTheBox ?? null}
          usageInstructions={product.usageInstructions ?? null}
          warrantyInfo={product.warrantyInfo ?? null}
        />
      </div>

      {/* Usage occasions — mobile only */}
      <div className="order-2 sm:hidden site-container py-6" dir="rtl">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "נהיגה", icon: "/icn/car.png" },
            { label: "ספורט", icon: "/icn/running.png" },
            { label: "טיולים", icon: "/icn/mountain.png" },
            { label: "יומיומי", icon: "/icn/calender.png" },
          ].map((o) => (
            <div key={o.label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border" style={{ borderColor: "#e0e0e0" }}>
                <Image src={o.icon} alt="" width={30} height={30} className="w-[30px] h-[30px] object-contain" />
              </span>
              <span className="text-xs font-medium text-black">{o.label}</span>
            </div>
          ))}
        </div>
      </div>

      </div>

      {/* Second pair promo — mobile only, after trust bar, before reviews */}
      <div className="sm:hidden -mx-4">
        <ProductSecondPair />
      </div>

      {/* Reviews section */}
      <Reviews
        reviews={reviews}
        rating={reviews.length > 0 ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10 : (product.rating ?? null)}
        reviewCount={reviews.length > 0 ? reviews.length : (product.reviewCount ?? null)}
        productId={product.id}
      />

      {/* FAQ section */}
      {product.faqRaw && <FAQ faqRaw={product.faqRaw} />}

      {/* Related products slider */}
      {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}

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

const TABS = [
  { label: "מפרט טכני" },
  { label: "מה בקופסה" },
  { label: "הוראות שימוש" },
  { label: "אחריות ושירות" },
];

const TAB_ICONS = ["/icn/control.png", "/icn/box.png", "/icn/document.png", "/icn/cmshield.png"];

function TabIcon({ index, active }: { index: number; active: boolean }) {
  return (
    <Image
      src={TAB_ICONS[index]}
      alt=""
      width={22}
      height={22}
      className="w-[22px] h-[22px] object-contain"
      style={{ opacity: active ? 1 : 0.45 }}
    />
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
            fill={(hover || value) >= n ? "#f59e0b" : "none"}
            stroke="#f59e0b" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function ProductTabs({ specsRaw, inTheBox, usageInstructions, warrantyInfo }: {
  specsRaw: string | null;
  inTheBox: string | null;
  usageInstructions: string | null;
  warrantyInfo: string | null;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);

  const updateScrollHints = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const scrolled = Math.abs(el.scrollLeft);
    setCanScrollStart(scrolled > 4);
    setCanScrollEnd(scrolled < maxScroll - 4);
  };

  useEffect(() => {
    updateScrollHints();
    window.addEventListener("resize", updateScrollHints);
    return () => window.removeEventListener("resize", updateScrollHints);
  }, []);

  const parsedSpecs = specsRaw
    ? specsRaw.split("\n").filter(Boolean).map((line) => line.split("|").map((s) => s.trim()))
    : [];

  const renderTabContent = (i: number) => {
    if (i === 0) {
      const itemsPerCol = Math.ceil(parsedSpecs.length / 3);
      const cols = [0, 1, 2].map((c) => parsedSpecs.slice(c * itemsPerCol, (c + 1) * itemsPerCol));
      return (
        <div className="rounded-2xl p-6 lg:p-8 mb-8" style={{ background: "#f5f5f7" }}>
          <div className="flex items-center justify-start gap-3 mb-6">
            <Image src="/icn/control.png" alt="" width={28} height={28} className="w-7 h-7 object-contain" />
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-black">מפרט טכני מלא</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10">
            {cols.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col">
                {col.map(([label, value], rowIdx) => (
                  <div key={rowIdx} className="flex items-center justify-between py-4 px-4 border-b border-gray-400">
                    <div className="flex items-center gap-2 shrink-0">
                      <Image
                        src={SPEC_ICONS[label] ?? "/icn/productPage/icon1.png"}
                        alt=""
                        width={16}
                        height={16}
                        className="w-4 h-4 object-contain"
                      />
                      <span className="text-xs sm:text-lg text-gray-400" style={{ letterSpacing: "0.05em" }}>{label}</span>
                    </div>
                    <span className="text-sm sm:text-base lg:text-xl font-normal text-black text-left" style={{ letterSpacing: "0.03em" }}>{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (i === 1) return <p className="text-sm sm:text-lg text-gray-600 whitespace-pre-line">{inTheBox || 'תוכן "מה בקופסה" יוסף בקרוב.'}</p>;
    if (i === 2) return <p className="text-sm sm:text-lg text-gray-600 whitespace-pre-line">{usageInstructions || "הוראות שימוש יוספו בקרוב."}</p>;
    return <p className="text-sm sm:text-lg text-gray-600 whitespace-pre-line">{warrantyInfo || "מדיניות האחריות והשירות תוסף בקרוב."}</p>;
  };

  return (
    <div className="site-container mt-16 mb-8" dir="rtl">
      {/* ── Mobile: accordion ── */}
      <div className="sm:hidden">
        {TABS.map((tab, i) => (
          <div key={tab.label} className="border-b" style={{ borderColor: "#e5e5e5" }}>
            <button
              onClick={() => setActiveTab(activeTab === i ? -1 : i)}
              className="w-full flex items-center justify-between gap-3 py-4"
            >
              <span className="text-lg font-light leading-none text-gray-400">{activeTab === i ? "−" : "+"}</span>
              <span className="flex-1 text-right text-base font-medium text-black">{tab.label}</span>
            </button>
            {activeTab === i && <div className="pb-5">{renderTabContent(i)}</div>}
          </div>
        ))}
      </div>

      {/* ── Tablet/Desktop: tab strip ── */}
      <div className="hidden sm:block">
        <div className="relative border-b" style={{ borderColor: "#e5e5e5" }}>
          <div
            ref={scrollRef}
            onScroll={updateScrollHints}
            className="flex justify-center gap-8 lg:gap-12 overflow-x-auto px-1"
            style={{ scrollbarWidth: "none" }}
          >
            {TABS.map((tab, i) => (
              <button key={tab.label} onClick={() => setActiveTab(i)}
                className="flex items-center gap-1.5 py-3 text-base lg:text-lg font-normal transition-colors relative whitespace-nowrap shrink-0"
                style={{ letterSpacing: "0.03em", color: activeTab === i ? "#1a1a1a" : "#555" }}>
                <TabIcon index={i} active={activeTab === i} />
                {tab.label}
                {activeTab === i && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8">
          {renderTabContent(activeTab === -1 ? 0 : activeTab)}
        </div>
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
    <div className="site-container mt-16 mb-16" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-black text-center flex-1">לקוחות שקנו את זה אהבו גם</h2>
        {products.length > 1 && (
          <div className="flex gap-2">
            <button onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors disabled:opacity-30 hover:opacity-80"
              style={{ background: "#1a1a1a" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <button onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors disabled:opacity-30 hover:opacity-80"
              style={{ background: "#1a1a1a" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
          </div>
        )}
      </div>
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex -ms-3 justify-center">
        {products.map((p) => {
          const reviewCount = p.reviewCount ?? 0;
          const rating = p.rating ?? 0;
          return (
            <div key={p.id} className="related-slide min-w-0 shrink-0 grow-0 px-3">
            <a href={`/shop/${p.handle || p.id}`}
              className="border rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full"
              style={{ borderColor: "#e5e5e5" }}>
              <div className="bg-white flex items-center justify-center" style={{ aspectRatio: "4/3" }}>
                {p.thumbnail ? (
                  <Image src={p.thumbnail} alt={p.name} width={300} height={300} className="object-contain" style={{ maxWidth: "75%", maxHeight: "75%", width: "auto", height: "auto" }} />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-xl" />
                )}
              </div>
              <div className="px-4 pb-4 pt-2 flex flex-col gap-2 flex-1 items-start" dir="rtl">
                <span className="text-base sm:text-xl lg:text-3xl font-bold text-black leading-snug w-full text-center mb-2 sm:mb-6">{p.name}</span>
                <div className="flex items-center gap-1.5 flex-wrap justify-start">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, n) => (
                      <svg key={n} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill={rating > 0 && n < Math.round(rating) ? "#f59e0b" : "#e5e7eb"}
                        stroke={rating > 0 && n < Math.round(rating) ? "#f59e0b" : "#e5e7eb"} strokeWidth="0.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  {reviewCount > 0 && <span className="text-xs text-gray-400">({reviewCount})</span>}
                  {reviewCount === 0 && <span className="text-xs text-gray-400">אין חוות דעת</span>}
                </div>
                {p.color && (
                  <span className="text-sm sm:text-base lg:text-lg text-gray-500 leading-snug">צבע: {p.color}</span>
                )}
                <span className="text-lg sm:text-xl lg:text-2xl font-normal text-black mt-auto" style={{ letterSpacing: "0.04em" }}>₪{p.price}</span>
              </div>
              <div className="px-4 pb-4">
                <button className="w-full py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: "#1a1a1a" }}
                  onClick={(e) => {
                    e.preventDefault();
                    addItem({
                      id: p.variantId || p.id,
                      name: p.name,
                      price: p.price,
                      variantId: p.variantId || p.id,
                      image: p.thumbnail ?? undefined,
                      description: p.description,
                      material: p.material,
                    });
                  }}>
                  הוסף לעגלה
                </button>
              </div>
            </a>
            </div>
          );
        })}
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`עבור למוצר ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${i === selectedIndex ? "w-6 bg-black" : "w-2 bg-black/25"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Reviews({ reviews, rating, reviewCount, productId }: { reviews: Review[]; rating: number | null; reviewCount: number | null; productId: string }) {
  const [showReview, setShowReview] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSent, setReviewSent] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const [slideStart, setSlideStart] = useState(0);
  const perPage = 3;
  const displayCount = reviewCount ?? reviews.length;
  const displayed = reviews.slice(slideStart, slideStart + perPage);
  const canPrev = slideStart > 0;
  const canNext = slideStart + perPage < reviews.length;
  const Stars = ({ r, size = 18 }: { r: number; size?: number }) => (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, n) => (
        <svg key={n} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
          fill={n < r ? "#f59e0b" : "#e5e7eb"} stroke={n < r ? "#f59e0b" : "#e5e7eb"} strokeWidth="0.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );

  if (reviews.length === 0 && !rating) return null;

  return (
    <div className="site-container mt-16" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <h2 className="text-2xl lg:text-3xl font-bold text-black">חוות דעת לקוחות</h2>
        </div>
        {reviews.length > perPage && (
          <div className="flex gap-2">
            <button onClick={() => setSlideStart((s) => s + perPage)} disabled={!canNext}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
              style={{ background: "#1a1a1a" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <button onClick={() => setSlideStart((s) => s - perPage)} disabled={!canPrev}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
              style={{ background: "#1a1a1a" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch">
        <div className="border rounded-2xl p-6 flex flex-col items-center justify-center gap-4 bg-white" style={{ borderColor: "#e5e5e5" }}>
          {rating ? (
            <>
              <span className="text-6xl font-bold text-black leading-none">{rating}</span>
              <Stars r={Math.round(rating)} size={24} />
              <span className="text-sm text-gray-400 text-center">מבוסס על {displayCount} חוות דעת</span>
            </>
          ) : (
            <span className="text-sm text-gray-500 text-center">אין חוות דעת עדיין</span>
          )}
          <button onClick={() => setShowReview(true)}
            className="w-full py-2.5 rounded-xl border text-sm font-semibold transition-colors hover:bg-gray-50 text-black"
            style={{ borderColor: "#1a1a1a" }}>
            כתבו חוות דעת
          </button>
        </div>

        {displayed.map((r, i) => {
          const date = new Date(r.createdAt).toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "numeric" });
          const avatarColors = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#f472b6"];
          const avatarBg = avatarColors[i % avatarColors.length];
          return (
            <div key={r.id} className="border rounded-2xl p-5 flex flex-col gap-3 bg-white min-h-[240px]" style={{ borderColor: "#e5e5e5" }}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-base font-bold text-black">{r.name}</span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    <span className="text-xs font-medium" style={{ color: "#16a34a" }}>קנה מאומת</span>
                  </div>
                </div>
                <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-base" style={{ background: avatarBg }}>
                  {r.name.charAt(0)}
                </div>
              </div>
              <Stars r={r.rating} />
              <p className="text-sm text-gray-700 leading-relaxed flex-1">{r.text}</p>
              <span className="text-xs text-gray-400 mt-auto">{date}</span>
            </div>
          );
        })}
      </div>

      {displayCount > 3 && (
        <div className="text-center mt-6">
          <span className="text-base font-semibold cursor-pointer hover:underline text-black">
            צפה בכל {displayCount} חוות הדעת
          </span>
        </div>
      )}

      {showReview && createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black/60" style={{ zIndex: 9999 }} onClick={() => setShowReview(false)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg flex flex-col gap-5" style={{ zIndex: 10000 }} onClick={(e) => e.stopPropagation()}>
            {reviewSent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-black mb-2">תודה על חוות דעתך!</h3>
                <p className="text-gray-500">חוות הדעת שלך התקבלה בהצלחה.</p>
                <button onClick={() => { setShowReview(false); setReviewSent(false); setUserRating(0); setReviewName(""); setReviewText(""); }}
                  className="mt-6 px-8 py-3 rounded-xl text-white font-bold" style={{ background: "#1a1a1a" }}>
                  סגור
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-black">כתבו חוות דעת</h3>
                  <button onClick={() => setShowReview(false)} className="text-3xl text-gray-400 hover:text-black leading-none">✕</button>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-semibold">דירוג</label>
                  <StarInput value={userRating} onChange={setUserRating} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-semibold">שם</label>
                  <input value={reviewName} onChange={(e) => setReviewName(e.target.value)} className="border rounded-xl px-4 py-3 text-base text-black focus:outline-none focus:border-black" style={{ borderColor: "#d0d0d0" }} placeholder="השם שלך" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-semibold">חוות דעת</label>
                  <textarea rows={4} value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="border rounded-xl px-4 py-3 text-base text-black focus:outline-none focus:border-black resize-none" style={{ borderColor: "#d0d0d0" }} placeholder="ספר לנו על החוויה שלך..." />
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
                  className="py-4 rounded-xl text-white text-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ background: "#1a1a1a" }}>
                  {reviewSubmitting ? "שולח..." : "שלח חוות דעת"}
                </button>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
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
    <div className="mt-16 mb-12 -mx-4 lg:-mx-6 xl:-mx-12" style={{ background: "#111", padding: "60px 0" }} dir="rtl">
      <div className="site-container px-8 lg:px-10 xl:px-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">שאלות ותשובות</h2>
        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border" style={{ borderColor: "#ffffff", background: "#1a1a1a" }}>
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-4 sm:py-7 text-right"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-2xl font-light text-white leading-none" style={{ color: "#888" }}>
                  {open === i ? "−" : "+"}
                </span>
                <span className="text-sm sm:text-base font-medium text-white flex-1 text-right">{item.q}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-base text-gray-400 border-t" style={{ borderColor: "#2a2a2a" }}>
                  <p className="pt-4 leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
