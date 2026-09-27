"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseMultilingualValue, formatMultilingualValue } from '@/lib/i18n/localized-text';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/lib/i18n/types';
import { useLanguage } from '@/lib/i18n/context';

interface MultilingualInputProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function MultilingualInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
}: MultilingualInputProps) {
  const { language: currentAdminLang } = useLanguage();
  const [activeTab, setActiveTab] = useState<SupportedLanguage>('tr');
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const parsed = parseMultilingualValue(value);
    if (Object.keys(parsed).length > 0) {
      setValues(parsed);
    } else if (value) {
      setValues({ tr: value, [currentAdminLang]: value });
    } else {
      setValues({});
    }
  }, [value, currentAdminLang]);

  const handleInputChange = (langCode: SupportedLanguage, text: string) => {
    const newValues = { ...values, [langCode]: text };
    setValues(newValues);
    onChange(formatMultilingualValue(newValues));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <Label htmlFor={id} className="text-sm font-medium">
            {label} {required && <span className="text-destructive">*</span>}
          </Label>
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
            🌐 Multi-Language
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-1 p-1 bg-muted/50 rounded-lg border border-border/50 text-xs">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = activeTab === lang.code;
          const hasValue = !!values[lang.code]?.trim();

          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setActiveTab(lang.code)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-xs font-medium ${
                isActive
                  ? 'bg-background text-foreground shadow-xs border border-border'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.code.toUpperCase()}</span>
              {hasValue && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block ml-0.5" />
              )}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <Input
          id={id ? `${id}-${activeTab}` : undefined}
          type="text"
          value={values[activeTab] || ''}
          onChange={(e) => handleInputChange(activeTab, e.target.value)}
          placeholder={`${placeholder || label || ''} (${
            SUPPORTED_LANGUAGES.find((l) => l.code === activeTab)?.nativeName
          })`}
          required={required && activeTab === 'tr'}
          className="w-full transition-shadow focus-visible:ring-primary"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-muted-foreground font-mono">
          {activeTab.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
