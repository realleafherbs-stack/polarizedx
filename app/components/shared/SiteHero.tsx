import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

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
              POLARIZED-<img src="/images/xmark.png" alt="X" className="inline-block h-[0.72em] w-auto align-baseline" />
            </h1>
            <p dir="rtl" className="mt-1 text-center text-white/90 font-normal text-2xl">
                 משקפי שמש שהולכים איתך.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center px-6 pt-3 pb-0">
            <Link
              href="/shop"
              dir="rtl"
              className="inline-flex items-center gap-4 bg-white px-12 py-4 text-2xl font-semibold text-black transition-colors hover:bg-white hover:text-black"
            >
              <span>לרכישה</span>
            </Link>
          </div>
        </div>

        <div className="relative h-80 w-full bg-black px-6 pt-6 pb-10">
          <Image
            src="/images/hero/puxonit-v4.png"
            alt="PUT AN X ON IT"
            fill
            className="scale-200 object-contain"
          />
        </div>
      </div>

      {/* ── Desktop split hero ── (dir=ltr locks image-left / panel-right to match design) */}
      <div dir="ltr" className="mt-24 hidden md:grid md:grid-cols-[80%_20%] items-stretch">

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
            src="/images/hero/heroimage.jpg"
            alt=""
            fill
            priority
            quality={100}
            className="hidden object-cover object-[center_10%] select-none pointer-events-none lg:block"
          />
          <div className="absolute inset-0 flex flex-col justify-center translate-x-6 translate-y-12 px-8 lg:px-16">
            <h1 className={`${bebasNeue.className} text-white leading-[0.95] tracking-tight text-[clamp(3rem,8vw,13.5rem)]`}>
              POLARIZED-<img src="/images/xmark.png" alt="X" className="inline-block h-[0.72em] w-auto align-baseline" />
            </h1>
            <p dir="rtl" className="-mt-1 text-left text-white/90 font-normal text-4xl">
              קלסיקה אמיתית שהולכת איתך.
            </p>
            <Link
              href="/shop"
              dir="rtl"
              className="mt-8 inline-flex items-center gap-3 self-start bg-black px-14 py-4 text-2xl font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              <span>לרכישה</span>
            </Link>
          </div>
        </div>

        {/* Right: black panel split top/bottom */}
        <div className="flex flex-col bg-black">
          {/* PUT AN X ON IT + tagline */}
          <div className="relative flex-1 px-2 py-6">
            <Image
              src="/images/hero/puxonit-v4.png"
              alt="PUT AN X ON IT"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
