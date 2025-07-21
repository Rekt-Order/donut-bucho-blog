import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during builds for production deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during builds for production deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  // Standard build for Cloudflare Pages (not static export)
  trailingSlash: true,
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Enable experimental features
  experimental: {
    optimizePackageImports: ['framer-motion', '@sanity/client'],
  },
};

export default nextConfig;
