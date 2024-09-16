import { UserType } from "./user";

export type ContextAuth = {
  user: UserType;
  loading: boolean;
  login: (c: string | null, s: string | null) => void
  logout: Function;
};

export type CartItem = {
  productId: string;
  variantId: string | null;
  qty: number;
};

export type AddCart = {
  product_id: string,
  variant_id: string | null
}

export type CartContextType = {
  loading: boolean;
  cartItems: CartItem[];
  membershipId: string;
  wishlistFav: any;
  wishlistCompare: any;
  refetchFav: Function;
  addToCart: (cart: AddCart, qty?: number) => void;
  minusCart: (product_id: string) => void;
  removeFromCart: (id: String) => void;
  addCarts: (cartItems: CartItem[]) => void;
  cleanCartItems: Function;
  notifications: any;
  refetch: Function;
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

// types.ts
export interface ITelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}

export interface IWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: ITelegramUser;
    auth_date: string;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: {
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
    hint_color: string;
    bg_color: string;
    text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  headerColor: string;
  backgroundColor: string;
  BackButton: {
    isVisible: boolean;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
  };
  HapticFeedback: any;
}


export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        initDataUnsafe: {
          query_id: string;
          user: {
            id: number;
            first_name: string;
            last_name: string;
            username: string;
            language_code: string;
          };
          auth_date: number;
          hash: string;
        };
      };
    };
  }
}
