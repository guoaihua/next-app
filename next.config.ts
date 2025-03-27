import type { NextConfig } from "next";
import path from 'path';
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // basePath: isDev ? undefined : '/lowcode',
  assetPrefix: isDev ? undefined : 'https://ziming.online/lowcode'
  // webpack: (config, { isServer }) => {
  //   console.log('isServer', isServer)
  //   // 仅在客户端构建时复制 Monaco 资源
  //   if (!isServer) {
  //     config.plugins.push(
  //       new CopyPlugin({
  //         patterns: [
  //           {
  //             from: 'node_modules/monaco-editor/min/vs',
  //             to: path.join(__dirname, 'public/monaco-editor/vs'),
  //           },
  //         ],
  //       })
  //     );
  //   }
  //   return config;
  // },
};

export default nextConfig;
