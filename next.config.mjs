import { i18n } from './next-i18next.config.mjs';

const nextConfig = {
  i18n,
  images: {
    domains: ['res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/',
        locale: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
