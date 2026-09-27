"use client";

import { useState } from "react";
import CategoryCard from "@/app/components/cards/CategoryCard";
import SearchInput from "@/app/components/inputs/SearchInput";
import { useLanguage } from "@/lib/i18n/context";
import { SlideCategory } from "@/types/category";

interface HomeCategoriesViewProps {
  categories: SlideCategory[];
}

export default function HomeCategoriesView({ categories }: HomeCategoriesViewProps) {
  const { t, getLocalized } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((cat) => {
    const localizedName = getLocalized(cat.name);
    return localizedName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <section className="flex flex-col gap-5 px-5 py-4 max-w-7xl mx-auto w-full">
      <SearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <h1 className="text-xl font-semibold -mb-2">
        {t("customer.categories", "Categories")}
      </h1>

      {filteredCategories.length === 0 ? (
        <div className="py-12 text-center text-ui-ink-muted">
          <p className="font-medium text-base">{t("customer.noResults", "No Items Found")}</p>
          <p className="text-xs mt-1">{t("customer.noResultsDesc", "Try searching with a different keyword.")}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      )}
    </section>
  );
}
