"use client";

import { useCart } from "@/app/context/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function CartSheet() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, totalPrice } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 flex items-end justify-center font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeCart();
          }}
        >
          <motion.div
            className="w-full max-w-md max-h-[92vh] bg-background rounded-t-2xl overflow-hidden flex flex-col relative"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            dragSnapToOrigin
            onDragEnd={(_, info) => {
              if (info.offset.y > 90 || info.velocity.y > 350) {
                closeCart();
              }
            }}
          >
            <div className="w-12 h-1.5 rounded-full bg-line mx-auto mt-2.5 mb-1 shrink-0 pointer-events-none" />

            <div className="flex items-center justify-between px-5 py-3 border-b border-line shrink-0">
              <div>
                <h2 className="font-display font-bold text-xl text-ink">Your Order</h2>
                <p className="text-xs text-ink-muted font-mono mt-0.5">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center bg-surface rounded-full hoverable-btn"
              >
                <XIcon size={18} className="text-ink" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-ink-muted pb-10">
                <ShoppingBagIcon size={40} strokeWidth={1.5} />
                <p className="text-sm font-medium">Your cart is empty</p>
                <p className="text-xs text-ink-muted">Tap any item to add it to your list</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-surface rounded-2xl p-3">
                      <div className="size-16 relative rounded-xl overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-display font-semibold text-sm text-ink truncate">{item.name}</p>
                        {item.options && (
                          <p className="text-xs text-ink-muted mt-0.5">{item.options}</p>
                        )}
                        <p className="font-mono text-sm text-ink font-semibold mt-1">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-ink-muted hoverable-btn rounded-full p-1"
                        >
                          <Trash2Icon size={14} />
                        </button>
                        <div className="flex items-center gap-2 bg-background rounded-full px-2.5 py-1">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="text-ink hoverable-btn rounded-full"
                          >
                            <MinusIcon size={14} />
                          </button>
                          <span className="font-mono text-sm text-ink w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="text-ink hoverable-btn rounded-full"
                          >
                            <PlusIcon size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-4 border-t border-line shrink-0 flex items-center justify-between">
                  <span className="text-sm text-ink-muted font-medium">Total</span>
                  <span className="font-mono font-bold text-xl text-ink">${totalPrice.toFixed(2)}</span>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
