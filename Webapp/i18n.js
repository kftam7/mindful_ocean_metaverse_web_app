import { useRouter } from 'next/router';
import en from './public/locales/en.json';
import ch from './public/locales/ch.json';
import tw from './public/locales/tw.json';

export const defaultLocale = 'en';
export const locales = ['en', 'ch', 'tw'];
export const languageNames = {
  en: 'English',
  ch: 'Chinese',
  tw: 'Chinese'
};

export function useTranslation() {
  const router = useRouter();
  let locale;

  if (typeof window !== 'undefined') {
    locale = localStorage.getItem('lang') || router.locale || defaultLocale;
  } else {
    locale = router.locale || defaultLocale;
  }

  const messages = {
    en,
    ch,
    tw
  };

  function t(key) {
    if (messages[locale] && messages[locale][key]) {
      return messages[locale][key];
    }
    return messages[defaultLocale][key] || key;
  }

  return { t, locale };
}
