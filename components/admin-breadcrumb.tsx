"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLanguage } from "@/lib/i18n/context";
import React from "react";

export function AdminBreadcrumb() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const routeLabels: Record<string, string> = {
    admin: t("common.adminPanel", "Admin Panel"),
    dashboard: t("common.dashboard", "Dashboard"),
    products: t("common.products", "Products"),
    new: t("products.addProduct", "Add Product"),
    edit: t("products.editProduct", "Edit Product"),
    categories: t("common.categoriesAndOptions", "Categories & Options"),
    settings: t("common.settings", "Settings"),
  };

  const items: { label: string; href: string; isLast: boolean }[] = [];

  let accumulatedHref = "";
  segments.forEach((segment, index) => {
    accumulatedHref += `/${segment}`;

    if (segment === "admin") {
      if (segments.length > 1) {
        items.push({
          label: routeLabels["admin"],
          href: "/admin/dashboard",
          isLast: false,
        });
        return;
      }
    }

    if (!isNaN(Number(segment))) {
      return;
    }

    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === segments.length - 1;

    items.push({
      label,
      href: accumulatedHref,
      isLast,
    });
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const itemKey = `${item.href}-${index}`;
          return (
            <React.Fragment key={itemKey}>
              <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                {item.isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!item.isLast && (
                <BreadcrumbSeparator className={index === 0 ? "hidden md:block" : ""} />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
