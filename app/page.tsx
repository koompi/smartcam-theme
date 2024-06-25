"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Image } from "@nextui-org/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ScrollingBanner from "@/components/CustomComponent/ScrollingBrandsBanner";

export default function Home() {
  return (
    <main className="min-h-96">
      <Banner />
    </main>
  );
}

export const BrandsScrolling = () => {
  const logo = [
    {
      title: "Accer",
      src: "acer.png",
    },
    {
      title: "Adata",
      src: "adata.png",
    },
    {
      title: "Apc",
      src: "apc.png",
    },
    {
      title: "Apple",
      src: "apple.png",
    },
    {
      title: "Asus",
      src: "asus.png",
    },
    {
      title: "Canon",
      src: "canon.png",
    },
    {
      title: "Dahua",
      src: "dahua.png",
    },
    {
      title: "Dell",
      src: "dell.png",
    },
    {
      title: "Epson",
      src: "epson.png",
    },
    {
      title: "Hikvision",
      src: "hikvision.png",
    },
    {
      title: "Hp",
      src: "hp.png",
    },
    {
      title: "Ion",
      src: "ion.png",
    },
    {
      title: "Lelnovo",
      src: "lenovo.png",
    },
    {
      title: "Meki",
      src: "meki.png",
    },
    {
      title: "Microsoft",
      src: "microsoft.png",
    },
    {
      title: "Prolink",
      src: "prolink.png",
    },
  ];

  return (
    <section className="mx-auto w-full px-6 bg-foreground h-36 flex items-center justify-start border-b-1">
      <ScrollingBanner shouldPauseOnHover gap="40px">
        {logo.map((b, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center text-foreground h-20 w-20"
          >
            <Image
              alt={b.title}
              radius="none"
              src={`/images/brands/${b.src}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </ScrollingBanner>
    </section>
  );
};

export const Banner = () => {
  return (
    <section>
      <div className="h-[45rem]">
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
            <Image alt="banner" radius="none" src="/images/banner/banner.png" />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="banner" radius="none" src="/images/banner/banner.png" />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="banner" radius="none" src="/images/banner/banner.png" />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="banner" radius="none" src="/images/banner/banner.png" />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="banner" radius="none" src="/images/banner/banner.png" />
          </SwiperSlide>
        </Swiper>
      </div>
      <BrandsScrolling />
    </section>
  );
};
