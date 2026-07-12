import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function RetailPitch() {
  return (
    <section className="w-full bg-black">
      {/* dir=ltr locks column order: drive | text */}
      <div
        dir="ltr"
        className="grid grid-cols-1 items-stretch lg:grid-cols-[10fr_7fr]"
      >
        {/* Left: polarized close-up + caption */}
        <div className="order-4 flex flex-col bg-black lg:order-0">
          <div className="relative aspect-672/340 w-full lg:aspect-auto lg:min-h-100 xl:min-h-112 2xl:min-h-128 lg:flex-1">
            <Image
              src="/images/hero/retailpitch.jpg"
              alt="POLARIZED lenses"
              fill
              quality={100}
              className="object-cover object-center select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Mobile/tablet only: CTA below the drive image */}
        <Link
          href="/contact"
          dir="rtl"
          className="order-3 mx-auto mb-8 inline-flex items-center gap-4 rounded-md border border-white bg-white px-8 py-4 text-xl font-semibold text-black transition-colors hover:bg-white/90 lg:hidden"
        >
          <span>בעל עסק - בוא נדבר</span>
        </Link>

        {/* Right: retail pitch + CTA */}
        <div
          dir="rtl"
          className="order-1 flex flex-col items-center justify-center bg-black px-8 py-10 text-center text-white sm:px-12 lg:order-0"
        >
          <div className="self-center max-w-lg text-center lg:mr-[min(4rem,4.44vw)] lg:self-start lg:text-right">
            <h2 className="text-center text-4xl font-regular sm:text-5xl lg:text-right lg:text-4xl">ניתן להשיג </h2>
            <h2 className="mb-10 text-center text-4xl font-regular sm:text-5xl lg:text-right lg:text-4xl">בחנויות נבחרות</h2>
            <p className="mb-10 leading-snug text-3xl text-white">
              דאגנו שתוכלו להנות מהם בצורה זמינה
            </p>
            <Link
              href="/contact"
              className="hidden items-center gap-4 whitespace-nowrap rounded-md border border-white bg-white px-8 py-4 text-xl font-semibold text-black transition-colors hover:bg-white/90 lg:inline-flex lg:text-[clamp(0.95rem,1.35vw,1.25rem)] lg:px-[clamp(1.25rem,2.2vw,2rem)]"
            >
              <span>בעל עסק - בוא נדבר</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
