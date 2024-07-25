"use client";

import { Category } from "@/types/category";
import ecommerceItems from "./EcommerceItems";
import FiltersWrapper from "./FilterWrapper";
import SidebarDrawer from "./SidebarDrawer";
import { useDisclosure, Image } from "@nextui-org/react";
import MenuBar from "./MenuBar";
import ProductCard from "../globals/ProductCard";
import { MessageProduct } from "@/types/product";
import { PaginationProduct } from "./PaginationProduct";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CardLoading } from "../globals/Loading";

export default function ComponentProducts({
  categories,
  products,
  total,
  pages,
  loading,
}: {
  categories: Category[];
  products: MessageProduct[];
  total: number;
  pages: number;
  loading: boolean;
}) {
  const searchParams = useSearchParams();

  const offset = searchParams.get("page") ?? "1";
  const limit = searchParams.get("size") ?? "16";
  const query_search = searchParams.get("search") ?? null;
  const cat = searchParams.get("category") || null;
  const sub = searchParams.get("sub_category") || null;
  const minPrice = (searchParams.get("min_price") as string) || null;
  const maxPrice = (searchParams.get("max_price") as string) || null;
  const sort = searchParams.get("sort") ?? null;

  const [page, setPage] = useState(parseInt(offset));

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const mostPopularSort = (): MessageProduct[] => {
    if (!products) {
      return [];
    }

    return [...products].sort((a: MessageProduct, b: MessageProduct) =>
      a.product.sell > b.product.sell ? -1 : 1
    );
  };

  const brandSort = (): MessageProduct[] => {
    if (!products) {
      return [];
    }
    return [...products].sort((a: MessageProduct, b: MessageProduct) =>
      a.product.brand > b.product.brand ? -1 : 1
    );
  };

  const topRated = (): MessageProduct[] => {
    if (!products) {
      return [];
    }
    return [...products].sort((a: MessageProduct, b: MessageProduct) =>
      a.product.rating > b.product.rating ? -1 : 1
    );
  };

  const newestSort = (): MessageProduct[] => {
    if (!products) {
      return [];
    }
    return [...products].sort((a: MessageProduct, b: MessageProduct) =>
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
          {products.map((res: MessageProduct, idx: number) => {
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

  let totalPages = Math.ceil(total / parseInt(limit as string)) ?? 1;

  const pageFilter =
    !query_search && !cat && !sub && !sort
      ? maxPrice && minPrice
        ? totalPages
        : pages
      : totalPages;

  return (
    <>
      <SidebarDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-[27rem]"
      >
        <FiltersWrapper
          className="bg-white rounded-3xl hide-scroll-bar"
          items={ecommerceItems}
          categories={categories}
          scrollShadowClassName="pb-12"
          showActions={false}
          title="Filter by"
          total={total}
          onCloseBase={onClose}
        />
      </SidebarDrawer>
      <div className="w-full flex-1 flex-col">
        <div className="block sm:block lg:hidden w-full">
          <MenuBar onOpen={onOpen} />
        </div>
        <main className="h-full w-full overflow-visible px-1">
          {loading ? (
            <CardLoading />
          ) : products?.length <= 0 || !products ? (
            <div className="text-center h-[60vh] flex items-center justify-center">
              <div>
                <div className="flex justify-center items-center">
                  <Image
                    isBlurred
                    radius="none"
                    alt="Empty"
                    src="/images/empty-cart.svg"
                    className="h-32 sm:h-32 lg:h-60"
                  />
                </div>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Whoops! No products.
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Browse our amazing selection of products and fill your cart
                  with goodies!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 place-items-stretch gap-3">
              <ProductSortComponent />
            </div>
          )}
          <div className="w-full flex justify-end mt-8 space-x-2">
            {loading ? null : (
              <PaginationProduct
                page={page}
                total={pageFilter == 0 ? 1 : pageFilter}
                rowsPerPage={parseInt(limit as string)}
                setPage={setPage}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
