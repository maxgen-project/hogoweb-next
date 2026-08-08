/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apidata.hogoautofilms.co.in",
        pathname: "/**",
      },
    ],
  },
  // Allow all external images (used in gallery/products via full URLs)
};

export default nextConfig;
