import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      { protocol: "https", hostname: "ducks.co.il" },
      { protocol: "https", hostname: "**.ducks.co.il" },
      { protocol: "https", hostname: "app.payper.co.il" },
      // Dev-only: lets next/image load CRM-hosted images while CRM_URL points at
      // the local CRM dev server. Scoped to that exact port to avoid the image
      // optimizer proxying arbitrary localhost ports/services.
      ...(process.env.NODE_ENV !== "production"
        ? [{ protocol: "http" as const, hostname: "localhost", port: "3000" }]
        : []),
    ],
  },
};

export default nextConfig;
