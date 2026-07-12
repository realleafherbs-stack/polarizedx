import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Inter } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function B2bHero() {
  return (
    <section className="w-full bg-black">
      {/* dir=ltr locks image-left / panel-right to match design */}
      <div dir="ltr" className="mt-10 grid grid-cols-1 lg:grid-cols-[85%_15%] items-stretch">

        {/* Left: background image + overlay content */}
        <div className="relative order-2 w-full min-h-96 sm:min-h-0 sm:aspect-375/244 lg:order-1 lg:aspect-auto! lg:min-h-180!">
          <Image
            src="/images/mobile/mobilebghomepage.jpg"
            alt=""
            fill
            priority
            quality={100}
            className="object-cover object-center select-none pointer-events-none sm:object-contain lg:hidden"
          />
          <Image
            src="/images/b2b/b2bhero.jpg"
            alt=""
            fill
            priority
            quality={100}
            className="hidden object-cover object-[center_10%] select-none pointer-events-none lg:block"
          />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-8 pb-0 text-center translate-y-6 sm:justify-bottom sm:px-12 sm:pb-0 sm:translate-y-0 lg:items-start lg:justify-bottom lg:px-16 lg:text-left lg:translate-x-24 lg:translate-y-32">
            <p dir="rtl" className="text-white/90 font-normal text-7xl sm:text-8xl">
              לחנות שלך
            </p>
            <h1 className={`${bebasNeue.className} text-white leading-[0.95] tracking-tight text-7xl sm:text-9xl lg:text-[clamp(9rem,9vw,13rem)]!`}>
              POLARIZED-<span className={inter.className}>X</span>
            </h1>
            <p dir="rtl" className="-mt-1 text-white/90 font-normal text-2xl sm:text-4xl lg:text-5xl">
              קלסיקה אמיתית שהולכת איתך.
            </p>
            <div dir="rtl" className="mt-8 flex flex-col items-center gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-end">
              <Link
                href="/contact"
                className="mb-5 order-1 inline-flex items-center gap-4 self-stretch justify-center bg-white px-10 py-3 text-xl font-semibold text-black transition-colors hover:bg-zinc-200 sm:py-4 lg:order-2 lg:self-start lg:justify-start lg:bg-black lg:py-5 lg:text-white lg:hover:bg-zinc-800"
              >
                <span>דבר עם סוכן</span>
                <span aria-hidden>←</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile/tablet only: sunglasses on stone, below the hero image */}
        <div className="relative order-3 mx-auto min-h-48 w-4/5 bg-black sm:min-h-90 sm:w-full sm:mx-0 lg:hidden">
          <Image
            src="/images/about/aboutblackglasses.png"
            alt="POLARIZED-X sunglasses"
            fill
            className="object-contain select-none pointer-events-none"
          />
        </div>

        {/* Right: retail pitch */}
        <div
          dir="rtl"
          className="flex order-1 min-h-fit w-full flex-col items-center justify-center gap-8 bg-black px-0 py-8 text-center text-white lg:order-2 lg:min-h-80! lg:gap-26 lg:px-6 lg:py-12"
        >
          <Image
            src="/images/hero/putx.png"
            alt=""
            width={98}
            height={202}
            className="mt-5 h-58! w-auto sm:h-64 lg:h-96!"
          />
        </div>
      </div>
    </section>
  );
}
