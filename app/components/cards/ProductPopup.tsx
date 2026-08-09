"use client";

import Image from "next/image";
import { XIcon, MinusIcon, PlusIcon, HeartIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useFavorites } from "@/app/context/FavoritesContext";
import { OptionGroup, RecommendedItem } from "@/app/data/categoryOptions";

const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY3Ii8+PC9zdmc+";

type ProductPopupProps = {
  name: string;
  description: string;
  price: number;
  image: string;
  optionGroups: OptionGroup[];
  recommended: RecommendedItem[];
  open: boolean;
  onClose: () => void;
};

function OptionPicker({
  label,
  required,
  options,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="bg-surface rounded-xl px-4 py-3 flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <span className="text-sm text-ink font-medium">{label}</span>
        {required && (
          <span className="text-[10px] font-mono text-accent">REQUIRED</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
              value === opt
                ? "bg-ink text-background border-ink"
                : "bg-background text-ink border-line hoverable-btn"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProductPopup({ name, description, price, image, optionGroups, recommended, open, onClose }: ProductPopupProps) {
  const [qty, setQty] = useState(1);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const { addItem, openCart } = useCart();
  const { toggle, isFavorite } = useFavorites();

  const favorited = isFavorite(name);

  useEffect(() => {
    if (open) { setSelections({}); setQty(1); }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const selectedOptions = Object.values(selections).filter(Boolean).join(", ") || null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 flex items-end justify-center font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="w-full max-w-md max-h-[87vh] bg-background rounded-t-2xl overflow-hidden flex flex-col relative"
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
                onClose();
              }
            }}
          >
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 w-12 h-1.5 rounded-full bg-white/60 backdrop-blur-md shadow-sm pointer-events-none" />

            <div className="h-64 relative shrink-0 bg-surface">
              <Image
                src={image}
                alt={name}
                fill
                priority
                sizes="448px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/20 rounded-full"
              >
                <XIcon size={18} className="text-white" />
              </button>

              <button
                onClick={() => toggle({ name, description, price, image, optionGroups, recommended })}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/20 rounded-full transition-colors"
              >
                <HeartIcon
                  size={18}
                  className={favorited ? "text-accent fill-accent" : "text-white"}
                />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="px-5 pt-5 pb-6">
                <div className="w-10 h-1 rounded-full bg-line mx-auto mb-5" />

                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display font-bold text-2xl text-ink">{name}</h2>
                  <span className="font-mono text-ink font-semibold text-lg shrink-0">
                    ${(price * qty).toFixed(2)}
                  </span>
                </div>

                <p className="text-ink-muted text-sm mt-2 leading-relaxed">{description}</p>

                {optionGroups.length > 0 && (
                  <div className="flex flex-col gap-2 mt-5">
                    {optionGroups.map((group) => (
                      <OptionPicker
                        key={group.label}
                        label={group.label}
                        required={group.required}
                        options={group.options}
                        value={selections[group.label] ?? null}
                        onChange={(v) => setSelections((prev) => ({ ...prev, [group.label]: v }))}
                      />
                    ))}
                  </div>
                )}

                {recommended.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-display font-semibold text-base text-ink mb-3">Goes well with</h3>
                    <div className="story-track flex gap-3 overflow-x-auto pb-1">
                      {recommended.map((item) => (
                        <div key={item.name} className="shrink-0 w-32 bg-surface rounded-xl overflow-hidden">
                          <div className="h-20 relative">
                            <Image src={item.image} alt={item.name} fill sizes="128px" className="object-cover" />
                          </div>
                          <div className="px-2.5 py-2">
                            <p className="text-xs text-ink font-medium truncate">{item.name}</p>
                            <p className="text-xs font-mono text-ink-muted mt-0.5">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 border-t border-line px-5 py-4 flex items-center gap-3 bg-background">
              <div className="flex items-center gap-3 bg-surface rounded-full px-3 py-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="text-ink hoverable-btn rounded-full"
                >
                  <MinusIcon size={16} />
                </button>
                <span className="font-mono text-sm text-ink w-4 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="text-ink hoverable-btn rounded-full"
                >
                  <PlusIcon size={16} />
                </button>
              </div>

              <button
                onClick={() => {
                  addItem({ name, price, image, qty, options: selectedOptions });
                  onClose();
                  openCart();
                }}
                className="flex-1 bg-accent text-white font-medium rounded-full py-3"
              >
                Add to order — ${(price * qty).toFixed(2)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}