import Image from "next/image";
import Link from "next/link";

/* The promo panel's diagonal gold edge. Kept here so the gold layer and the
   textured layer above it always slice on the exact same angle. */
const MOBILE_BLADE = { ["--blade-y" as string]: "16%" };

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

        {/* Promo band — the blade slices it off the photo above. The band is
            pulled up over the photo and left transparent, so the wedge above
            the gold rule reveals the photo rather than flat black. */}
        <div className="relative -mt-12" style={MOBILE_BLADE}>
          <div className="hero-blade-m absolute inset-0 bg-gold" />
          <div className="hero-blade-m-inner relative">
            <Image
              src="/images/hero/rbg-wide.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center select-none pointer-events-none"
            />
            <div dir="rtl" className="text-center relative flex flex-col items-center gap-1 px-6 pt-12 pb-7 text-center">
              <p className="text-center text-2xl font-semibold leading-none text-white">זוג שני ב-</p>
              <p className="flex items-center mr-10 justify-center gap-2 leading-none">
                <span className="text-center font-black text-gold text-8xl">99</span>
                <span className="text-center font-bold text-gold text-4xl">₪</span>
              </p>
              <p className="text-center text-3xl font-semibold leading-none text-white">בלבד</p>
              <p className="mt-2 text-[1rem] leading-tight text-white">הזול מביניהם · עד גמר המלאי</p>
            </div>
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
