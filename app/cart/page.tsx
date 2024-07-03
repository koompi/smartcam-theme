"use client";

import { products } from "@/data/products";
// import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import CheckoutComponent from "./components/CheckoutComponent";
// import { GET_ALL_PRODUCTS } from "@/graphql/product";

export default function CartPage() {
  // const { data: products } = useQuery(GET_ALL_PRODUCTS, {
  //   variables: {
  //     filter: {
  //       limit: 10,
  //       skip: 0,
  //       sort: -1,
  //     },
  //   },
  // });

  return (
    <>
      <CheckoutComponent products={products} />
    </>
  );
}
