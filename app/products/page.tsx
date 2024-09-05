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
  const size = (searchParams.get("size") as string) || "12";
  const minPice = (searchParams.get("min_price") as string) || null;
  const maxPice = (searchParams.get("max_price") as string) || null;
  const sortParam = (searchParams.get("sort") as string) || null;
  const price =
    ["price_low_to_high", "price_high_to_low"].includes(sortParam as string) ||
    null;

  const brands = searchParams.get("brands") || null;

  let limit = parseInt(size as string);
  let skip =
    parseInt(page as string) > 1 ? limit * parseInt(page as string) - limit : 0;
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
        tagId: cat ? (sub ? [sub] : [cat]) : search ? [] : null,
        keyword: search ? search : search,
        status: price ? "price" : null,
        brand: brands ? [...brands?.split(",")] : null,
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
    <section className="px-3 sm:px-3 lg:px-6 pt-3 pb-3 sm:pb-3 lg:pb-9">
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
