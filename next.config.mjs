import { i18n } from './next-i18next.config.mjs';
const nextConfig = {
  i18n,
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