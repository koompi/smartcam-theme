"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Image } from "@nextui-org/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
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
          <SwiperSlide>
            <Image
              alt="banner"
              radius="none"
              src="/images/banner/banner.jpg"
              className="h-[27dvh] sm:h-[27dvh] lg:h-[100dvh] object-cover object-center w-screen"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="banner"
              radius="none"
              src="/images/banner/banner2.png"
              className="h-[27dvh] sm:h-[27dvh] lg:h-[100dvh] object-cover object-center w-screen"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="banner"
              radius="none"
              src="/images/banner/banner3.png"
              className="h-[27dvh] sm:h-[27dvh] lg:h-[100dvh] object-cover object-center w-screen"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="banner"
              radius="none"
              src="/images/banner/banner4.jpg"
              className="h-[27dvh] sm:h-[27dvh] lg:h-[100dvh] object-cover object-center w-screen"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="banner"
              radius="none"
              src="/images/banner/banner5.jpg"
              className="h-[27dvh] sm:h-[27dvh] lg:h-[100dvh] object-cover object-center w-screen"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
