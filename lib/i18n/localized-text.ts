import { SupportedLanguage, SUPPORTED_LANGUAGES } from './types';

export function parseMultilingualValue(value: string | null | undefined): Record<string, string> {
  if (!value) return {};
  try {
    if (typeof value === 'object' && value !== null) {
      return value as Record<string, string>;
    }
    const trimmed = String(value).trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed;
      }
    }
  } catch (e) {
  }
  return {};
}

export function formatMultilingualValue(values: Record<string, string>): string {
  const cleanObj: Record<string, string> = {};
  let hasEntries = false;

  for (const lang of SUPPORTED_LANGUAGES) {
    const val = values[lang.code]?.trim();
    if (val) {
      cleanObj[lang.code] = val;
      hasEntries = true;
    }
  }

  if (!hasEntries) return '';
  return JSON.stringify(cleanObj);
}

export function getLocalizedText(
  value: string | Record<string, string> | null | undefined,
  currentLang: string,
  defaultLang: SupportedLanguage = 'tr'
): string {
  if (!value) return '';

  if (typeof value === 'object' && value !== null) {
    return value[currentLang] || value[defaultLang] || Object.values(value)[0] || '';
  }

  const strValue = String(value);
  const parsedObj = parseMultilingualValue(strValue);

  if (Object.keys(parsedObj).length > 0) {
    return (
      parsedObj[currentLang] ||
      parsedObj[defaultLang] ||
      parsedObj['en'] ||
      parsedObj['tr'] ||
      Object.values(parsedObj)[0] ||
      ''
    );
  }

  return strValue;
}
