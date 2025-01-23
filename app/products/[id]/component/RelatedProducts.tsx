"use client";

import ProductCard from "@/components/globals/ProductCard";
import { Button, Spacer } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useRef } from "react";
import { ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";

interface ProductProps {
  product: ProductType;
  promotion: PromotionType;
  favorite: boolean;
  compare: boolean;
}

const RelatedProducts = ({
  relatedProducts,
}: {
  relatedProducts: ProductProps[];
}) => {
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

  return (
    <section className="px-3 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-md sm:text-md lg:text-xl font-semibold">
          Related Products
        </h2>
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
        </div>
      </div>
      <Spacer y={3} />

      <div className="relative h-full">
        <div
          ref={carouselRef}
          className="flex overflow-x-scroll gap-3 items-stretch scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          <div className="flex flex-nowrap gap-2">
            {relatedProducts?.map((res: ProductProps, idx: number) => {
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
                    remark={remark}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
