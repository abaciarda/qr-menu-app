"use client";

import { useCart } from "@/app/context/CartContext";
import { useSidebar } from "@/app/context/SidebarContext";
import { MenuIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  const { open } = useSidebar();
  const { openCart, totalItems } = useCart();

  return (
    <nav className="sticky z-10 bg-background top-0 border-b border-line">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-5 py-3">
        <button
          onClick={open}
          aria-label="Open menu"
          className="w-10 h-10 flex items-center justify-center bg-surface rounded-full hoverable-btn"
        >
          <MenuIcon strokeWidth={2} />
        </button>

        <Link href={"/"} className="uppercase font-extrabold text-lg tracking-tight font-display">
          QR Menu
        </Link>

        <button
          onClick={openCart}
          aria-label="Open cart"
          className="relative flex items-center justify-center w-10 h-10 bg-surface rounded-full hoverable-btn"
        >
          <ShoppingCartIcon size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-accent text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}