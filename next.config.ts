import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return[
      {
        source: '/puzzles/:path*',
        destination: 'https://parsi-connections-api.onrender.com/puzzles/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/puzzles/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
        ],
      },
    ];
  },

};

export default nextConfig;
