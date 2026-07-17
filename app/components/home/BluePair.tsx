import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Inter } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function BluePair() {
  return (
    <section className="w-full bg-white">
      {/* dir=ltr locks text-left / image-right to match design */}
      <div dir="ltr" className="flex flex-col items-stretch lg:flex-row">

        {/* Left: text */}
        <div dir="rtl" className="flex flex-col justify-center px-8 pt-12 pb-8 text-center text-black sm:px-12 sm:text-right lg:w-1/2 lg:py-0 lg:pr-[min(240px,16.67vw)] lg:pl-2">
          <div className="w-full">
            <h2 dir="ltr" className={`${bebasNeue.className} text-6xl leading-none tracking-tight sm:text-8xl md:text-9xl lg:text-[clamp(40px,6vw,160px)]!`}>
              POLARIZED-<img src="/images/xmark.png" alt="X" className="inline-block h-[0.72em] w-auto align-baseline invert" />
            </h2>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-end sm:justify-start lg:gap-6">
              <p className="text-xl font-semibold sm:text-3xl md:text-4xl lg:text-xl! xl:text-3xl!">
                <span className={inter.className}>POLARIZED</span> אמיתיים.
                <br />
                הבדל שנראה. הבדל שמרגישים.
              </p>
              <Link
                href="/shop"
                dir="rtl"
                className="mb-2 inline-flex shrink-0 items-center gap-3 bg-black px-8 py-2.5 text-lg font-semibold text-white transition-colors hover:bg-zinc-800 sm:gap-4 sm:px-10 sm:py-3 sm:text-xl"
              >
                <span>לחץ לרכישה</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: blue sunglasses */}
        <div className="bluepair-visual relative w-full overflow-hidden lg:w-1/2">
          <Image
            src="/images/hero/sunglasses-drive.jpg"
            alt="POLARIZED-X sunglasses"
            fill
            quality={100}
            className="object-cover object-center select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
