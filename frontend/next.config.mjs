/** @type {import('next').NextConfig} */
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const nextConfig = {
  images:{
    domains:["res.cloudinary.com"]
  },
  env: {
    HOST: process.env.HOST,
  },
};

export default nextConfig;
