import Image from "next/image";
import Link from "next/link";




export default function AboutRetail() {
  return (
    <section className="w-full bg-black">
      {/* dir=ltr locks text-left / image-right to match design */}
      <div dir="ltr" className="flex flex-col items-stretch lg:grid lg:grid-cols-[50%_50%]">

        {/* Left: text + CTA */}
        <div dir="rtl" className="order-2 flex flex-col justify-center bg-black px-8 py-12 text-right text-white sm:px-12 lg:order-none lg:px-16">
          <p className="text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl lg:leading-none">
            יצרנו שיתופי פעולה עם
            <br />
            נבחרת בוטיקים
            <br />
            מהממת ברחבי הארץ.
          </p>
          <p className="mt-9 text-2xl text-white sm:text-2xl">ובנינו מערך הפצה שמגיע אליכם עד הבית.</p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-3 self-center bg-white px-6 py-3 text-xl font-semibold text-black transition-colors hover:bg-zinc-200 sm:self-start"
          >
            <span>בעל חנות - בואו נדבר </span>
          </Link>
        </div>

        {/* Right: packaging on light gray */}
        <div className="order-1 relative min-h-56 w-full bg-[#e3dede] overflow-hidden sm:min-h-72 lg:order-0 lg:min-h-70">
          <Image
            src="/images/about/packagebg.png"
            alt="POLARIZED-X packaging"
            fill
            quality={100}
            className="object-contain object-center select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
