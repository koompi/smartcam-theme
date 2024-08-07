"use client";

import ComponentProducts from "@/components/CustomComponent/ComponentProducts";
import { GLOBAL_PRODUCT_FILTERING } from "@/graphql/product";
import { useQuery } from "@apollo/client";
import { CATEGORIES } from "@/graphql/category";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || null;
  const cat = searchParams.get("category") || null;
  const sub = searchParams.get("sub_category") || null;
  const page = (searchParams.get("page") as string) || "1";
  const size = (searchParams.get("size") as string) || "16";
  const minPice = (searchParams.get("min_price") as string) || null;
  const maxPice = (searchParams.get("max_price") as string) || null;
  const sortParam = (searchParams.get("sort") as string) || null;
  const price =
    ["price_low_to_high", "price_high_to_low"].includes(sortParam as string) ||
    null;

  const brands = searchParams.get("brands") || null;

  let skip =
    parseInt(page as string) > 1
      ? (parseInt(size as string) / 2) * parseInt(page as string) + 1
      : 0;
  let limit = parseInt(size as string);
  let rangePrice = minPice
    ? {
        start: parseInt(minPice as string),
        end: parseInt(maxPice as string),
      }
    : null;

  const { data: products, loading: loadingProduct } = useQuery(
    GLOBAL_PRODUCT_FILTERING,
    {
      variables: {
        tagId: brands
          ? cat
            ? sub
              ? [...brands?.split(","), cat, sub]
              : [...brands?.split(","), cat]
            : [...brands?.split(",")]
          : cat
            ? sub
              ? [sub]
              : [cat]
            : search
              ? []
              : null,
        keyword: search ? search : search,
        status: price ? "price" : null,
        range: rangePrice,
        filter: {
          limit: limit,
          skip: skip,
          sort: price ? (sortParam == "price_low_to_high" ? 1 : -1) : -1,
        },
      },
    }
  );

  const { data: categories } = useQuery(CATEGORIES, {
    variables: {
      filter: null,
    },
  });

  return (
    <section className="px-3 sm:px-3 lg:px-6 py-3 sm:py-3 lg:py-9">
      <div className="flex gap-x-6">
        <ComponentProducts
          categories={categories?.storeOwnerCategories}
          {...products?.storeGlobalFilterProducts}
          searchParams={searchParams}
          loading={loadingProduct}
        />
      </div>
    </section>
  );
}
