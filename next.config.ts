import type { NextConfig } from "next";
import path from "path";
const CopyPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  assetPrefix: isDev ? undefined : "https://ziming.online/lowcode",
  reactStrictMode: false,
};

export default nextConfig;
