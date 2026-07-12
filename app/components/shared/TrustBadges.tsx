import Image from "next/image";

function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
      <path d="m8.5 12 2.5 2.5 4.5-4.5" />
    </svg>
  );
}

const trustBadges = [
  { label: "שירות לקוחות", sub: "זמינות ומענה מקצועי", icon: "/icn/wheadshot.png" },
  { label: "משלוח מהיר", sub: "עד 3 ימי עסקים", icon: "/icn/wdelivery.png" },
  { label: "אחריות מלאה", sub: "החלפה ורכישה מאובטחת" },
];

export default function TrustBadges() {
  return (
    <div dir="rtl" className="py-14 px-4 bg-black">
      <p className="mb-22 text-center text-2xl font-semibold tracking-wide text-white">B2B MARKET LTD</p>
      <div className="grid grid-cols-1 justify-center items-center text-center gap-8 sm:grid-cols-3 sm:gap-6 lg:flex lg:flex-row lg:gap-52!">
        {trustBadges.map((badge) => (
          <div key={badge.label} className="flex flex-col items-center gap-2">
            {badge.icon ? (
              <Image src={badge.icon} alt={badge.label} width={62} height={62} className="w-12 h-12 sm:w-16 sm:h-16" />
            ) : (
              <span className="h-12 w-12 sm:h-16 sm:w-16">
                <ShieldCheckIcon />
              </span>
            )}
            <span className="whitespace-nowrap text-lg sm:text-2xl font-semibold text-white sm:whitespace-normal lg:whitespace-nowrap">{badge.label}</span>
            <span className="whitespace-nowrap text-base sm:text-xl font-light text-white sm:whitespace-normal lg:whitespace-nowrap">{badge.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
