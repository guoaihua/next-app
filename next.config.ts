import type { NextConfig } from "next";
import path from 'path';
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // basePath: isDev ? undefined : '/lowcode',
  assetPrefix: isDev ? undefined : 'https://ziming.online/lowcode',
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
  // webpack: (config, { isServer }) => {
  //   if (1) {
  //     // 配置 Monaco 插件
  //     config.plugins.push(
  //       new MonacoWebpackPlugin({
  //         languages: ['javascript', 'typescript', 'json'],
  //         features: ['coreCommands', 'find', 'hover'],
  //         publicPath: isDev ?
  //           '/monaco-assets/' :
  //           '/lowcode/monaco-assets/',
  //         filename: '[name].worker.js'
  //       })
  //     );

  //     // 强制输出到 public 目录
  //     config.plugins.push({
  //       apply: (compiler) => {
  //         compiler.hooks.afterEmit.tap('MonacoPublicCopy', () => {
  //           const fs = require('fs-extra');
  //           const source = path.join(__dirname, '.next/static/chunks/monaco');
  //           const target = path.join(__dirname, 'public/monaco-assets');

  //           fs.removeSync(target);
  //           fs.copySync(source, target, {
  //             filter: (src) => !src.includes('.map')
  //           });
  //         });
  //       }
  //     });
  //   }
  //   return config;
  // },
  // 禁用静态资源优化（避免 Monaco 文件被错误处理）
  images: {
    unoptimized: true
  }
};

export default nextConfig;
