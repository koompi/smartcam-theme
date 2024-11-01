"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Button, Image } from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BANNERS } from "@/graphql/banner";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

const Banner = () => {
  const { data, loading } = useQuery(GET_ALL_BANNERS);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

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

  const reverseBanner = [...data?.bannerSpacialOffer]?.reverse();

  return (
    <section>
      <div className="h-[12rem] sm:h-[12rem] lg:h-[45rem] relative">
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
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper: SwiperType) => {
            // Delay the assignment of navigation elements until after Swiper is initialized
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
        >
          {reverseBanner?.map((res: any, idx: number) => (
            <SwiperSlide key={idx}>
              <Image
                alt="banner"
                radius="none"
                src={
                  res.thumbnail
                    ? `${process.env.NEXT_PUBLIC_S3}/${res.thumbnail.split(".")[0] + "_max." + res.thumbnail.split(".")[1]}`
                    : "/images/banner/default-banner.jpg"
                }
                className="h-[12rem] sm:h-[12rem] lg:h-[45rem] object-fill object-center w-screen"
              />
              {res.products.length > 0 && (
                <div className="hidden sm:hidden lg:flex items-center mx-auto justify-center absolute z-30 bottom-12">
                  <Button
                    as={Link}
                    href={`/products/${res?.products[0]?.product?.slug}`}
                    size="lg"
                    variant="shadow"
                    color="primary"
                    radius="full"
                    className=" px-12 "
                    endContent={<Icon icon="solar:arrow-right-bold" />}
                  >
                    See More
                  </Button>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* btn swip */}
        <div className="hidden sm:hidden lg:flex">
          <div
            ref={prevRef}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 cursor-pointer "
          >
            <Button
              isIconOnly
              radius="none"
              size="lg"
              className="w-28 bg-inherit"
            >
              <Icon icon="ph:circle-thin" className="text-6xl text-white/60" />
              <Icon
                icon="teenyicons:arrow-solid"
                className="text-4xl text-white/60 -rotate-45 relative -left-7"
              />
            </Button>
          </div>
          <div
            ref={nextRef}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 cursor-pointer"
          >
            <Button
              size="lg"
              className="w-28 bg-inherit"
              isIconOnly
              radius="none"
            >
              <Icon
                icon="teenyicons:arrow-solid"
                className="text-4xl text-white/60 rotate-[135deg] relative left-7"
              />
              <Icon icon="ph:circle-thin" className="text-6xl text-white/60" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
