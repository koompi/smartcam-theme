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

interface ProductProps {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  rating: number;
  price: number;
  discountType: string;
  promotionPercentage: number;
  promotionPrice: number;
  totalPrice: number;
  brand: string;
  category: string;
}

interface Props {
  title: string;
  data: any;
}

const SectionListProducts: FC<Props> = ({ title, data }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [_, setInit] = useState<boolean>();

  return (
    <section className="px-6 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center gap-3">
          <Button ref={prevRef} isIconOnly variant="flat" color="primary">
            <Icon icon="solar:arrow-left-bold" />
          </Button>
          <Button ref={nextRef} isIconOnly variant="flat" color="primary">
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
        slidesPerView={1}
        spaceBetween={10}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={() => setInit(true)}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
        }}
        modules={[Pagination, Navigation]}
        className="grid grid-cols-5 place-items-stretch gap-3 bg-background"
      >
        {Array.from(data, (res: ProductProps, idx) => {
          return (
            <SwiperSlide key={idx} className="bg-background">
              <ProductCard
                url={res.url}
                thumbnail={`/images/products/${res.thumbnail}`}
                title={res.title}
                desc={undefined}
                rating={res.rating}
                price={res?.price}
                discountType={res?.discountType}
                promotionPercentage={res?.promotionPercentage}
                promotionPrice={res?.promotionPrice}
                totalPrice={res?.totalPrice}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default SectionListProducts;
