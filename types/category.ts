export interface SlideCategory {
    id: number;
    name: string;
    slug: string;
    image: string;
    productCount: number;
}

export interface ProductDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

export interface OptionGroupDTO {
    id: number;
    label: string;
    required: boolean;
    options: string[];
}

export interface RecommendedItemDTO {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface CategoryPageDTO {
    id: number;
    name: string;
    slug: string;
    image: string;
    products: ProductDTO[];
    optionGroups: OptionGroupDTO[];
    recommended: RecommendedItemDTO[];
}

export type OptionGroup = OptionGroupDTO;
export type RecommendedItem = RecommendedItemDTO;