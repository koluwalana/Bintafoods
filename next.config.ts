import type { NextConfig } from "next";

// Security headers applied to every response. These are low-risk hardening
// measures that don't affect how the app loads its own scripts/styles/fonts:
// - nosniff stops MIME-type sniffing attacks
// - SAMEORIGIN + frame-ancestors block clickjacking (embedding in iframes)
// - HSTS forces HTTPS
// - Referrer-Policy limits how much URL info leaks to other sites
// - Permissions-Policy disables camera/mic/geolocation APIs the site never uses
// - base-uri / form-action 'self' limit injection-based redirection
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
