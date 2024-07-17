"use client";

import { Button, Card, Spacer, Image } from "@nextui-org/react";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

const PromotionCard = () => {
  return (
    <section className="p-6 hidden sm:hidden lg:block">
      <Card
        shadow="none"
        className="rounded-3xl text-black bg-primary/5 grid grid-cols-12 place-items-center p-6 gap-3"
      >
        <div className="col-span-4">
          <div className="flex items-center gap-3">
            <h1 className="text-5xl font-bold">Limited Promotions</h1>
            <Icon
              icon="solar:fire-bold"
              fontSize={60}
              className="text-danger"
            />
          </div>
          <p className="text-lg font-semibold">New promotions up to 50% OFF</p>
          <Spacer y={12} />
          <Button
            size="lg"
            variant="shadow"
            as={Link}
            href="/promotions"
            color="primary"
            radius="full"
            className="px-12"
            endContent={<Icon icon="solar:arrow-right-linear" fontSize={18} />}
          >
            Get Now
          </Button>
        </div>
        <div className="col-span-8 bg-white w-full h-full rounded-2xl">
          <div className="h-[30rem]">
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
              className="rounded-2xl"
            >
              <SwiperSlide>
                <Image
                  alt="banner"
                  radius="none"
                  src="/images/banner/banner.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  alt="banner"
                  radius="none"
                  src="/images/banner/banner2.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  alt="banner"
                  radius="none"
                  src="/images/banner/banner3.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  alt="banner"
                  radius="none"
                  src="/images/banner/banner4.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  alt="banner"
                  radius="none"
                  src="/images/banner/banner5.jpg"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default PromotionCard;
