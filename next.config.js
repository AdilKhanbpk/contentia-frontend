/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // Generate a unique build ID to prevent caching issues
  generateBuildId: () => 'build-' + Date.now(),
  // Add build timestamp as an environment variable
  env: {
    NEXT_PUBLIC_BUILD_TIMESTAMP: Date.now().toString(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/sipareslerim',
        destination: '/siparislerim',
        permanent: true,
      },
    ]
  },
  // // Add this webpack configuration to fix redux-persist issues
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     // Don't resolve 'fs' module on the client to prevent errors
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //       net: false,
  //       tls: false,
  //     };
  //   }
  //   return config;
  // },
}

module.exports = nextConfig