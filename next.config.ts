import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
