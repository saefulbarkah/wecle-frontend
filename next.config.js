/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/login",
        destination: process.env.NEXT_PUBLIC_API_URL + "/auth/login",
      },
      {
        source: "/api/auth/logout",
        destination: process.env.NEXT_PUBLIC_API_URL + "/auth/logout",
      },
      {
        source: "/api/auth/register",
        destination: process.env.NEXT_PUBLIC_API_URL + "/auth/logout",
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
