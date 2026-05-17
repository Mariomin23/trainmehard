import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.202"],
  async redirects() {
    return [
      { source: '/trainers', destination: '/professionals', permanent: true },
      { source: '/trainers/:id', destination: '/professionals/:id', permanent: true },
      { source: '/dashboard/trainer', destination: '/dashboard/professional', permanent: true },
    ];
  },
};

export default nextConfig;
