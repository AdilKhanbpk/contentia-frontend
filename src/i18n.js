import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../public/locales/en/translation.json';
import translationTR from '../public/locales/tr/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      tr: {
        translation: translationTR,
      },
    },
    lng: 'tr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  }, (err, t) => {
    if (err) {
      console.error('i18n initialization error:', err);
    } else {
      console.log('');
    }
  });

export default i18n;
