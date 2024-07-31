/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_API_POST_URL: process.env.NEXT_PUBLIC_API_POST_URL,
    NEXT_PUBLIC_API_GET_URL: process.env.NEXT_PUBLIC_API_GET_URL,
  },
};

export default nextConfig;
