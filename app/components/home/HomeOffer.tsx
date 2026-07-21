import Image from "next/image";
import Link from "next/link";

export default function HomeOffer() {
  return (
    <section className="w-full" style={{ background: "#f8f8f5" }}>
      {/* dir=ltr locks image-left / copy-right to match design */}
      <div dir="ltr" className="relative grid grid-cols-1 lg:grid-cols-[1fr_43%] lg:h-[clamp(28.75rem,43vw,38.75rem)]">
        <div className="absolute inset-x-0 top-0 z-10 h-[3px]" style={{ background: "#b18d2a" }} />

        <div className="home-offer-media relative order-2 overflow-hidden lg:order-1">
          <Image
            src="/images/campaign/second-pair-campaign-mobile-v4.jpg"
            alt="משקפי POLARIZED-X בקומפוזיציית מבצע על משטחי אבן"
            fill
            quality={100}
            className="object-cover object-[31%_center] select-none pointer-events-none lg:hidden"
          />
          <Image
            src="/images/campaign/second-pair-campaign-desktop-v4.png"
            alt="משקפי POLARIZED-X בקומפוזיציית מבצע על משטחי אבן"
            fill
            quality={100}
            className="hidden object-cover scale-120 object-left select-none pointer-events-none lg:block"
          />
        </div>

        <div
          dir="rtl"
          className="order-1 flex flex-col items-start justify-center gap-3 px-5 py-6 text-right sm:px-8 lg:order-2 lg:gap-4 lg:px-12"
          style={{ background: "#f8f7f3" }}
        >
          <span
            dir="ltr"
            className="flex w-full items-center gap-3 text-xs font-black tracking-[0.16em]"
            style={{ color: "#80651b" }}
          >
            <span>02 / LIMITED DROP</span>
            <span className="h-px flex-1" style={{ background: "rgba(128,101,27,.55)" }} />
          </span>
          <h3 className="flex items-baseline gap-2 text-4xl font-black leading-[0.92] lg:text-5xl" style={{ color: "#11110f" }}>
            <span>זוג שני</span>
            <strong className="inline-flex items-baseline gap-1 font-black">
              <span>ב-</span>
              <span className="text-gold text-[1.3em] leading-[0.72]">99</span>
              <span>₪</span>
            </strong>
          </h3>
          <p className="text-sm font-bold lg:text-base" style={{ color: "#5e5d57" }}>
            כל הדגמים לבחירה · עד גמר המלאי
          </p>
          <Link
            href="/shop"
            className="inline-flex min-h-12 items-center justify-center gap-2 border px-5 text-base font-black transition-colors"
            style={{ background: "#11110f", color: "#f8f8f5", borderColor: "#11110f" }}
          >
            <span>לרכישה</span>
            <span aria-hidden>←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
