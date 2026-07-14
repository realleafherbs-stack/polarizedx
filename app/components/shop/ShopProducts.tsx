"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import type { StoreProduct } from "../../../lib/products";

const PAGE_SIZE = 12;
const FALLBACK_IMG = "/images/mockproduct.jpg";

function getProductHref(p: StoreProduct): string {
  return `/shop/${p.handle || p.id}`;
}

function ProductCard({ p }: { p: StoreProduct }) {
  const { addItem } = useCart();
  const image = p.thumbnail ?? p.images?.[0] ?? FALLBACK_IMG;
  const rating = p.rating ?? 0;
  const reviewCount = p.reviewCount ?? 0;
  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-md">
      <Link href={getProductHref(p)} className="flex flex-col">
        <div className="relative flex items-center justify-center bg-white" style={{ aspectRatio: "4/3" }}>
          <Image
            src={image}
            alt={p.name}
            fill
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div dir="rtl" className="flex flex-col gap-2 px-4 pt-3 text-right">
          <p className="min-h-[3.1rem] line-clamp-2 text-center text-xl font-normal leading-snug text-black">{p.name}</p>
          <div className="flex items-center justify-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, n) => (
                <svg key={n} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill={rating > 0 && n < Math.round(rating) ? "#f59e0b" : "#e5e7eb"}
                  stroke={rating > 0 && n < Math.round(rating) ? "#f59e0b" : "#e5e7eb"} strokeWidth="0.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            {reviewCount > 0 && <span className="text-xs text-zinc-400">({reviewCount})</span>}
          </div>
          {p.color && <p className="text-sm text-zinc-500">צבע: {p.color}</p>}
          <p className="text-center text-2xl font-semibold text-black">{p.price} ₪</p>
        </div>
      </Link>
      <div className="px-4 pb-4 pt-3">
        <button
          type="button"
          onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image })}
          className="w-full rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
        >
          הוסף לסל
        </button>
      </div>
    </div>
  );
}

export default function ShopProducts({ products }: { products: StoreProduct[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageProducts = products.slice(start, start + PAGE_SIZE);

  return (
    <section className="w-full py-10" style={{ background: "#f9fafb" }}>
      {/* ── Mobile + tablet: single/two column grid ── */}
      <div dir="rtl" className="grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 lg:hidden">
        {pageProducts.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      {/* ── Desktop: grid ── */}
      <div
        dir="rtl"
        className="site-container hidden lg:grid lg:grid-cols-[repeat(4,clamp(14rem,17vw,19rem))] justify-center gap-x-6 gap-y-6 px-12"
      >
        {pageProducts.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      {totalPages > 1 && (
        <div dir="rtl" className="mt-8 flex items-center justify-center gap-2 px-6">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-zinc-100 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            הקודם
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={page === n}
              className={`h-9 w-9 rounded-md text-sm font-semibold transition-colors ${
                page === n ? "bg-black text-white" : "text-black hover:bg-zinc-100"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-zinc-100 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            הבא
          </button>
        </div>
      )}
    </section>
  );
}
