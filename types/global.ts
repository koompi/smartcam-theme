import { ItemProduct } from "./product";
import { UserType } from "./user";

export type ContextAuth = {
  user: UserType;
  getUser: () => void;
  loading: boolean;
  login: (model: string | null) => void;
};

export type CartItem = {
  product: ItemProduct;
  quantity: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: ItemProduct) => void;
  minusCart: (product: ItemProduct) => void;
  removeFromCart: (id: String) => void;
  addCarts: (cartItems: CartItem[]) => void;
  cleanCartItems: Function;
  logout: Function;
  loading: boolean;
};

export type LoginForm = {
  email?: string;
  phone?: string;
  password?: string;
};

export type Social = {
  name: string;
  enable: boolean;
  link: string;
};

export type FooterContact = {
  address: string;
  phone: string;
  email: string;
};

export type FooterConfig = {
  socials: Social[];
  contact: FooterContact;
};

export type Member = {
  name: string;
  position: string;
  photo: string;
};

export type AboutConfig = {
  title: string;
  description: string;
  members: Member[];
};
