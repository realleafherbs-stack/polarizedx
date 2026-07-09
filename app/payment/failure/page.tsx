import Link from "next/link";

export default function PaymentFailurePage() {
  return (
    <main dir="rtl" className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <h1 className="text-3xl font-bold text-black">התשלום לא הושלם</h1>
      <p className="text-zinc-600">לא חויבת. אפשר לנסות שוב או לפנות אלינו אם הבעיה חוזרת.</p>
      <div className="mt-4 flex gap-3">
        <Link href="/checkout" className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white">
          נסה שוב
        </Link>
        <Link href="/contact" className="rounded-md border border-black px-6 py-3 text-sm font-semibold text-black">
          צור קשר
        </Link>
      </div>
    </main>
  );
}
