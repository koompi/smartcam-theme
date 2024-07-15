"use client";

import Link from "next/link";
import React, { FC, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Spacer } from "@nextui-org/react";
import ProductCard from "@/components/globals/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { MessageProduct, ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";

interface ProductProps {
  product: ProductType;
  promotion: PromotionType;
}

interface Props {
  title: string;
  data: any;
  type: string;
}

const SectionListProducts: FC<Props> = ({ title, data, type }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [_, setInit] = useState<boolean>();

  const mostPopularSort = (): MessageProduct[] => {
    if (!data) {
      return [];
    }
    return [...data?.products].sort((a: MessageProduct, b: MessageProduct) =>
      a.product?.sell > b.product?.sell ? -1 : 1
    );
  };

  const newestSort = (): MessageProduct[] => {
    if (!data?.products) {
      return [];
    }
    return [...data?.products].sort((a: MessageProduct, b: MessageProduct) =>
      a.product?.createdAt > b.product?.createdAt ? -1 : 1
    );
  };

  const topRated = (): MessageProduct[] => {
    if (!data?.products) {
      return [];
    }
    return [...data?.products].sort((a: MessageProduct, b: MessageProduct) =>
      a.product?.rating > b.product?.rating ? -1 : 1
    );
  };

  return (
    <section className="px-3 sm:px-3 lg:px-6 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-md sm:text-md lg:text-xl font-semibold">{title}</h2>
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            ref={prevRef}
            isIconOnly
            variant="flat"
            color="primary"
          >
            <Icon icon="solar:arrow-left-bold" />
          </Button>
          <Button
            size="sm"
            ref={nextRef}
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
      <Swiper
        slidesPerView={2}
        spaceBetween={12}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={() => setInit(true)}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
        }}
        modules={[Pagination, Navigation]}
        className="card-display grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 place-items-stretch gap-3 bg-background"
      >
        {Array.from(
          type === "MOST POPULAR"
            ? mostPopularSort()
            : type === "NEW ARRIVAL"
            ? newestSort()
            : topRated(),
          (res: ProductProps, idx) => {
            const { thumbnail, title, desc, rating, price, id, slug, stocks } =
              res?.product;

            console.log("data", res);

            return (
              <SwiperSlide key={idx} className="bg-background">
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
                />
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </section>
  );
};

export default SectionListProducts;
