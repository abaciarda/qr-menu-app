"use client";

import { useLanguage } from "@/lib/i18n/context";

interface CategoryHeaderProps {
  title: string;
  count: number;
  unit?: string;
}

export default function CategoryHeader({ title, count, unit }: CategoryHeaderProps) {
  const { t, getLocalized } = useLanguage();
  const localizedTitle = getLocalized(title);
  const displayUnit = unit || t("common.products", "Products");

  return (
    <div className="flex items-center justify-between">
      <h1 className="font-display font-bold text-xl text-ui-ink">{localizedTitle}</h1>
      <p className="text-sm text-ui-ink-muted">
        {count} {displayUnit}
      </p>
    </div>
  );
}
