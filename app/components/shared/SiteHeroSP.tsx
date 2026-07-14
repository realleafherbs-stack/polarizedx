import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function SiteHeroSP() {
  return (
    <section className="w-full bg-black">
      {/* ── Mobile stack ── (image+title → button → product photo → PUT AN X panel) */}
      <div className="md:hidden">
        <div className="mt-22 sm:mt-10 lg:mt-0 relative min-h-82 sm:min-h-82 lg:min-h-72">
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
              קלסיקה אמיתית שהולכת איתך.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-white">
          <div className="flex justify-center px-6 pt-3 pb-0">
            <Link
              href="/shop"
              dir="rtl"
              className="inline-flex items-center gap-4 bg-black px-12 py-4 text-xl font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              <span>לרכישה</span>
            </Link>
          </div>

          <div className="relative -mt-10 min-h-64 pointer-events-none">
            <Image
              src="/images/hero/hero-sunglasses-transparent.png"
              alt="POLARIZED-X sunglasses"
              fill
              className="object-contain px-4 pb-4 pt-0 select-none pointer-events-none mask-[linear-gradient(to_bottom,black_92%,transparent_100%)]"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 bg-black px-6 pt-6 pb-10 text-center">
          <div className="relative h-64 w-full">
            <Image
              src="/images/hero/puxonit-v4.png"
              alt="PUT AN X ON IT"
              fill
              className="object-contain"
            />
          </div>
          <p dir="rtl" className="mt-2 text-lg leading-relaxed text-white/80">
            פולורייזד אמיתי. נגיש. כמו שצריך.
          </p>
        </div>
      </div>

      {/* ── Desktop split hero ── (dir=ltr locks image-left / panel-right to match design) */}
      <div dir="ltr" className="mt-24 hidden md:grid md:grid-cols-[78%_22%] items-stretch">

        {/* Left: background image + overlay content */}
        <div className="relative min-h-85 lg:min-h-115 xl:min-h-145">
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
          {/* Top: PUT AN X ON IT + tagline */}
          <div className="flex flex-[3] flex-col items-center justify-center px-2 py-2 text-center">
            <div className="relative min-h-40 w-full flex-1 lg:min-h-56 xl:min-h-72">
              <Image
                src="/images/hero/puxonit-v4.png"
                alt="PUT AN X ON IT"
                fill
                className="scale-200 object-contain"
              />
            </div>
            {/* <p dir="rtl" className="-mt-2 mb-3 lg:mb-6 text-lg lg:text-xl leading-relaxed text-white/80">
              פולורייזד אמיתי. נגיש. כמו שצריך.
            </p> */}
          </div>
          {/* Bottom: sunglasses product on white */}
          <div className="relative flex-4 min-h-48 lg:min-h-64 xl:min-h-84 bg-white">
            <Image
              src="/images/hero/hero-sunglasses-transparent.png"
              alt="POLARIZED-X sunglasses"
              fill
              className="object-contain p-1 select-none pointer-events-none mask-[linear-gradient(to_bottom,black_92%,transparent_100%)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
