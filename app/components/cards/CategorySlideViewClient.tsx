'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SlideCategory } from "@/types/category";

export default function CategorySlideViewClient({ categories }: { categories: SlideCategory[] }) {
    const pathname = usePathname();

    const formatForUrl = (name: string) => {
        return name.toLowerCase().replace(/\s+/g, "-");
    }
    
    return (
        <div className="sticky top-[65px] z-40 bg-background border-b border-line">
            <div className="story-track max-w-7xl w-full mx-auto flex items-start gap-4 overflow-x-auto px-5 py-3">
                {categories.map((category) => {
                    const categoryPath = `/${formatForUrl(category.name)}`;
                    const isActive = pathname === categoryPath;

                    return (
                        <Link
                            key={category.name}
                            href={categoryPath}
                            className="flex flex-col items-center gap-1 shrink-0 relative top-0.5 cursor-pointer"
                        >
                            <div className={`size-16 rounded-full relative overflow-hidden transition-all ${isActive ? "ring-2 ring-ink ring-offset-2 ring-offset-background" : "border border-line"}`} >
                                <Image
                                    src={category.image}
                                    fill
                                    priority
                                    sizes="64px"
                                    alt={category.name}
                                    className="object-cover"
                                />
                            </div>

                            <span className={`font-display text-sm ${isActive ? "text-ink font-semibold" : "text-ink-muted"}`} >
                                {category.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}