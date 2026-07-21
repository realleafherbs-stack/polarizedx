import Image from "next/image";

function PolarizedIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
      <path d="M5.5 18.5 9 16h10.5l2.75 2.25h3.5L28.5 16H39l3.5 2.5" />
      <path d="M8 19.25c.35 7.2 2.45 10.8 7.1 10.8 4.1 0 6.05-2.8 7.15-9.05M40 19.25c-.35 7.2-2.45 10.8-7.1 10.8-4.1 0-6.05-2.8-7.15-9.05" />
      <path d="M11.5 23.25h7M29.5 23.25h7M12.5 26.25h5M30.5 26.25h5" />
      <path d="m9 16-4-3.5M39 16l4-3.5" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
      <path d="m24 6.5 18 9.25L24 25 6 15.75z" />
      <path d="m8.75 22.25-2.75 1.5L24 33l18-9.25-2.75-1.5" />
      <path d="m8.75 30.25-2.75 1.5L24 41l18-9.25-2.75-1.5" />
      <path d="m17.5 15.75 6.5-3.35 6.5 3.35L24 19.1z" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
      <path d="M24 5.5 38 11v10c0 9.9-5.65 16.25-14 21-8.35-4.75-14-11.1-14-21V11z" />
      <circle cx="24" cy="21" r="7" />
      <path d="m20.75 21 2.2 2.25 4.7-4.85M20.5 27.25 19 33l5-2.5 5 2.5-1.5-5.75" />
    </svg>
  );
}

const cards = [
  { icon: PolarizedIcon, title: "POLARIZED", text: "עדשה חוסמת סנוור" },
  { icon: LayersIcon, title: "7 שכבות הגנה", text: "הגנת UV 400 מלאה." },
  { icon: WarrantyIcon, title: "מסגרת חזקה", text: "שנה אחריות. במיוחד בשבילך." },
];

export default function Why() {
  return (
    <section className="w-full py-16 lg:py-24" style={{ background: "#f1ece2" }}>
      <div dir="rtl" className="mx-auto max-w-[1200px] px-3 lg:px-6">
        <h2
          dir="rtl"
          className="mb-8 flex items-center justify-end gap-2 whitespace-nowrap text-[clamp(1.45rem,5vw,4.35rem)] font-black lg:mb-10 lg:justify-start"
          style={{ color: "#11110f" }}
        >
          <span>למה</span>
          <Image
            src="/logo/logo-black.png"
            alt="POLARIZED-X"
            width={599}
            height={46}
            className="inline-block h-[clamp(16px,2.6vw,32px)] w-auto"
          />
          <span>?</span>
        </h2>

        <div
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{ background: "#fbf8f2", border: "1px solid #d4ccbf" }}
        >
          {cards.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className={`grid grid-cols-[52px_minmax(0,1fr)] items-start gap-4 border-[#d4ccbf] p-6 lg:p-9 ${
                i < cards.length - 1 ? "border-b lg:border-b-0 lg:border-e" : ""
              }`}
            >
              <span className="row-span-2 grid h-13 w-13 place-items-center text-gold">
                <Icon />
              </span>
              <h3 className="text-[clamp(1.55rem,2.6vw,2.15rem)] leading-none font-black" style={{ color: "#11110f" }}>
                {title}
              </h3>
              <p className="max-w-[30ch] text-[clamp(1rem,1.5vw,1.18rem)]" style={{ color: "#625d54" }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
