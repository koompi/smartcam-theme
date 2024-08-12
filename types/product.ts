import { Category, SubCategory } from "./category";
import { PromotionType } from "./promotion";

export interface Attribute {
  type: string;
  option: string;
}
export interface Variants {
  id?: string | null;
  label: string;
  previews: string;
  price: number;
  default: boolean;
  attributes: Attribute[];
}

export interface Promotion {
  type: string;
  discount: number;
  price: number;
}

export type ItemProduct = {
  thumbnail?: any;
  variant?: Variants;
  title?: string;
  promotion: PromotionType | null;
  id: string;
  name: string;
  price: number;
  currency: "KHR" | "USD";
  preview: string;
  slug?: string;
  productId: string;
  variantId: string | null;
};

export type StockType = {
  amount: number;
  status: string;
};

export type MessageProduct = {
  product: ProductType;
  promotion: PromotionType;
  favorite: boolean;
  compare: boolean;
};

export type ProductType = {
  id: string;
  status: boolean;
  title: string;
  thumbnail: string;
  rating: number;
  brand: string;
  currency: "KHR" | "USD";
  price: number;
  slug: string;
  previews: string[];
  currencyPrice: {
    khr: number;
    usd: number;
  };
  promotion: PromotionType;
  tags: string[];
  quantity: number;
  variants: Variants[];
  sell: number;
  desc: string;
  detail: string;
  createdAt: string;
  category: Category;
  stocks: StockType;
  subcategories: SubCategory[];
  favorite: boolean;
  compare: boolean;
};

// dynamic types
export type HeaderType = {
  logo: string;
  name: string;
  type: boolean;
};

export type BrandTitleType = {
  en: string;
  kh: string;
};

export type BrandsType = {
  id: string;
  logo: string;
  title: BrandTitleType;
};
