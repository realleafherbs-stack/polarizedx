import Image from "next/image";

export default function Story() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#11100f" }}>
      <div className="relative flex min-h-135 items-center px-6 py-20 sm:min-h-150 lg:min-h-175 lg:px-20 lg:py-32">
        <Image
          src="/images/campaign/story-brand-v1.png"
          alt=""
          fill
          quality={100}
          className="object-cover object-[35%_center] select-none pointer-events-none lg:object-center"
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(180deg,rgba(8,8,8,.94) 0%,rgba(8,8,8,.68) 32%,rgba(8,8,8,.14) 62%,rgba(8,8,8,.5) 100%)" }}
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: "linear-gradient(90deg,rgba(9,9,9,.05) 0%,rgba(9,9,9,.22) 42%,rgba(9,9,9,.9) 76%,rgba(9,9,9,.98) 100%)" }}
        />

        <div dir="rtl" className="relative z-10 mr-0 ml-auto w-full text-right" style={{ maxWidth: "740px" }}>
          <Image
            src="/logo/logo2w.png"
            alt="POLARIZED-X"
            width={285}
            height={22}
            className="mb-5 h-6 w-auto sm:h-7 lg:h-8"
          />
          <h2 className="story-heading mb-4 text-[clamp(2.45rem,7vw,6.4rem)] leading-[0.95] font-black text-white whitespace-nowrap lg:whitespace-nowrap">
            אז מה הסיפור?
          </h2>
          <p className="story-copy text-[clamp(1.2rem,5.2vw,2.5rem)] leading-[1.28]" style={{ color: "#d6d0c5" }}>
            <strong className="mb-1 block font-bold text-white">זה לא רק המותג. זו האיכות שמאחוריו.</strong>
            <span className="block">בחרנו עדשה איכותית, שילבנו מסגרת עמידה</span>
            <span className="block">והבאנו את הכול ישירות אליך.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
