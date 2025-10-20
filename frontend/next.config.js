/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Optional: expose API URL to client-side
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Optional: allow remote images if needed later
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
