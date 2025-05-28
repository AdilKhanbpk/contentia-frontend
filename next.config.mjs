const nextConfig = {
    images: {
        domains: ["res.cloudinary.com", "images.pexels.com", "ui-avatars.com"],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/",
                locale: false,
                permanent: false,
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
                            default-src 'self';
                            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.hotjar.com https://*.hotjar.io;
                            style-src 'self' 'unsafe-inline';
                            img-src 'self' data: https: blob:;
                            font-src 'self' data: https:;
                            connect-src 'self' https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com https://*.mixpanel.com https://api-js.mixpanel.com ${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api/v1'};
                            frame-src 'self' https://*.hotjar.com;
                            object-src 'none';
                            base-uri 'self';
                            form-action 'self';
                        `.replace(/\s{2,}/g, ' ').trim(),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   // Generate a unique build ID to prevent caching issues
//   generateBuildId: () => 'build-' + Date.now(),

//   // Add build timestamp as an environment variable
//   env: {
//     NEXT_PUBLIC_BUILD_TIMESTAMP: Date.now().toString(),
//   },

//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//     ],
//   },

//   async redirects() {
//     return [
//       {
//         source: '/sipareslerim',
//         destination: '/siparislerim',
//         permanent: true,
//       },
//     ];
//   },

//   async headers() {
//     return [
     
//       {
//                 source: '/:path*',
//                 headers: [
//                     {
//                         key: 'Content-Security-Policy',
//                         value: [
//                             "default-src 'self'",
//                             "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.hotjar.com https://*.hotjar.io",
//                             "style-src 'self' 'unsafe-inline'",
//                             "img-src 'self' data: https: blob:",
//                             "font-src 'self' data: https:",
//                             `connect-src 'self' https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com https://*.mixpanel.com https://api-js.mixpanel.com ${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api/v1'} ${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:8000'}`,
//                             "frame-src 'self' https://*.hotjar.com",
//                             "object-src 'none'",
//                             "base-uri 'self'",
//                             "form-action 'self'"
//                         ].join('; '),
//                     },
//                 ],
//             },
//     ];
//   },

//   // Configuration to handle React 18 compatibility issues
//   webpack: (config, { dev, isServer }) => {
//     // Add a rule to handle React Quill
//     config.module.rules.push({
//       test: /react-quill/,
//       resolve: {
//         alias: {
//           'react-dom': 'react-dom/profiling',
//           'scheduler/tracing': 'scheduler/tracing-profiling',
//         },
//       },
//     });

//     // General React 18 compatibility fixes
//     if (!dev && !isServer) {
//       config.resolve.alias = {
//         ...config.resolve.alias,
//         'react-dom$': 'react-dom/profiling',
//         'scheduler/tracing': 'scheduler/tracing-profiling',
//       };
//     }

//     return config;
//   },
// };

// module.exports = nextConfig;




 // {
      //   source: '/:path*',
      //   headers: [
      //     {
      //       key: 'Content-Security-Policy',
      //       value: `
      //         default-src 'self';
      //         script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.hotjar.com https://*.hotjar.io;
      //         style-src 'self' 'unsafe-inline';
      //         img-src 'self' data: https: blob:;
      //         font-src 'self' data: https:;
      //         connect-src 'self' https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com ${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'};
      //         frame-src 'self' https://*.hotjar.com;
      //         object-src 'none';
      //         base-uri 'self';
      //         form-action 'self';
      //       `.replace(/\s{2,}/g, ' ').trim(),
      //     },
      //   ],
      // },

//       /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   // Generate a unique build ID to prevent caching issues
//   generateBuildId: () => 'build-' + Date.now(),

//   // Add build timestamp as an environment variable
//   env: {
//     NEXT_PUBLIC_BUILD_TIMESTAMP: Date.now().toString(),
//   },

//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//     ],
//   },

//   async redirects() {
//     return [
//       {
//         source: '/sipareslerim',
//         destination: '/siparislerim',
//         permanent: true,
//       },
//     ];
//   },

//   async headers() {
//     return [
//       {
//         source: '/:path*',
//         headers: [
//           {
//             key: 'Content-Security-Policy',
//             value: `
//               default-src 'self';
//               script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.hotjar.com https://*.hotjar.io;
//               style-src 'self' 'unsafe-inline';
//               img-src 'self' data: https: blob:;
//               font-src 'self' data: https:;
//               connect-src 'self' https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com ${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'};
//               frame-src 'self' https://*.hotjar.com;
//               object-src 'none';
//               base-uri 'self';
//               form-action 'self';
//             `.replace(/\s{2,}/g, ' ').trim(),
//           },
//         ],
//       },
//     ];
//   },

//   // Configuration to handle React 18 compatibility issues
//   webpack: (config, { dev, isServer }) => {
//     // Add a rule to handle React Quill
//     config.module.rules.push({
//       test: /react-quill/,
//       resolve: {
//         alias: {
//           'react-dom': 'react-dom/profiling',
//           'scheduler/tracing': 'scheduler/tracing-profiling',
//         },
//       },
//     });

//     // General React 18 compatibility fixes
//     if (!dev && !isServer) {
//       config.resolve.alias = {
//         ...config.resolve.alias,
//         'react-dom$': 'react-dom/profiling',
//         'scheduler/tracing': 'scheduler/tracing-profiling',
//       };
//     }

//     return config;
//   },
// };

// module.exports = nextConfig;
