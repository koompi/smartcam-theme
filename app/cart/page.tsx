"use client";

import { useCart } from "@/context/useCart";
// import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import CheckoutComponent from "./components/CheckoutComponent";
import { useQuery } from "@apollo/client";
import { ESTIMATION_PRICE } from "@/graphql.bk/order";
import { ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";
import { GET_ALL_PRODUCTS } from "@/graphql.bk/product";
// import { GET_ALL_PRODUCTS } from "@/graphql/product";

interface OrderCart {
  product: ProductType;
  promotion: PromotionType;
  qty: number;
}

export default function CartPage() {
  const { data: products } = useQuery(GET_ALL_PRODUCTS, {
    variables: {
      filter: {
        limit: 10,
        skip: 0,
        sort: -1,
      },
    },
  });

  return <CheckoutComponent />;
}
