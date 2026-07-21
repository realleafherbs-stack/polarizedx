import Image from "next/image";

export default function B2B() {
  return (
    <section className="w-full border-t" style={{ background: "#292823", borderColor: "rgba(197,164,58,.22)" }}>
      {/* dir=ltr + margin-left:auto pushes the floating panel to the physical right,
          matching the reference's technique: full-bleed photo, panel floats on top. */}
      <div
        dir="ltr"
        className="relative flex min-h-135 flex-row items-center justify-end overflow-hidden sm:min-h-115 lg:min-h-130"
      >
        <Image
          src="/images/campaign/b2b-retail-v2.png"
          alt="שני אנשים משוחחים ליד תצוגת משקפי שמש בחנות בוטיק"
          fill
          quality={100}
          className="object-cover object-[43%_65%] select-none pointer-events-none lg:object-[center_15%]"
        />

        <div
          dir="rtl"
          className="relative z-10 sm:mr-30 flex w-full flex-col items-start justify-center gap-3 p-6 text-right sm:w-[42%] sm:min-w-95 lg:gap-4 lg:p-8"
          style={{ marginInlineEnd: "clamp(1.25rem, 6vw, 5.5rem)" }}
        >
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "linear-gradient(110deg,rgba(17,17,15,.9),rgba(17,17,15,.72))", boxShadow: "0 1.25rem 3rem rgba(0,0,0,.18)" }}
          />
          <h2 className="max-w-[10.5ch] text-[clamp(2.4rem,4.8vw,4.65rem)] leading-[0.91] font-black text-white">
            בעל עסק?
            <br />
            הלקוחות שלנו ישמחו להגיע אליך.
          </h2>
          <p className="flex flex-wrap items-center gap-2 text-sm font-bold sm:text-base" style={{ color: "#f0ece4" }}>
            <span>משאירים פרטים</span>
            <span aria-hidden>←</span>
            <span>מוודאים התאמה</span>
            <span aria-hidden>←</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Image src="/logo/logo2w.png" alt="POLARIZED-X" width={90} height={7} className="h-3.5 w-auto" />
              <span>בדרך אליך</span>
            </span>
          </p>
          <a
            href="https://wa.me/972587991094"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold inline-flex min-h-12 items-center gap-2 px-6 text-lg font-black text-black transition-transform hover:-translate-y-0.5"
          >
            <span>בוא נדבר</span>
            <span aria-hidden>←</span>
          </a>
        </div>
      </div>
    </section>
  );
}
