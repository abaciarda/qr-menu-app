"use client";

import { useEffect, useState } from "react";
import { Check, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TR, GB, DE } from "country-flag-icons/react/3x2";

const FLAG_COMPONENTS = {
  TR,
  GB,
  DE,
};

interface LanguageToggleProps {
  variant?: "outline" | "ghost" | "default";
  showLabel?: boolean;
  className?: string;
}

export function LanguageToggle({ variant = "outline", showLabel = true, className }: LanguageToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, languages } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLang = languages.find((l) => l.code === language) || languages[0];
  const CurrentFlag = FLAG_COMPONENTS[currentLang.countryCode];

  const buttonClasses = showLabel
    ? `gap-2 px-3 ${className || ""}`
    : `relative !w-10 !h-10 !p-0 rounded-full overflow-hidden shrink-0 ${className || ""}`;

  if (!mounted) {
    return (
      <Button variant={variant} size={showLabel ? "default" : "icon"} className={buttonClasses}>
        <Globe className="size-4" />
        {showLabel && <span>{currentLang.nativeName}</span>}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant={variant} size={showLabel ? "default" : "icon"} className={buttonClasses}>
            {showLabel ? (
              <>
                <CurrentFlag preserveAspectRatio="xMidYMid slice" className="w-5 h-3.5 rounded-xs object-cover shadow-2xs" />
                <span className="font-medium text-xs md:text-sm">{currentLang.nativeName}</span>
              </>
            ) : (
              <span className="absolute inset-0 rounded-full overflow-hidden">
                <CurrentFlag
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 size-full w-full h-full object-cover"
                />
              </span>
            )}
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-44 p-1 bg-ui-surface text-ui-ink border-ui-line shadow-lg">
        {languages.map((lang) => {
          const isSelected = language === lang.code;
          const FlagComp = FLAG_COMPONENTS[lang.countryCode];
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="justify-between cursor-pointer py-2 px-2.5 rounded-md text-sm text-ui-ink hover:bg-ui-surface-hover focus:bg-ui-surface-hover focus:text-ui-ink"
            >
              <span className="flex items-center gap-2.5">
                <FlagComp preserveAspectRatio="xMidYMid slice" className="w-5 h-3.5 rounded-xs object-cover shadow-2xs" />
                <span className="font-medium">{lang.nativeName}</span>
              </span>

              {isSelected && <Check className="size-4 text-ui-accent" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
