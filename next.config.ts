import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "googleusercontent.com",
        port: "",
        pathname: "/image_generation_content/**",
      },
    ],
  },
};

export default nextConfig;
