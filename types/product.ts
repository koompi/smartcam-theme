import { Category, SubCategory } from "./category";

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

export type ItemProduct = {
  thumbnail?: any;
  variant?: Variants;
  title?: string;
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
