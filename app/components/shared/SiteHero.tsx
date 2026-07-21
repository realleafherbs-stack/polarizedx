import Image from "next/image";
import Link from "next/link";

export default function SiteHero() {
  return (
    <section className="w-full bg-black">
      {/* ── Mobile ── (photo w/ overlaid headline + CTA → bladed promo band) */}
      <div className="md:hidden">
        <div className="mt-34 sm:mt-10 relative min-h-110">
          <Image
            src="/images/hero/fphero.jpg"
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover scale-150 object-[15%_60%] select-none pointer-events-none"
          />
          <div className="absolute inset-0" />
          <div dir="rtl" className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-6 pb-19">
            <h1 className="text-center font-black leading-[1] text-white text-5xl sm:text-6xl">
              משקפי שמש
              <br />
       <img src="/images/xmark.png" alt="X" className="inline-block h-[0.72em] w-auto align-baseline" />-POLARIZED
            </h1>
            <p className="text-center text-xl font-normal text-white/85 sm:text-lg">
              ראייה חדה והגנת UV400 מלאה
            </p>
            <Link
              href="/shop"
              className="mt-1 flex items-center justify-center self-center w-[72%] bg-gold px-8 py-3.5 text-xl font-bold text-black transition-opacity hover:opacity-90"
            >
              לחץ לרכישה
            </Link>
            <Image src="/images/hero/glogo.png" alt="POLARIZED-X" width={123} height={16} className="h-4.5 w-auto self-center" />
          </div>
        </div>
      </div>

      {/* ── Desktop ── (dir=ltr locks photo-left / promo-right to match the design) */}
      <div dir="ltr" className="mt-20 hidden md:block">
        <div className="relative min-h-100 lg:min-h-130 xl:min-h-160">
          {/* Full-bleed photo — runs under the promo panel so the blade reveals it */}
          <Image
            src="/images/hero/fphero.jpg"
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-[center_10%] select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/45" />

          {/* Left: headline right-aligned, CTA + wordmark on the start edge */}
          <div className="absolute mt-15 inset-y-0 left-0 flex w-[90%] flex-col justify-center gap-4 px-8 lg:gap-5 lg:px-6">
            <h1 dir="rtl" className="text-right font-bold leading-[0.92] text-white text-[clamp(1.5rem,3.5vw,4.5rem)]">
              משקפי שמש
              <br />
              <img src="/images/xmark.png" alt="X" className="inline-block h-[0.72em] w-auto align-baseline" />-POLARIZED
            </h1>
            <p dir="rtl" className="text-right font-normal text-white/85 text-[clamp(1.6rem,2.1vw,2.3rem)]">
              ראייה חדה והגנת UV400 מלאה            </p>
            <Link
              href="/shop"
              dir="rtl"
              className="mt-1 inline-flex items-center justify-center self-end bg-gold px-16 py-3.5 font-bold text-black transition-opacity hover:opacity-90 text-[clamp(0.95rem,1.15vw,1.35rem)]"
            >
              לחץ לרכישה
            </Link>
            <Image src="/images/hero/glogo.png" alt="POLARIZED-X" width={123} height={16} className="h-3.5 w-auto self-end lg:h-4.5" />
          </div>

        </div>
      </div>
    </section>
  );
}
