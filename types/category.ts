type Title = {
  en: string;
  kh?: string;
};

export type SubCategory = {
  id: string;
  logo?: string;
  title: Title;
  products: number;
};

export type Category = {
  id: string;
  logo: string;
  title: Title;
  products: number;
  children: SubCategory[];
};
