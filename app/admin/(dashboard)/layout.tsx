import { AppSidebar } from "@/components/app-sidebar";
import { AdminBreadcrumb } from "@/components/admin-breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageToggle } from "@/components/language-toggle";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="min-w-0 overflow-x-hidden">
          <header className="flex h-16 shrink-0 items-center justify-between border-b px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <AdminBreadcrumb />
            </div>
            <div className="flex items-center gap-3">
              <LanguageToggle variant="ghost" className="h-9 px-3.5" />
            </div>
          </header>
          <div className="flex flex-1 flex-col p-4 md:p-6 w-full space-y-6 mx-auto min-w-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
