"use client";

import { Loading } from "@/components/globals/Loading";
import { ProductViewItem } from "./ProductViewItem";
import { GET_PRODUCT } from "@/graphql/product";
import { useQuery } from "@apollo/client";

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
      {loading || !data ? (
        <Loading />
      ) : (
        <ProductViewItem
          {...data?.storeProduct?.product}
          favorite={data?.storeProduct?.favorite}
          compare={data?.storeProduct?.compare}
          promotion={data?.storeProduct?.promotion}
        />
      )}
    </>
  );
}
