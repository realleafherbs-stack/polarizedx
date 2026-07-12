import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "400" });

export default function B2bStand() {
  return (
    <section className={`${inter.className} w-full bg-black`}>
      {/* dir=ltr locks text-left / stand-right to match design */}
      <div dir="ltr" className="grid grid-cols-1 items-stretch lg:grid-cols-[1fr_1fr]">

        {/* Left: text */}
        <div dir="rtl" className="order-2 flex flex-col justify-center bg-black px-8 py-12 text-center text-white sm:px-12 lg:order-1 lg:pl-16 lg:pr-32 lg:text-right">
          <h2 className="text-4xl font-normal leading-tight lg:text-5xl">הסטנד לחנות שלך.</h2>
          <p className="mt-2 text-3xl font-regular leading-snug text-white lg:text-4xl">
            נראה מצוין.
            <br />
            תופס מעט מקום.
            <br />
            משאיר רושם גדול.
          </p>
          <p className="mt-8 text-lg text-white lg:text-xl">51 x 19 x 11.5 ס&quot;מ</p>
          <p className="mt-1 text-lg text-white lg:text-xl">כולל ראי מקדימה</p>
        </div>

        {/* Right: stand on white */}
        <div className="relative order-1 min-h-96 w-full bg-white sm:min-h-125 lg:order-2 lg:min-h-140">
          <Image
            src="/images/hero/retailpitch.jpg"
            alt="POLARIZED-X display stand"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
