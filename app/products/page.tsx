"use client";

import React from "react";
import ProductCard from "@/components/globals/ProductCard";
import ecommerceItems from "@/components/CustomComponent/EcommerceItems";
import FiltersWrapper from "@/components/CustomComponent/FilterWrapper";
import SidebarDrawer from "@/components/CustomComponent/SidebarDrawer";
import PromotionCard from "../components/PromotionCard";
import { GLOBAL_PRODUCT_FILTERING } from "@/graphql/product";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { Loading } from "@/components/globals/Loading";
import { MessageProduct, ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";
import Empty from "@/components/globals/Empty";

const ProductPage = () => {
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
  const sort = searchParams.get("sort") ?? null;

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

  const mostPopularSort = (): MessageProduct[] => {
    if (!products) {
      return [];
    }

    return [...products?.storeGlobalFilterProducts?.products].sort(
      (a: MessageProduct, b: MessageProduct) =>
        a.product.sell > b.product.sell ? -1 : 1
    );
  };

  const brandSort = (): MessageProduct[] => {
    if (!products) {
      return [];
    }
    return [...products?.storeGlobalFilterProducts?.products].sort(
      (a: MessageProduct, b: MessageProduct) =>
        a.product.brand > b.product.brand ? -1 : 1
    );
  };

  const topRated = (): MessageProduct[] => {
    if (!products) {
      return [];
    }
    return [...products?.storeGlobalFilterProducts?.products].sort(
      (a: MessageProduct, b: MessageProduct) =>
        a.product.rating > b.product.rating ? -1 : 1
    );
  };

  const newestSort = (): MessageProduct[] => {
    if (!products) {
      return [];
    }
    return [...products?.storeGlobalFilterProducts?.products].sort(
      (a: MessageProduct, b: MessageProduct) =>
        a.product.createdAt > b.product.createdAt ? -1 : 1
    );
  };

  const ProductSortComponent = () => {
    if (sort === "most_popular") {
      return (
        <>
          {mostPopularSort().map((res: MessageProduct, idx: number) => {
            const {
              thumbnail,
              title,
              desc,
              rating,
              price,
              id,
              slug,
              stocks,
              currencyPrice,
            } = res?.product;
            return (
              <ProductCard
                key={idx}
                id={id}
                thumbnail={thumbnail}
                title={title}
                desc={desc}
                rating={rating}
                price={price}
                slug={slug}
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
                stocks={stocks}
                currencyPrice={currencyPrice}
              />
            );
          })}
        </>
      );
    }
    if (sort === "newest") {
      return (
        <>
          {newestSort().map((res: MessageProduct, idx: number) => {
            const {
              thumbnail,
              title,
              desc,
              rating,
              price,
              id,
              slug,
              stocks,
              currencyPrice,
            } = res?.product;
            return (
              <ProductCard
                key={idx}
                id={id}
                thumbnail={thumbnail}
                title={title}
                desc={desc}
                rating={rating}
                price={price}
                slug={slug}
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
                stocks={stocks}
                currencyPrice={currencyPrice}
              />
            );
          })}
        </>
      );
    }
    if (sort === "top_rated") {
      return (
        <>
          {topRated().map((res: MessageProduct, idx: number) => {
            const {
              thumbnail,
              title,
              desc,
              rating,
              price,
              id,
              slug,
              stocks,
              currencyPrice,
            } = res?.product;
            return (
              <ProductCard
                key={idx}
                id={id}
                thumbnail={thumbnail}
                title={title}
                desc={desc}
                rating={rating}
                price={price}
                slug={slug}
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
                stocks={stocks}
                currencyPrice={currencyPrice}
              />
            );
          })}
        </>
      );
    }
    if (sort === "price_low_to_high" || sort === "price_high_to_low") {
      return (
        <>
          {products?.storeGlobalFilterProducts?.products.map(
            (res: MessageProduct, idx: number) => {
              const {
                thumbnail,
                title,
                desc,
                rating,
                price,
                id,
                slug,
                stocks,
                currencyPrice,
              } = res?.product;
              return (
                <ProductCard
                  key={idx}
                  id={id}
                  thumbnail={thumbnail}
                  title={title}
                  desc={desc}
                  rating={rating}
                  price={price}
                  slug={slug}
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
                  stocks={stocks}
                  currencyPrice={currencyPrice}
                />
              );
            }
          )}
        </>
      );
    } else {
      return (
        <>
          {brandSort().map((res: MessageProduct, idx: number) => {
            const {
              thumbnail,
              title,
              desc,
              rating,
              price,
              id,
              slug,
              stocks,
              currencyPrice,
            } = res?.product;
            return (
              <ProductCard
                key={idx}
                id={id}
                thumbnail={thumbnail}
                title={title}
                desc={desc}
                rating={rating}
                price={price}
                slug={slug}
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
                stocks={stocks}
                currencyPrice={currencyPrice}
              />
            );
          })}
        </>
      );
    }
  };

  if (loadingProduct || !products) {
    return <Loading />;
  }

  return (
    <main>
      <PromotionCard />
      <section className="flex gap-6 px-3 sm:px-3 lg:px-6 py-6 sm:py-6 lg:py-6">
        <SidebarDrawer className="w-[27rem]">
          <FiltersWrapper
            className="bg-white sticky top-20"
            items={ecommerceItems}
            scrollShadowClassName="pb-12"
            showActions={false}
            title="Filter by"
          />
        </SidebarDrawer>
        <section className="w-full">
          {products?.storeGlobalFilterProducts?.products.length <= 0 && (
            <Empty />
          )}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 place-items-stretch gap-3">
            {/* {Array.from(
              products?.storeGlobalFilterProducts?.products,
              (res: ProductProps, idx) => {
                const {
                  thumbnail,
                  title,
                  desc,
                  rating,
                  price,
                  id,
                  slug,
                  stocks,
                  currencyPrice,
                } = res?.product;

                return (
                  <ProductCard
                    key={idx}
                    id={id}
                    thumbnail={thumbnail}
                    title={title}
                    desc={desc}
                    rating={rating}
                    price={price}
                    slug={slug}
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
                    stocks={stocks}
                    currencyPrice={currencyPrice}
                  />
                );
              }
            )} */}

            <ProductSortComponent />
          </div>
        </section>
      </section>
    </main>
  );
};

export default ProductPage;
