"use client";
import { Button, Navbar } from "@nextui-org/react";

import { ProductType } from "@/types/product";
import { Category } from "@/types/category";
// import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { Search } from "./components/Search";
import { GLOBAL_PRODUCT_FILTERING } from "@/graphql.bk/product";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/graphql.bk/category";
import ProductCard from "@/components/globals/ProductCard";

export default function SearchPage() {
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

  const { data: products } = useQuery(GLOBAL_PRODUCT_FILTERING, {
    variables: {
      tagId: brands ? brands : cat ? (sub ? [sub] : [cat]) : search ? [] : null,
      keyword: search ? search : search,
      status: price ? "price" : null,
      range: rangePrice,
      filter: {
        limit: limit,
        skip: skip,
        sort: price ? (sortParam == "price_low_to_high" ? 1 : -1) : -1,
      },
    },
  });

  const { data: categories } = useQuery(CATEGORIES, {
    variables: {
      filter: {
        limit: 10,
        skip: 0,
        sort: -1,
      },
    },
  });

  return (
    <section className="container mx-auto px-2 sm:px-2 lg:px-6 py-2">
      <Navbar shouldHideOnScroll classNames={{ wrapper: "px-0" }}>
        <Search />
      </Navbar>
      {categories?.storeOwnerCategories?.length > 0 && (
        <div className="my-auto flex max-w-lg flex-col gap-2">
          <h3 className="text-lg font-bold leading-8 mt-3">Popular Search</h3>
          <div className="flex flex-wrap items-center gap-2">
            {categories?.storeOwnerCategories?.map(
              (cat: Category, idx: number) => {
                return (
                  <Button
                    key={idx}
                    variant="flat"
                    size="sm"
                    className="w-auto"
                    as={Link}
                    radius="full"
                    href={`/products?search=&category=${cat.id}`}
                  >
                    {cat.title.en}
                  </Button>
                );
              }
            )}
          </div>
        </div>
      )}

      {products?.storeGlobalFilterProducts?.products.length > 0 && (
        <div className="my-auto flex flex-col gap-2 pb-9">
          <h3 className="text-lg font-bold leading-8 mt-3">Trending Now</h3>
          <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 px-2">
            {products?.storeGlobalFilterProducts?.products
              ?.slice(0, 10)
              ?.sort((a: ProductType, b: ProductType) =>
                a?.sell > b?.sell ? -1 : 1
              )
              ?.map((res: any, idx: number) => {
                const {
                  thumbnail,
                  title,
                  desc,
                  rating,
                  price,
                  id,
                  slug,
                  currencyPrice,
                  stocks,
                } = res?.product;

                return (
                  <div key={idx}>
                    <ProductCard
                      id={id}
                      thumbnail={thumbnail}
                      title={title}
                      desc={desc}
                      rating={rating ? rating : 4}
                      price={price}
                      promotion={{
                        isMembership: res.promotion?.isMembership,
                        discount: {
                          discountPercentage:
                            res.promotion?.discount?.discountPercentage,
                          discountPrice: res.promotion?.discount?.discountPrice,
                          discountType: res.promotion?.discount?.discountType,
                          originalPrice: res.promotion?.discount?.originalPrice,
                          totalDiscount: res.promotion?.discount?.totalDiscount,
                        },
                      }}
                      slug={slug}
                      stocks={stocks}
                      currencyPrice={currencyPrice}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </section>
  );
}
