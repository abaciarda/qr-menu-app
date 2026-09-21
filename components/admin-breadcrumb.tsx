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
import React from "react";

const ROUTE_LABELS: Record<string, string> = {
  admin: "Admin Panel",
  dashboard: "Dashboard",
  products: "Products",
  new: "Add Product",
  edit: "Edit Product",
  categories: "Categories & Options",
  settings: "Settings",
};

export function AdminBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const items: { label: string; href: string; isLast: boolean }[] = [];

  let accumulatedHref = "";
  segments.forEach((segment, index) => {
    accumulatedHref += `/${segment}`;

    if (segment === "admin") {
      if (segments.length > 1) {
        items.push({
          label: ROUTE_LABELS["admin"],
          href: "/admin/dashboard",
          isLast: false,
        });
        return;
      }
    }

    if (!isNaN(Number(segment))) {
      return;
    }

    const label = ROUTE_LABELS[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
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
