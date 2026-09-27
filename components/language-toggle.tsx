"use client";

import * as React from "react";
import { Check, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageToggleProps {
  variant?: "outline" | "ghost" | "default";
  showLabel?: boolean;
  className?: string;
}

export function LanguageToggle({ variant = "outline", showLabel = true, className }: LanguageToggleProps) {
  const [mounted, setMounted] = React.useState(false);
  const { language, setLanguage, languages } = useLanguage();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  if (!mounted) {
    return (
      <Button variant={variant} className={`gap-2 px-3 ${className}`}>
        <Globe className="size-4" />
        {showLabel && <span>{currentLang.nativeName}</span>}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant={variant} className={`gap-2 px-3 ${className}`}>
            <span className="text-base leading-none">{currentLang.flag}</span>
            {showLabel ? (
              <span className="font-medium text-xs md:text-sm">{currentLang.nativeName}</span>
            ) : (
              <span className="uppercase text-xs font-bold">{currentLang.code}</span>
            )}
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-44 p-1">
        {languages.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="justify-between cursor-pointer py-2 px-2.5 rounded-md text-sm"
            >
              <span className="flex items-center gap-2.5">
                <span className="text-lg leading-none">{lang.flag}</span>
                <span className="font-medium">{lang.nativeName}</span>
              </span>

              {isSelected && <Check className="size-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
