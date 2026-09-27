"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, LanguageOption, SUPPORTED_LANGUAGES, Dictionary } from './types';
import { dictionaries } from './dictionaries';
import { getLocalizedText } from './localized-text';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  dict: Dictionary;
  t: (keyPath: string, fallback?: string) => string;
  languages: LanguageOption[];
  getLocalized: (value: string | Record<string, string> | null | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'qr_menu_admin_lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('tr');

  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY) as SupportedLanguage;
    if (saved && dictionaries[saved]) {
      setLanguageState(saved);
      document.cookie = `NEXT_LOCALE=${saved}; path=/; max-age=31536000`;
    } else {
      const browserLang = navigator.language.slice(0, 2) as SupportedLanguage;
      if (dictionaries[browserLang]) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    if (!dictionaries[lang]) return;
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
  };

  const dict = dictionaries[language] || dictionaries.tr;

  const t = (keyPath: string, fallback?: string): string => {
    const keys = keyPath.split('.');
    let current: any = dict;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback || keyPath;
      }
    }
    return typeof current === 'string' ? current : fallback || keyPath;
  };

  const getLocalized = (value: string | Record<string, string> | null | undefined) => {
    return getLocalizedText(value, language);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        dict,
        t,
        languages: SUPPORTED_LANGUAGES,
        getLocalized,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
