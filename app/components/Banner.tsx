"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Button, Image } from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BANNERS } from "@/graphql/banner";
import { Icon } from "@iconify/react/dist/iconify.js";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

const Banner = () => {
  const { data, loading } = useQuery(GET_ALL_BANNERS);

  if (!data || loading) {
    return (
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        {[1, 2, 3, 4, 5].map((res) => (
          <SwiperSlide key={res}>
            <Image
              alt="banner"
              radius="none"
              src="/images/banner/default-banner.jpg"
              className="h-[12rem] sm:h-[12rem] lg:h-[45rem] object-cover object-center w-screen"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <section>
      <div className="h-[12rem] sm:h-[12rem] lg:h-[45rem]">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 9000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
        >
          {data?.bannerSpacialOffer.map((res: any, idx: number) => (
            <SwiperSlide key={idx}>
              {res.products.length > 0 && (
                <div className="flex items-center justify-center">
                  <Button
                    as={Link}
                    href={`/products/${res?.products[0]?.product?.slug}`}
                    size="lg"
                    variant="shadow"
                    color="primary"
                    radius="full"
                    className="absolute z-30 bottom-12 px-12"
                    endContent={<Icon icon="solar:arrow-right-bold" />}
                  >
                    See More
                  </Button>
                </div>
              )}
              <Image
                alt="banner"
                radius="none"
                src={
                  res.thumbnail
                    ? `${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${res.thumbnail}`
                    : "/images/banner/default-banner.jpg"
                }
                className="h-[12rem] sm:h-[12rem] lg:h-[45rem] object-cover object-center w-screen"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
