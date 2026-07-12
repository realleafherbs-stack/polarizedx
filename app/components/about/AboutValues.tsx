import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "400" });

const values: { title: string; text: string; icon?: string; mobileOrder: string }[] = [
  { title: "בלי חנויות ראווה", text: "שיתוף פעולה עם עסקים מקומיים.", icon: "/icn/store.png", mobileOrder: "order-3 sm:order-1" },
  { title: "בלי פרזנטורים", text: "המוצר מדבר לבד.", icon: "/icn/person.png", mobileOrder: "order-2 sm:order-2" },
  { title: "הפצה ישירה", text: "עד הבית תוך 3 ימי עסקים.", icon: "/icn/wdelivery.png", mobileOrder: "order-1 sm:order-3" },
];

export default function AboutValues() {
  return (
    <section className={`${inter.className} w-full bg-neutral-100 py-16`}>
      <div dir="rtl" className="site-container text-center">
        <h2 className="text-4xl font-light text-black lg:text-5xl">הפילוסופיה שלנו</h2>
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className={`flex flex-col items-center gap-4 ${v.mobileOrder}`}>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black">
                {v.icon && (
                  <Image src={v.icon} alt="" width={24} height={24} className="h-12 w-12 object-contain" />
                )}
              </div>
              <p className="text-2xl font-regular text-black">{v.title}</p>
              <p className="text-lg text-zinc-500">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
