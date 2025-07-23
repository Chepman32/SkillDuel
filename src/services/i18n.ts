import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
const en = require('../locales/en.json');
const de = require('../locales/de.json');
const ru = require('../locales/ru.json');
const zh = require('../locales/zh.json');

// Get device language - fallback to English for now
const languageTag = 'en'; // We'll use English as default for now

const resources = {
  en: { translation: en },
  de: { translation: de },
  ru: { translation: ru },
  zh: { translation: zh },
};

// Initialize i18n synchronously
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: languageTag,
    fallbackLng: 'en',
    debug: __DEV__,
    compatibilityJSON: 'v3', // Add this for React Native compatibility
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Debug logging
if (__DEV__) {
  console.log('i18n initialized with language:', languageTag);
  console.log('Available languages:', Object.keys(resources));
  console.log('Sample translation test:', i18n.t('auth.subtitle'));
}

export default i18n; 