import type { NextConfig } from "next";

// Multizone: este MFE serve tudo sob /auth (páginas e assets _next).
// O host (shell) faz rewrite de /auth/:path* para cá.
const nextConfig: NextConfig = {
  basePath: "/auth",
};

export default nextConfig;
