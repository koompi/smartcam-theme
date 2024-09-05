"use client";

import Link from "next/link";
import React, { FC, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Spacer } from "@nextui-org/react";
import ProductCard from "@/components/globals/ProductCard";

import { ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";
import {
  GLOBAL_PRODUCT_FILTERING,
  PRODUCT_SECTION_TYPE,
} from "@/graphql/product";
import { useQuery } from "@apollo/client";
import { CardLoading } from "@/components/globals/Loading";

interface ProductProps {
  product: ProductType;
  promotion: PromotionType;
  favorite: boolean;
  compare: boolean;
}

interface Props {
  title: string;
  type: string;
}

export const dynamic = "force-dyanmic";

const SectionListProducts: FC<Props> = ({ title, type }) => {
  const { data: products, loading } = useQuery(GLOBAL_PRODUCT_FILTERING, {
    variables: {
      filter: {
        limit: 10,
        skip: 1,
        sort: -1,
      },
    },
  });

  // product by type
  const { data: productsBy, loading: loadingProductBy } = useQuery(
    PRODUCT_SECTION_TYPE,
    {
      variables: {
        statusType: type === "MOST POPULAR" ? "BESTSELLER" : "ARRIVAL",
        category: null,
        filter: {
          limit: 10,
          skip: 0,
          sort: -1,
        },
      },
    }
  );

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 5; // width of one card
      carouselRef.current.scrollBy({
        left: -cardWidth * 2, // scroll by two cards
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 5; // width of one card
      carouselRef.current.scrollBy({
        left: cardWidth * 2, // scroll by two cards
        behavior: "smooth",
      });
    }
  };

  if (loadingProductBy || !productsBy || !products || loading) {
    return <CardLoading />;
  }

  const randomizeArray = [
    ...products?.storeGlobalFilterProducts?.products,
  ].sort(() => 0.5 - Math.random());

  return (
    <section className="px-3 sm:px-3 lg:px-6 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-md sm:text-md lg:text-xl font-semibold">{title}</h2>
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onPress={scrollLeft}
            isIconOnly
            variant="flat"
            color="primary"
          >
            <Icon icon="solar:arrow-left-bold" />
          </Button>
          <Button
            size="sm"
            onPress={scrollRight}
            isIconOnly
            variant="flat"
            color="primary"
          >
            <Icon icon="solar:arrow-right-bold" />
          </Button>
          <Link
            href="/products"
            className="text-primary flex items-center gap-1 hover:underline"
          >
            See more
            <Icon icon="solar:arrow-right-linear" fontSize={15} />
          </Link>
        </div>
      </div>
      <Spacer y={3} />

      <div className="relative h-full">
        <div
          ref={carouselRef}
          className="flex overflow-x-scroll gap-3 items-stretch scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {type === "MOST POPULAR" || type === "NEW ARRIVAL" ? (
            <div className="flex flex-nowrap gap-2">
              {productsBy?.storeSortProducts?.products?.map(
                (res: ProductProps, idx: number) => {
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
                  } = res?.product;
                  return (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-64 sm:w-64 lg:w-[21rem] h-full snap-center"
                    >
                      <ProductCard
                        id={id}
                        favorite={res?.favorite}
                        compare={res?.compare}
                        categoryId={category?.id}
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
                            discountPrice:
                              res.promotion?.discount?.discountPrice,
                            discountType: res.promotion?.discount?.discountType,
                            originalPrice:
                              res.promotion?.discount?.originalPrice,
                            totalDiscount:
                              res.promotion?.discount?.totalDiscount,
                          },
                        }}
                        slug={slug}
                        stocks={stocks}
                        currencyPrice={currencyPrice}
                      />
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <div className="flex flex-nowrap gap-2">
              {randomizeArray?.map((res: ProductProps, idx: number) => {
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
                } = res?.product;
                return (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-64 sm:w-64 lg:w-[21rem] h-full snap-center"
                  >
                    <ProductCard
                      id={id}
                      favorite={res?.favorite}
                      compare={res?.compare}
                      categoryId={category?.id}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionListProducts;
