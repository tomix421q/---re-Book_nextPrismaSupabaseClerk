import { hostname } from 'os'

/** @type {import('next').NextConfig} */
const nextConfig = {
  //   output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'mzfnhxikpbvbtqukwweu.supabase.co',
      },
    ],
  },
}

export default nextConfig
