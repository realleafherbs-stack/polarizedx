import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      { protocol: "https", hostname: "ducks.co.il" },
      { protocol: "https", hostname: "**.ducks.co.il" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "app.payper.co.il" },
    ],
  },
};

export default nextConfig;
