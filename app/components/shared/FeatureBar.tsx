import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: "600" });

const features: { en: string; he: string; icon?: string }[] = [
  { en: "PC FRAME", he: "מסגרת פוליקרבונט", icon: "/icn/wshield.png" },
  { en: "POLARIZED", he: "סינון קרני אור חזק", icon: "/icn/waves.png" },
  { en: "UV 400", he: "הגנה מלאה מקרני השמש", icon: "/icn/sun.png" },
  { en: "7 LAYERS", he: "7 שכבות להגנה מושלמת", icon: "/icn/layers.png" },
];

export default function FeatureBar() {
  return (
    <div className="bg-white py-4">
      <div
        dir="ltr"
        className="relative mx-auto grid w-full max-w-[1800px] grid-cols-2 px-6 lg:grid-cols-4 lg:divide-x lg:divide-black"
      >
        {features.map((f) => (
          <div
            key={f.en}
            className="grid grid-cols-[1fr_auto] items-center justify-center gap-2 px-2 py-6 sm:gap-3 sm:px-4 md:gap-6 md:px-20 lg:gap-[clamp(0.5rem,1.5vw,1.5rem)] lg:px-[clamp(1rem,3vw,5rem)]"
          >
            <div className="text-right">
              <div className={`${montserrat.className} font-semibold tracking-widest text-black text-sm sm:text-lg sm:tracking-[0.15em] md:text-2xl lg:text-[clamp(1.1rem,1.6vw,1.5rem)]`}>{f.en}</div>
              <div dir="rtl" className="text-xs font-normal text-black sm:text-sm md:text-lg lg:text-[clamp(0.75rem,1vw,1.125rem)]">
                {f.he}
              </div>
            </div>
            {/* Icon placeholder — swap for the real icon when provided */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/70 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-[clamp(3.5rem,5vw,5rem)] lg:w-[clamp(3.5rem,5vw,5rem)]">
              {f.icon && (
                <Image
                  src={f.icon}
                  alt=""
                  width={24}
                  height={24}
                  className={`object-contain${f.icon.includes("wshield") ? " h-8 w-8 sm:h-11 sm:w-11 invert" : " h-7 w-7 sm:h-9 sm:w-9"}`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
