/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Allow this site to be embedded specifically by Whop
          { key: "Content-Security-Policy", value: "frame-ancestors https://whop.com https://*.whop.com 'self'" },
          // Make sure no blocking X-Frame-Options value is sent
          { key: "X-Frame-Options", value: "" },
        ],
      },
    ];
  },
};

export default nextConfig;
