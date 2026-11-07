import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the user's home folder otherwise makes Next
  // guess the wrong workspace root.
  turbopack: { root: __dirname },
  async redirects() {
    // Paths from the old Wix site (southslopeeatery486.com). /menu and
    // /contact already match the new routes.
    return [
      { source: "/our-menu", destination: "/menu", permanent: true },
      { source: "/online-ordering-1", destination: "/contact#order", permanent: true },
    ];
  },
};

export default nextConfig;
