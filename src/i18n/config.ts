import { Locale, TranslationKeys } from '@/types';
import tr from './tr.json';
import en from './en.json';

const translations: Record<Locale, TranslationKeys> = { tr, en };

export const defaultLocale: Locale = 'tr';
export const locales: Locale[] = ['tr', 'en'];

export function t(key: string, locale: Locale = defaultLocale): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to Turkish
      value = translations['tr'];
      for (const fk of keys) {
        if (value && typeof value === 'object' && fk in value) {
          value = value[fk];
        } else {
          return key;
        }
      }
      return typeof value === 'string' ? value : key;
    }
  }

  return typeof value === 'string' ? value : key;
}
