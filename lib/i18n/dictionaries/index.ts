import { SupportedLanguage, Dictionary } from '../types';
import { tr } from './tr';
import { en } from './en';
import { de } from './de';

export const dictionaries: Record<SupportedLanguage, Dictionary> = {
  tr,
  en,
  de,
};

export { tr, en, de };
