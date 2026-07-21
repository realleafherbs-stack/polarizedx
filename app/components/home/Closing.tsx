import Image from "next/image";
import Link from "next/link";

export default function Closing() {
  return (
    <section
      className="relative flex w-full items-center justify-center border-t px-6 py-16 text-center lg:min-h-130 lg:py-0"
      style={{ borderColor: "rgba(197,164,58,.22)" }}
    >
      <Image
        src="/images/campaign/campaign-hero-v1.png"
        alt=""
        fill
        quality={100}
        className="object-cover object-[center_42%] select-none pointer-events-none"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(8,8,8,.35),rgba(8,8,8,.78))" }} />

      <div
        dir="rtl"
        className="relative z-10 flex w-full max-w-125 flex-col items-center gap-4 px-6 py-8 sm:gap-5 sm:py-10"
        style={{ background: "linear-gradient(110deg,rgba(17,17,15,.9),rgba(17,17,15,.72))" }}
      >
        <Image src="/logo/logo2w.png" alt="POLARIZED-X" width={320} height={25} className="h-6 w-auto sm:h-7" />
        <p className="text-2xl font-normal sm:text-4xl" style={{ color: "#e5e0d7" }}>
          קלאסיקה אמיתית שהולכת איתך.
        </p>
        <Link
          href="/shop"
          className="bg-gold inline-flex min-h-12 items-center gap-2 px-8 text-lg font-black text-black transition-transform hover:-translate-y-0.5"
        >
          <span>לצפייה בקולקציה</span>
          <span aria-hidden>←</span>
        </Link>
      </div>
    </section>
  );
}
