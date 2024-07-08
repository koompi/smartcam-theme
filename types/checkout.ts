import { ProductType } from "./product";

export type DeliveryType = {
  photos: string;
  firstName: string;
  lastName: string;
  address: string[];
  email: string;
  phoneNumber: string;
  instruction?: string;
  express: string;
  id: string;
  logo: string;
  addressName: string;
  customerName: string;
};

export type PaymentType = {
  method: "CARD" | "PAYPAL" | "BITCOIN" | "CASH";
  nameCard: string;
  numberCard: string;
};

export type CheckoutType = {
  delivery_option: string;
  // delivery_express: string;
  payment: "CASH";
};

export type CustomerAddressType = {
  id: string;
  lat: number;
  lng: number;
  firstName: string;
  lastName: string;
  addressName: string;
  phoneNumber: string;
  photos: string[];
  storeId: string;
  label: string;
};

export type CheckoutCartType = {
  productId: string;
  qty: number;
  product: ProductType;
  unitPrice: {
    khr: number;
    usd: number;
  };
  discountPrice: {
    khr: number;
    usd: number;
  };
  discountPercentage: number;
};

export type OrdersType = {
  product?: ProductType;
  carts: CheckoutCartType[];
  code: string;
  createdAt: string;
  id: string;
  ownerId: string;
  status: string;
  tax: string;
  discountUnitPrice: {
    khr: number;
    usd: number;
  };
  totalUnitPrice: {
    khr: number;
    usd: number;
  };
  refetch: Function;
};
