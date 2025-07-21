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
  // Cloudflare Pages configuration
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Enable experimental features
  experimental: {
    optimizePackageImports: ['framer-motion', '@sanity/client'],
  },
  // Cloudflare Pages compatibility
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
