import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function WhyX() {
  return (
    <section className="w-full bg-black">
      {/* dir=ltr locks text-left / image-right to match design */}
      <div dir="ltr" className="flex flex-col items-center gap-8 lg:flex-row lg:gap-0">

        {/* Left: text */}
        <div dir="rtl" className="px-8 py-12 text-center text-white sm:px-12 lg:w-1/2 lg:py-0 lg:pl-16 lg:pr-4">
          <div className="mx-auto max-w-md">
            <h2 className="-mt-6 text-3xl font-regular sm:text-4xl">אז בנינו משהו שלא היה.</h2>
            <div className="mt-6 text-xl font-regular leading-relaxed text-white sm:text-2xl">
              <p>משקפי פולורייד אמיתיים.</p>
              <p>בלי קיצורי דרך באיכות.</p>
              <p>בלי קישוטים מיותרים.</p>
              <p>בלי תירוצים על המחיר.</p>
            </div>
            <p className="mt-8 text-2xl font-regular sm:text-4xl">6 דגמים. כל אחד עם <span className={inter.className}>X</span> שלו.</p>
          </div>
        </div>

        {/* Right: sunglasses on stone */}
        <div className="relative h-64 w-full overflow-hidden md:h-155 lg:h-[min(560px,38.89vw)] lg:w-1/2">
          <Image
            src="/images/hero/black_sunglasses.jpg"
            alt="POLARIZED-X sunglasses"
            fill
            quality={100}
            className="object-cover object-[center_20%] select-none pointer-events-none md:object-[center_10%] lg:object-contain lg:scale-90"
          />
        </div>
      </div>
    </section>
  );
}
