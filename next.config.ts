import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

const nextConfig: NextConfig = {
  output: "standalone",
  logging: {
    browserToTerminal: "warn",
  },
  allowedDevOrigins: ["192.168.1.23"],
}

export default withNextIntl(nextConfig)
