"use client";

import * as React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  Settings,
  LogOut,
  QrCode,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "@/lib/i18n/context";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useLanguage();

  const navMain = [
    {
      title: t("common.overview", "Overview"),
      items: [
        {
          title: t("common.dashboard", "Dashboard"),
          url: "/admin/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: t("common.menuManagement", "Menu Management"),
      items: [
        {
          title: t("common.products", "Products"),
          url: "/admin/products",
          icon: UtensilsCrossed,
        },
        {
          title: t("common.categoriesAndOptions", "Categories & Options"),
          url: "/admin/categories",
          icon: Layers,
        },
      ],
    },
    {
      title: t("common.operations", "Operations"),
      items: [
        {
          title: t("common.settings", "Settings"),
          url: "/admin/settings",
          icon: Settings,
        },
        {
          title: t("common.signOut", "Sign Out"),
          url: "/admin",
          icon: LogOut,
        },
      ],
    },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5 font-bold text-lg font-display tracking-tight">
          <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <QrCode className="h-4 w-4" />
          </div>
          <span>{t("common.adminPanel", "Admin Panel")}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navMain.map((group, groupIdx) => (
          <SidebarGroup key={groupIdx}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton render={<Link href={item.url} />}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-3 border-t border-sidebar-border gap-2">
        <div className="flex items-center justify-between gap-2 w-full">
          <LanguageToggle variant="outline" className="flex-1 justify-start text-xs" />
          <ModeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
