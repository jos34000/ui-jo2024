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
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:8000/api/:path*",
      },
    ]
  },
}

export default withNextIntl(nextConfig)
