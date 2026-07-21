import Image from "next/image";

export default function Stores() {
  return (
    <section className="w-full border-t" style={{ background: "#24221d", borderColor: "rgba(197,164,58,.22)" }}>
      {/* dir=ltr + margin-left:auto pushes the floating panel to the physical right,
          matching the reference's technique: full-bleed photo, panel floats on top. */}
      <div
        dir="ltr"
        className="relative flex min-h-135 flex-row items-center justify-end overflow-hidden sm:min-h-115 lg:min-h-130"
      >
        <Image
          src="/images/campaign/store-stand-boutique-v2.png"
          alt="סטנד POLARIZED-X בחנות בוטיק"
          fill
          quality={100}
          className="object-cover object-[34%_center] select-none pointer-events-none lg:object-center"
        />

        <div
          dir="rtl"
          className="relative z-10 mr-20 flex w-full flex-col items-start justify-center gap-3 p-6 text-right sm:w-[32%] sm:min-w-95 lg:gap-4 lg:p-8"
          style={{ marginInlineEnd: "clamp(1.25rem, 6vw, 5.5rem)" }}
        >
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "linear-gradient(110deg,rgba(17,17,15,.92),rgba(17,17,15,.78))", boxShadow: "0 1.25rem 3rem rgba(0,0,0,.18)" }}
          />
          <Image
            src="/logo/logo2w.png"
            alt="POLARIZED-X"
            width={360}
            height={28}
            className="h-6 w-auto sm:h-7"
          />
          <h2 className="text-[clamp(2.4rem,4.8vw,4.65rem)] leading-[0.91] font-black text-white">
            קרוב אליך
          </h2>
          <p className="max-w-[27ch] text-base font-bold leading-snug sm:text-xl" style={{ color: "#f0ece4" }}>
            מחכים לכם בעשרות חנויות בוטיק ובתי מרקחת ברחבי הארץ.
          </p>
        </div>
      </div>
    </section>
  );
}
