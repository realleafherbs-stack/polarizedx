import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function SecondPair() {
  return (
    <section className="w-full bg-white">
      {/* dir=ltr locks image-left / packaging-right to match design */}
      <div dir="ltr" className="relative grid grid-cols-1 items-stretch lg:grid-cols-2">

        {/* Left: lifestyle image + overlay text + CTA */}
        <div className="relative order-2 min-h-[420px] overflow-hidden lg:order-1 lg:min-h-[460px]">
          <Image
            src="/images/hero/3rdleft.png"
            alt=""
            fill
            quality={100}
            className="object-cover object-center select-none pointer-events-none"
          />
          <div
            dir="rtl"
            className="absolute inset-0 flex flex-col items-start justify-center px-8 text-right text-white sm:px-12 -translate-x-6 mb-22"
          >
            <h2 className="text-4xl font-normal lg:text-5xl">זוג שני - 100 ₪</h2>
            <p className="mt-12 text-2xl font-normal leading-snug lg:text-3xl">
              כל זוג.
              <br />
              כל שילוב.
              <br />
              כי זוג אחד אף פעם לא מספיק.
            </p>
          </div>
        </div>

        <Link
          href="/shop"
          dir="rtl"
          className="absolute bottom-8 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-3 whitespace-nowrap bg-black px-9 py-3 text-lg font-semibold text-white transition-colors hover:bg-zinc-800 sm:gap-4 sm:px-10 sm:py-3 sm:text-lg"
        >
          <span>לרכישה</span>
        </Link>

        {/* Right: packaging on white */}
        <div dir="rtl" className="order-1 flex flex-col bg-white px-8 py-6 sm:px-12 lg:order-2">
          <h2 className="text-right text-3xl font-bold text-black lg:text-5xl">
            אריזה ששווה לשמור.
          </h2>
          <p className="mt-6 text-right text-xl font-regular text-black lg:text-2xl">
            חוויה שמתחילה עוד לפני שמרכיבים את המשקפיים.
          </p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-center">
            <div className="w-fit shrink-0 text-right text-2xl leading-snug text-black">
            </div>
            <div className="relative aspect-429/310 w-full mt-8 max-w-sm md:max-w-md lg:max-w-xl lg:flex-1">
              <Image
                src="/images/hero/package-product.jpg"
                alt="POLARIZED-X packaging"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
