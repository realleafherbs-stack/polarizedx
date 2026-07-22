import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ Order?: string }>;
}) {
  const { Order: orderId = "" } = await searchParams;

  // Confirm the order server-side so it always fires, regardless of client JS.
  // Hyp Pay only redirects the browser here — there is no server-to-server
  // callback — so this is the reliable point to mark the order paid + invoice.
  if (orderId) {
    try {
      await fetch(
        `${process.env.CRM_URL}/api/${process.env.CRM_SITE_SLUG}/orders/${orderId}/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.CRM_API_KEY!,
          },
          cache: "no-store",
        }
      );
    } catch {
      // Non-fatal — SuccessClient also confirms client-side as a backup.
    }
  }

  return (
    <Suspense>
      <SuccessClient />
    </Suspense>
  );
}
