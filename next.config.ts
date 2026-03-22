import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

const nextConfig: NextConfig = {
  output: "standalone",
  logging: {
    browserToTerminal: "warn",
  },
  allowedDevOrigins: ["192.168.1.23"],
  async rewrites() {
    const apiBase = process.env.API_BASE_URL || "http://localhost:8000/api"
    return [
      {
        source: "/api/:path*",
        destination: `${apiBase}/:path*`,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
