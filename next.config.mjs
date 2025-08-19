/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors 'self' https://whop.com https://*.whop.com" },
          { key: "X-Frame-Options", value: "" },
        ],
      },
    ];
  },
};
export default nextConfig;
