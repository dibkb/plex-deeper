import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@mastra/*", "bee-queue"],
  output: "standalone",
};

export default nextConfig;
