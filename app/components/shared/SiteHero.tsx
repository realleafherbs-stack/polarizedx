import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Inter } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function SiteHero() {
  return (
    <section className="w-full bg-black">
      {/* ── Mobile stack ── (image+title → button → product photo → PUT AN X panel) */}
      <div className="md:hidden">
        <div className="mt-22 sm:mt-10 lg:mt-0 relative min-h-96 sm:min-h-96 lg:min-h-88">
          <Image
            src="/images/mobile/mobilebghomepage.jpg"
            alt=""
            fill
            priority
            quality={100}
            className="object-cover object-[center_60%] select-none pointer-events-none"
          />
          <div dir="ltr" className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-6 text-center">
            <h1 className={`${bebasNeue.className} text-white leading-[0.95] tracking-tight text-7xl sm:text-8xl`}>
              POLARIZED-<span className={inter.className}>X</span>
            </h1>
            <p dir="rtl" className="mt-1 text-center text-white/90 font-normal text-2xl">
              קלסיקה אמיתית שהולכת איתך.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center px-6 pt-3 pb-0">
            <Link
              href="/shop"
              dir="rtl"
              className="inline-flex items-center gap-4 bg-white px-10 py-4 text-2xl font-semibold text-black transition-colors hover:bg-white hover:text-black"
            >
              <span>לרכישה</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 bg-black px-6 pt-6 pb-10 text-center">
          <Image
            src="/images/hero/puxonit.png"
            alt="PUT AN X ON IT"
            width={260}
            height={170}
            className="h-56 w-auto object-contain"
          />
        </div>
      </div>

      {/* ── Desktop split hero ── (dir=ltr locks image-left / panel-right to match design) */}
      <div dir="ltr" className="mt-30 hidden md:grid md:grid-cols-[75%_25%] items-stretch">

        {/* Left: background image + overlay content */}
        <div className="relative min-h-100 lg:min-h-130 xl:min-h-160">
          <Image
            src="/images/mobile/mobilebghomepage.jpg"
            alt=""
            fill
            priority
            quality={100}
            className="object-cover object-[center_28%] select-none pointer-events-none lg:hidden"
          />
          <Image
            src="/images/hero/heroimage.png"
            alt=""
            fill
            priority
            quality={100}
            className="hidden object-cover object-[center_10%] select-none pointer-events-none lg:block"
          />
          <div className="absolute inset-0 flex flex-col justify-center translate-x-6 translate-y-12 px-8 lg:px-16">
            <h1 className={`${bebasNeue.className} text-white leading-[0.95] tracking-tight text-[clamp(3rem,8vw,13.5rem)]`}>
              POLARIZED-<span className={inter.className}>X</span>
            </h1>
            <p dir="rtl" className="-mt-1 text-left text-white/90 font-normal text-4xl">
              קלסיקה אמיתית שהולכת איתך.
            </p>
            <Link
              href="/shop"
              dir="rtl"
              className="mt-8 inline-flex items-center gap-3 self-start bg-black px-12 py-4 text-2xl font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              <span>לרכישה</span>
            </Link>
          </div>
        </div>

        {/* Right: black panel split top/bottom */}
        <div className="flex flex-col bg-black">
          {/* PUT AN X ON IT + tagline */}
          <div className="flex flex-1 flex-col items-center justify-center px-2 py-2 text-center">
            <Image
              src="/images/hero/puxonit.png"
              alt="PUT AN X ON IT"
              width={260}
              height={170}
              className="h-32 w-auto object-contain lg:h-44 xl:h-72 mt-1 lg:mt-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
