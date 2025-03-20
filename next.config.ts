import type { NextConfig } from "next";


const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  assetPrefix: isDev ? undefined : 'https://cdn.mydomain.com'
};

export default nextConfig;
