/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // Disable features incompatible with static export
  experimental: {
    optimizePackageImports: ['lenis'],
  },
};

export default nextConfig;
