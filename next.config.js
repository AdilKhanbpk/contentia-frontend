/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              connect-src 'self' https://*.hotjar.com https://*.hotjar.io;
              script-src 'self' https://*.hotjar.com;
              frame-src 'self' https://*.hotjar.com;
            `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },

  // Configuration to handle React 18 compatibility issues
  webpack: (config, { dev, isServer }) => {
    // Add a rule to handle React Quill
    config.module.rules.push({
      test: /react-quill/,
      resolve: {
        alias: {
          'react-dom': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        },
      },
    });

    // General React 18 compatibility fixes
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
      };
    }

    return config;
  },
};

module.exports = nextConfig;
