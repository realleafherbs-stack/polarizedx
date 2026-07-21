import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "../../../lib/products";

const FALLBACK_IMG = "/images/mockproduct.jpg";

function ProductCard({ p }: { p: StoreProduct }) {
  const image = p.thumbnail ?? p.images?.[0] ?? FALLBACK_IMG;
  return (
    <Link
      href={`/shop/${p.handle || p.id}`}
      className="group flex w-[calc((100vw-2.5rem-1px)/1.1)] shrink-0 snap-start flex-col overflow-hidden text-black transition-transform duration-300 hover:-translate-y-1 sm:w-auto sm:shrink"
      style={{ background: "#f4f1ea" }}
    >
      <div className="relative aspect-square overflow-hidden" style={{ background: "#fff" }}>
        <Image
          src={image}
          alt={p.name}
          fill
          className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-110"
        />
      </div>
      <div dir="rtl" className="flex items-baseline justify-between gap-4 border-t px-4 py-4" style={{ borderColor: "#d8d2c8" }}>
        <span className="line-clamp-1 text-lg font-black tracking-wide">{p.name}</span>
        <span className="whitespace-nowrap text-lg font-black">{p.price} ₪</span>
      </div>
    </Link>
  );
}

export default function Collection({ products }: { products: StoreProduct[] }) {
  return (
    <section className="w-full py-9 lg:py-16" style={{ background: "linear-gradient(145deg,#eee7da 0%,#e6dccb 100%)" }}>
      <div dir="rtl" className="mx-auto max-w-[1180px]">
        <div className="mb-5 px-5 sm:px-0 lg:mb-8">
          <h2 className="text-[clamp(3rem,5vw,4.7rem)] leading-[0.9] font-black tracking-tight text-black">
            כל אחד עם ה-
            <img src="/images/xmark.png" alt="X" className="inline-block h-[0.58em] w-auto align-baseline" />
            {" "}שלו.
          </h2>
        </div>

        {/* Campaign banner */}
        <div
          className="relative mx-5 mb-6 grid h-65 grid-cols-2 gap-[3px] overflow-hidden border sm:h-70 lg:mx-0 lg:h-85 lg:grid-cols-[1.15fr_.8fr_1.05fr]"
          style={{ background: "#171717", borderColor: "rgba(118,90,11,.28)" }}
        >
          <div className="relative h-full w-full">
            <Image src="/images/campaign/lifestyle-black-v3.png" alt="דוגמן מרכיב BLACK X בכביש מדברי" fill className="object-cover" />
          </div>
          <div className="relative h-full w-full">
            <Image src="/images/campaign/lifestyle-wild-woman-v3.png" alt="דוגמנית מרכיבה WILD X בסביבה ים תיכונית" fill className="object-cover object-[42%_center]" />
          </div>
          <div className="relative hidden h-full w-full lg:block">
            <Image src="/images/campaign/lifestyle-clear-v1.png" alt="דוגמן מרכיב CLEAR X לצד אדריכלות מודרנית" fill className="object-cover" />
          </div>
          <div
            className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-4 border px-3 py-2.5 sm:bottom-5 sm:left-auto sm:right-5 sm:justify-start sm:px-5 sm:py-4"
            style={{ background: "rgba(12,12,12,.9)", borderColor: "rgba(212,175,55,.7)" }}
          >
            <Image src="/logo/logo2w.png" alt="POLARIZED-X" width={245} height={19} className="h-4 w-auto sm:h-5" />
            <span dir="ltr" className="text-gold whitespace-nowrap text-[11px] font-black tracking-[0.12em] sm:text-sm">
              PUT AN X ON IT
            </span>
          </div>
        </div>

        {/* Mobile-only: hint that the product row scrolls horizontally */}
        <div className="mb-2.5 flex items-center justify-end gap-1.5 px-5 sm:hidden" style={{ color: "#8d6c12" }}>
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

        {/* Product grid */}
        <div
          className="flex snap-x snap-mandatory gap-px overflow-x-auto px-5 pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0"
          style={{ background: "#c9c2b6" }}
        >
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        <div className="mt-7 flex justify-center lg:mt-9">
          <Link
            href="/shop"
            className="bg-gold inline-flex min-h-12 items-center justify-center gap-2 px-8 text-lg font-black text-black transition-opacity hover:opacity-90"
          >
            <span>לכל הקולקציה</span>
            <span aria-hidden>←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
