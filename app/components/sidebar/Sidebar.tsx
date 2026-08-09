"use client";

import { useSidebar } from "@/app/context/SidebarContext";
import { AnimatePresence, motion } from "framer-motion";
import { HeartIcon, HomeIcon, MapPinIcon, PhoneIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Homepage", href: "/", icon: HomeIcon },
  { label: "Favorites", href: "/favorites", icon: HeartIcon },
];

const contactItems = [
  {
    label: "Call Us",
    href: "tel:+901234567890",
    external: false,
    icon: <PhoneIcon size={20} strokeWidth={2} className="text-ink-muted" />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/901234567890",
    external: true,
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Get Directions",
    href: "https://maps.google.com",
    external: true,
    icon: <MapPinIcon size={20} strokeWidth={2} className="text-ink-muted" />,
  },
];

const drawerVariants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { type: "tween", duration: 0.28, ease: "easeOut" } as const,
  },
  exit: {
    x: "-100%",
    transition: { type: "tween", duration: 0.2, ease: "easeIn" } as const,
  },
};

export default function Sidebar() {
  const { isOpen, close } = useSidebar();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="sidebar-backdrop"
          className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-50 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            className="flex flex-col max-w-72 w-full bg-background h-full shadow-xl px-5 py-4"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={close}
                className="uppercase font-extrabold text-lg tracking-tight font-display text-ink"
              >
                QR Menu
              </Link>

              <button
                onClick={close}
                aria-label="Close menu"
                className="w-10 h-10 flex items-center justify-center bg-surface rounded-full hoverable-btn"
              >
                <XIcon size={18} className="text-ink" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 mt-6">
              {navItems.map(({ label, href, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={close}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors ${
                      active ? "bg-ink text-background" : "text-ink hoverable-btn"
                    }`}
                  >
                    <Icon size={20} strokeWidth={2} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="h-px bg-line my-4" />

            <div className="flex flex-col gap-1">
              <p className="text-xs font-mono text-ink-muted uppercase tracking-widest px-3 mb-1">
                Contact
              </p>

              {contactItems.map(({ label, href, icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-ink font-medium hoverable-btn"
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-line">
              <p className="text-xs text-ink-muted text-center font-mono">QR Menu App 2026</p>
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}