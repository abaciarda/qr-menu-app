import { SlideCategory } from "@/types/category";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({id, name, image, slug, productCount } : SlideCategory) {
    return (
        <Link href={`/${slug}`} className="bg-surface h-36 rounded-2xl relative overflow-hidden shadow-lg shadow-ink/10">
            <Image
                src={ image }
                fill
                sizes="(max-width: 640px) 100vw, 400px"
                alt={`${name} Category`}
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-5 flex flex-col gap-0.5">
                <p className="text-xl text-white font-semibold">{ name }</p>
                <p className="text-xs text-white/70">{ productCount } Products</p>
            </div>

            <div className="absolute bottom-4 right-5">
                <div className="w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/20 rounded-full hoverable-btn">
                    <ChevronRightIcon className="text-white" size={18} />
                </div>
            </div>
        </Link>
    )
}