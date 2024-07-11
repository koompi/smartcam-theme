"use client";

import ProductViewInfo from "./ProductViewItem";
import { GET_PRODUCT } from "@/graphql.bk/product";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

export default function ProductDetail(props: { slug: string }) {
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      slug: props.slug,
    },
  });
  if (error) {
    return <div>Error</div>;
  }
  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <ProductViewInfo {...data?.storeProduct} />
      )}
    </>
  );
}
