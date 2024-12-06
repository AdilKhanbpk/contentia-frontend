import { i18n } from './next-i18next.config.mjs';

const nextConfig = {
  i18n,
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary domain for external images
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/',
        locale: false,
        permanent: false,
      },
      // ... other redirects ...
    ];
  },
};

export default nextConfig;
