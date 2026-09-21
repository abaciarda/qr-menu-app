import * as React from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  Settings,
  LogOut,
  QrCode,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Menu Management",
      items: [
        {
          title: "Products",
          url: "/admin/products",
          icon: UtensilsCrossed,
        },
        {
          title: "Categories & Options",
          url: "/admin/categories",
          icon: Layers,
        },
      ],
    },
    {
      title: "Operations",
      items: [
        {
          title: "Settings",
          url: "/admin/settings",
          icon: Settings,
        },
        {
          title: "Sign Out",
          url: "/admin",
          icon: LogOut,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5 font-bold text-lg font-display tracking-tight">
          <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <QrCode className="h-4 w-4" />
          </div>
          <span>Admin Panel</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton render={<Link href={item.url} />}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
