"use client";

import { Category, SubCategory } from "@/types/category";
import ecommerceItems from "./EcommerceItems";
import FiltersWrapper from "./FilterWrapper";
import SidebarDrawer from "./SidebarDrawer";
import {
  useDisclosure,
  Image,
  CheckboxGroup,
  RadioGroup,
  Button,
} from "@nextui-org/react";
import MenuBar from "./MenuBar";
import ProductCard from "../globals/ProductCard";
import { MessageProduct } from "@/types/product";
import { PaginationProduct } from "./PaginationProduct";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CardLoading } from "../globals/Loading";
import { useQuery } from "@apollo/client";
import { SUB_CATEGORY_BY_ID } from "@/graphql/category";
import { CustomCheckbox } from "./CustomCheckBox";
import { BrowserView } from "react-device-detect";
// import { useCart } from "@/context/useCart";

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
  const router = useRouter();

  const offset = searchParams.get("page") ?? "1";
  const limit = searchParams.get("size") ?? "12";
  const query_search = searchParams.get("search") ?? null;
  const cat = searchParams.get("category") || null;
  const sub = searchParams.get("sub_category") || null;
  const minPrice = (searchParams.get("min_price") as string) || null;
  const maxPrice = (searchParams.get("max_price") as string) || null;
  const sort = searchParams.get("sort") ?? null;
  const brands = searchParams.get("brands") || null;

  const [subId, setSubId] = useState(sub);

  const {
    data: subCat,
    loading: loadingSubCat,
    refetch,
  } = useQuery(SUB_CATEGORY_BY_ID, {
    variables: {
      parentId: cat,
    },
    skip: !cat || cat === "" || cat === null,
  });

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
              category,
              remark,
            } = res?.product;
            return (
              <ProductCard
                key={idx}
                id={id}
                favorite={res?.favorite}
                compare={res?.compare}
                thumbnail={thumbnail}
                title={title}
                desc={desc}
                rating={rating}
                price={price}
                slug={slug}
                categoryId={category?.id}
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
                remark={remark}
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
              category,
              remark,
            } = res?.product;

            // console.log("res", res);

            return (
              <ProductCard
                key={idx}
                id={id}
                favorite={res?.favorite}
                compare={res?.compare}
                categoryId={category?.id}
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
                remark={remark}
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
              category,
              remark,
            } = res?.product;
            return (
              <ProductCard
                key={idx}
                id={id}
                favorite={res?.favorite}
                compare={res?.compare}
                categoryId={category?.id}
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
                remark={remark}
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
              category,
              remark,
            } = res?.product;
            return (
              <ProductCard
                key={idx}
                id={id}
                favorite={res?.favorite}
                compare={res?.compare}
                categoryId={category?.id}
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
                remark={remark}
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
              category,
              remark,
            } = res?.product;
            return (
              <ProductCard
                key={idx}
                id={id}
                favorite={res?.favorite}
                compare={res?.compare}
                categoryId={category?.id}
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
                remark={remark}
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
          <BrowserView>
            {subCat?.storeOwnerSubcategories.length > 0 && (
              <div className="flex flex-wrap gap-3 w-full mb-6">
                <Button
                  radius="lg"
                  variant={!sub ? "shadow" : "flat"}
                  size="sm"
                  color={!sub ? "primary" : "default"}
                  className="text-sm px-4"
                  onPress={() => {
                    setSubId("");
                    router.push(
                      `?search=${query_search ? query_search : ""}&brands=${brands ? brands : ""}&category=${
                        cat ? cat : ""
                      }&sub_category=&sort=${sort ? sort : ""}`
                    );
                  }}
                >
                  All SubCategory
                </Button>
                {subCat?.storeOwnerSubcategories
                  ?.filter((sub: SubCategory) => sub?.products > 0)
                  ?.map((sub: SubCategory, idx: number) => {
                    return (
                      <Button
                        radius="lg"
                        variant={sub?.id === subId ? "shadow" : "flat"}
                        size="sm"
                        key={idx}
                        color={sub?.id === subId ? "primary" : "default"}
                        className="text-sm px-4"
                        onPress={() => {
                          setSubId(sub?.id);
                          router.push(
                            `?search=${query_search ? query_search : ""}&brands=${brands ? brands : ""}&category=${
                              cat ? cat : ""
                            }&sub_category=${sub?.id ? sub?.id : ""}&sort=${
                              sort ? sort : ""
                            }`
                          );
                        }}
                      >
                        {sub.title?.en}
                      </Button>
                    );
                  })}
              </div>
            )}
          </BrowserView>
          {loading ? (
            <CardLoading />
          ) : products?.length <= 0 || !products ? (
            <div className="text-center h-[60vh] flex items-center justify-center">
              <div className="flex flex-col justify-center items-center">
                <Image
                  isBlurred
                  radius="none"
                  alt="Empty"
                  src="/images/empty-cart.svg"
                  className="h-32 sm:h-32 lg:h-60"
                />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  No Products.
                </h1>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 place-items-stretch gap-3">
                <ProductSortComponent />
              </div>
            </>
          )}
          {total > 12 && (
            <div className="w-full flex justify-center mt-20 space-x-2">
              {loading ? null : (
                <PaginationProduct
                  page={page}
                  total={pageFilter === 0 ? 1 : pageFilter}
                  rowsPerPage={parseInt(limit as string)}
                  setPage={setPage}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
