/** @type {import('next').NextConfig} */
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const nextConfig = {
  env: {
    HOST: process.env.HOST,
  },
};

export default nextConfig;
