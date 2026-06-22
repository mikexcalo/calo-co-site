import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/calo-co-homepage.html" }],
    };
  },
};

export default nextConfig;
