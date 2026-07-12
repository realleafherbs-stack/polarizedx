import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function OrangePair() {
  return (
    <section className="w-full bg-white">
      {/* dir=ltr locks image-left / text-right to match design */}
      <div dir="ltr" className="flex flex-col items-center gap-2 sm:gap-8 lg:flex-row lg:gap-0">

        {/* Left: orange sunglasses */}
        <div className="relative h-72 w-full overflow-hidden lg:h-[min(420px,29.17vw)] lg:w-1/2">
          <Image
            src="/images/about/orange_glasses.jpg"
            alt="POLARIZED-X sunglasses"
            fill
            quality={100}
            className="object-contain object-center select-none pointer-events-none"
          />
        </div>

        {/* Right: text */}
        <div dir="rtl" className="px-8 pt-0 pb-12 text-center text-black sm:px-12 lg:py-0 lg:w-1/2 lg:pl-2 lg:pr-16 lg:text-right">
          <div className="w-full lg:-translate-x-32">
            <h2 className={`${bebasNeue.className} text-[clamp(3.5rem,15vw,5.5rem)] leading-none tracking-tight sm:text-8xl lg:text-[clamp(48px,9vw,220px)]!`}>
              POLARIZED-X
            </h2>
            <p className="-mt-2 text-xl font-semibold sm:text-xl lg:text-[clamp(1.5rem,2.2vw,2.5rem)]!">קלסיקה אמיתית שהולכת איתך.</p>
            <Link
              href="/shop"
              dir="rtl"
              className="mt-6 inline-flex items-center gap-4 self-center bg-black px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-800 lg:self-start lg:px-10! lg:py-5! lg:text-xl!"
            >
              <span>לרכישה</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
