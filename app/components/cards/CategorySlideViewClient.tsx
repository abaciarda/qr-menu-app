'use client'
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SlideCategory } from "@/types/category";
import { useLanguage } from "@/lib/i18n/context";

function formatLabel(name: string) {
    const words = name.replace(/&\s+/g, "&\u00A0").split(" ");
    if (words.length === 2) {
        return words.map((word, i) => (
            <span key={i} className="block">{word}</span>
        ));
    }
    return name;
}

const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let lastScroll: number | null = null;

export default function CategorySlideViewClient({ categories }: { categories: SlideCategory[] }) {
    const pathname = usePathname();
    const { getLocalized } = useLanguage();
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const track = trackRef.current;
        const active = track?.querySelector<HTMLElement>('[aria-current="page"]');
        if (!track || !active) return;

        const target = Math.max(
            0,
            active.offsetLeft - (track.clientWidth - active.offsetWidth) / 2
        );

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (lastScroll === null || reduceMotion) {
            track.scrollLeft = target;
            lastScroll = target;
            return;
        }

        const from = lastScroll;
        const distance = target - from;
        track.scrollLeft = from;
        if (Math.abs(distance) < 2) return;

        const duration = 700;
        const startTime = performance.now();
        let raf = requestAnimationFrame(function step(now) {
            const t = Math.min(1, (now - startTime) / duration);
            track.scrollLeft = from + distance * easeInOutCubic(t);
            if (t < 1) raf = requestAnimationFrame(step);
        });

        const stop = () => cancelAnimationFrame(raf);
        track.addEventListener("pointerdown", stop, { passive: true });
        track.addEventListener("wheel", stop, { passive: true });

        return () => {
            cancelAnimationFrame(raf);
            track.removeEventListener("pointerdown", stop);
            track.removeEventListener("wheel", stop);
        };
    }, [pathname]);

    return (
        <div className="sticky top-[65px] z-40 bg-ui-background border-b border-ui-line">
            <div
                ref={trackRef}
                onScroll={(e) => { lastScroll = e.currentTarget.scrollLeft; }}
                className="story-track relative max-w-7xl w-full mx-auto flex items-start gap-3 overflow-x-auto px-4 py-3"
            >
                {categories.map((category) => {
                    const categoryPath = `/${category.slug}`;
                    const isActive = pathname === categoryPath;
                    const localizedName = getLocalized(category.name);

                    return (
                        <Link
                            key={category.slug || category.name}
                            href={categoryPath}
                            aria-current={isActive ? "page" : undefined}
                            className="group flex flex-col items-center gap-2 shrink-0 w-24 cursor-pointer"
                        >
                            <div
                                className={`size-16 rounded-full relative overflow-hidden ring-2 ring-offset-2 ring-offset-ui-background transition-[transform,box-shadow] duration-500 ease-out ${
                                    isActive
                                        ? "ring-ui-ink scale-100"
                                        : "ring-transparent scale-[0.94] group-hover:scale-100"
                                }`}
                            >
                                <Image
                                    src={category.image}
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 64px, (max-width: 1024px) 96px, 128px"
                                    quality={90}
                                    alt=""
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 rounded-full border border-ui-line pointer-events-none" />
                            </div>

                            <span
                                className={`font-display text-[13px] leading-snug text-center min-h-[2.6em] w-full transition-colors duration-500 ${
                                    isActive ? "text-ui-ink font-medium" : "text-ui-ink-muted"
                                }`}
                            >
                                {formatLabel(localizedName)}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}