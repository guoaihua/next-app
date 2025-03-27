import type { NextConfig } from "next";


const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  basePath: '/lowcode',
  // assetPrefix: isDev ? undefined : 'https://ziming.online/lowcode'
};

export default nextConfig;
