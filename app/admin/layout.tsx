import { Toaster } from "sonner";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {children}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
