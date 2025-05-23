import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_POSTS_DB_ID: process.env.NOTION_POSTS_DB_ID,
    NOTION_AUTHORS_DB_ID: process.env.NOTION_AUTHORS_DB_ID,
  },
};

export default nextConfig;
