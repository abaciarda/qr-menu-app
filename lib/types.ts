export interface ProductItem {
    id: number;
    categoryId: number;
    name: string;
    description: string | null;
    price: number;
    image: string;
    isAvailable: boolean;
    sortOrder: number;
    category?: string;
}

export interface CategoryItem {
    id: number;
    name: string;
    slug: string;
    image: string;
    sortOrder: number;
    isActive: boolean;
}