import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  env: {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_POSTS_DB_ID: process.env.NOTION_POSTS_DB_ID,
  },
};

export default nextConfig;
