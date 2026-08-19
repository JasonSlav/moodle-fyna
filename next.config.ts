import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.DEV_ORIGIN ?? "192.168.0.163"],
};

export default nextConfig;
