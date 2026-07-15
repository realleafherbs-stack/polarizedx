"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

const FALLBACK_IMG = "/images/mockproduct.jpg";
const FREE_SHIPPING_THRESHOLD = 199;

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

export default function CartPage() {
  const { items, removeItem, updateQty, total, savings } = useCart();
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : 29;

  return (
    <main>
      <section className="w-full bg-white pt-32 pb-16">
        <div dir="rtl" className="site-container px-6 lg:px-12">
          <h1 className="text-3xl font-bold text-black lg:text-4xl">עגלת קניות</h1>

          {items.length === 0 ? (
            <div className="mx-auto mt-16 flex max-w-md flex-col items-center gap-5 text-center">
              <p className="text-lg font-medium text-zinc-500">העגלה שלך ריקה</p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 bg-black px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                <span>עבור לחנות</span>
                <span aria-hidden>←</span>
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10">
              {/* Cart items */}
              <div className="flex flex-col gap-3 lg:col-span-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border border-zinc-200 bg-white p-4"
                  >
                    <div className="relative h-24 w-24 shrink-0 bg-zinc-50 sm:h-28 sm:w-28">
                      <Image
                        src={item.image ?? FALLBACK_IMG}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-lg font-bold text-black">{item.name}</span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label="הסר פריט"
                          className="shrink-0 text-zinc-400 transition-colors hover:text-red-600"
                        >
                          <TrashIcon />
                        </button>
                      </div>

                      {item.description && (
                        <span className="line-clamp-2 text-sm text-zinc-500">{item.description}</span>
                      )}

                      {item.material && (
                        <span className="inline-flex self-start bg-zinc-100 px-3 py-1 text-xs font-semibold text-black">
                          {item.material}
                        </span>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-black">₪{item.price * item.qty}</span>
                        <div className="flex items-center gap-3 border border-zinc-300 px-3 py-1.5">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="text-lg font-bold leading-none text-black hover:opacity-60"
                          >
                            +
                          </button>
                          <span className="w-5 text-center text-sm font-semibold text-black">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="text-lg font-bold leading-none text-black hover:opacity-60"
                          >
                            −
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Link
                  href="/shop"
                  className="mt-1 self-start text-sm font-medium text-zinc-500 transition-colors hover:text-black"
                >
                  ← המשך קניות
                </Link>
              </div>

              {/* Order summary */}
              <div className="flex h-fit flex-col gap-4 border border-zinc-200 bg-white p-6">
                <h2 className="text-xl font-bold text-black">סיכום הזמנה</h2>

                <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4 text-base">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">סכום ביניים</span>
                    <span className="font-semibold text-black">₪{total}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-600">חיסכון בזוג שני</span>
                      <span className="font-semibold text-green-600">-₪{savings}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-zinc-500">משלוח</span>
                    <span className="font-semibold text-black">
                      {shipping === 0 ? "חינם" : `₪${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-zinc-500">
                      הוסף ₪{FREE_SHIPPING_THRESHOLD - total} למשלוח חינם
                    </p>
                  )}
                </div>

                <div className="flex justify-between text-xl font-bold text-black">
                  <span>סה״כ</span>
                  <span>₪{total + shipping}</span>
                </div>

                <Link
                  href="/checkout"
                  className="mt-1 w-full bg-black py-3.5 text-center text-lg font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  עבור לקופה
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
