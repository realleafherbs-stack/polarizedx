"use client";

import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "../../../lib/products";

const FALLBACK_IMG = "/images/mockproduct.jpg";

function ProductCard({ p }: { p: StoreProduct }) {
  const image = p.thumbnail ?? p.images?.[0] ?? FALLBACK_IMG;
  return (
    <Link
      href={`/shop/${p.handle || p.id}`}
      className="group mx-auto flex w-full max-w-90 flex-col self-start rounded-md bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative h-44">
        <Image
          src={image}
          alt={p.name}
          fill
          className="object-contain p-1"
        />
      </div>
      <div className="flex items-center justify-between border-t border-zinc-100 px-3 py-2.5">
        <span className="text-base font-normal text-black">{p.price} ₪</span>
        <span className="text-lg font-bold text-black">{p.name}</span>
      </div>
    </Link>
  );
}

function TextCta({ className = "", center = false }: { className?: string; center?: boolean }) {
  return (
    <div
      dir="rtl"
      className={`flex flex-col justify-center gap-5 ${center ? "items-center text-center" : "items-start text-right"} ${className}`}
    >
      <p className="text-[36px] font-normal leading-[1.08] text-black lg:text-[42px]">
        לכל שימוש.
        <br className="hidden lg:block" />
        לכל אירוע.
        <br />
        תמיד איתך.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center gap-4 rounded-md bg-black px-8 py-4 text-xl font-semibold text-white transition-colors hover:bg-zinc-800"
      >
        <span>לכל הקולקציה</span>
        <span aria-hidden>←</span>
      </Link>
    </div>
  );
}

export default function FeaturedProducts({ products }: { products: StoreProduct[] }) {
  return (
    <section className="w-full pt-5 pb-5 bg-[#DBDBDB]">
      {/* ── Mobile + tablet: text/CTA above stacked column ── */}
      <div className="lg:hidden px-6 py-10">
        <TextCta className="mb-8" center />
        <div dir="rtl" className="flex flex-col gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>

      {/* ── Desktop: grid ── */}
      {/* dir=ltr locks card order NAVY X → BLACK X with the text block on the right */}
      <div
        dir="ltr"
        className="mx-auto hidden w-full max-w-[1650px] lg:grid lg:grid-cols-[repeat(4,1fr)_minmax(200px,340px)] lg:gap-3 lg:px-12 lg:py-10"
      >
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
        <TextCta />
      </div>
    </section>
  );
}
