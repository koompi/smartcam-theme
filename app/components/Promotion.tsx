"use client";

import { Card, CardBody, Image, Spacer } from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProductCardImageOnly from "@/components/globals/ProductCardImageOnly";
import { Loading } from "@/components/globals/Loading";
import {
  PROMOTIONS_BY_SPECIAL_SAVING,
  PROMOTIONS_BY_TYPE,
} from "@/graphql/product";
import { useQuery } from "@apollo/client";
import { ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCube, Pagination } from "swiper/modules";

interface ProductProps {
  product: ProductType;
  promotion: PromotionType;
}

export const Promotion = () => {
  const { data, loading: promotionLoading } = useQuery(PROMOTIONS_BY_TYPE, {
    variables: { promotionStatus: "NORMAL" },
  });

  const { data: saving, loading: loadingSaving } = useQuery(
    PROMOTIONS_BY_SPECIAL_SAVING
  );

  if (promotionLoading || loadingSaving) {
    return <Loading />;
  } else if (data.promotionSpecialOffer.products.length <= 0) {
    return null;
  }

  return (
    <section className="hidden sm:hidden lg:block py-9 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-6 place-items-stretch">
          <div className="col-span-3 flex flex-col gap-6">
            <Card shadow="none" className="rounded-3xl p-6 bg-background h-52">
              <CardBody>
                <h1 className="text-2xl font-semibold text-black">
                  Special Offers
                </h1>
                <p className="text-gray-600">Enjoy your exclusive price</p>
                <Link
                  href="/promotions"
                  className="text-primary flex items-center gap-1 hover:underline absolute bottom-0"
                >
                  See more
                  <Icon icon="solar:arrow-right-linear" fontSize={15} />
                </Link>
              </CardBody>
            </Card>
            {data.promotionSpecialOffer.products.length > 0 && (
              <Card
                shadow="none"
                className="rounded-3xl p-6 bg-background h-full"
              >
                <CardBody>
                  <h1 className="text-2xl font-semibold text-black">
                    Newcomer Discount
                  </h1>
                  <p className="text-gray-600">Your exclusive price</p>
                  <div className="rounded-2xl p-6 bg-white h-full flex flex-col justify-center">
                    <Swiper
                      effect={"cube"}
                      grabCursor={true}
                      cubeEffect={{
                        shadow: false,
                        slideShadows: false,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                      }}
                      loop={true}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      pagination={false}
                      modules={[EffectCube, Autoplay]}
                    >
                      {data.promotionSpecialOffer.products.map(
                        (res: ProductProps, idx: number) => {
                          return (
                            <SwiperSlide key={idx}>
                              <Link href={`/products/${res.product?.slug}`}>
                                <ProductCardImageOnly
                                  {...res}
                                  isGroup={false}
                                />
                              </Link>
                            </SwiperSlide>
                          );
                        }
                      )}
                    </Swiper>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
          {saving.specialSaving.products?.length > 0 && (
            <Card
              shadow="none"
              className="col-span-4 rounded-3xl p-6 bg-danger/5 h-full"
            >
              <CardBody>
                <h1 className="text-2xl font-semibold text-black">
                  Special Savings
                </h1>
                <Spacer y={6} />
                <div className="rounded-2xl bg-white p-3 h-full flex flex-col justify-center">
                  <Swiper
                    effect={"cube"}
                    grabCursor={true}
                    cubeEffect={{
                      shadow: false,
                      slideShadows: true,
                      shadowOffset: 20,
                      shadowScale: 0.94,
                    }}
                    loop={true}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    pagination={false}
                    modules={[EffectCube, Autoplay]}
                  >
                    {saving.specialSaving.products.map(
                      (res: ProductProps, idx: number) => {
                        return (
                          <SwiperSlide key={idx}>
                            <Link href={`/products/${res.product?.slug}`}>
                              <ProductCardImageOnly {...res} isGroup={false} />
                            </Link>
                          </SwiperSlide>
                        );
                      }
                    )}
                  </Swiper>
                </div>
              </CardBody>
            </Card>
          )}

          <div className="col-span-5 flex flex-col gap-3">
            {/* limited time offer  */}
            {data.promotionSpecialOffer.products.filter(
              (t: any) =>
                t.promotion.discount?.promotionStatus === "LIMITED_TIME"
            ).length > 0 && (
              <Card shadow="none" className="rounded-3xl p-6 bg-background">
                <CardBody>
                  <h1 className="text-2xl font-semibold text-black">
                    Limited Time Offer
                  </h1>
                  <p className="text-gray-600">Expired 30days</p>
                  <div className="grid grid-cols-3 items-stretch">
                    {data.promotionSpecialOffer.products
                      .filter(
                        (t: any) =>
                          t.promotion.discount?.promotionStatus ===
                          "LIMITED_TIME"
                      )
                      .slice(0, 3)
                      .map((res: ProductProps, idx: number) => {
                        return (
                          <Link
                            href={`/products/${res.product?.slug}`}
                            key={idx}
                          >
                            <ProductCardImageOnly {...res} isGroup={true} />
                          </Link>
                        );
                      })}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* up coming promotion */}
            {data.promotionSpecialOffer.products.filter(
              (t: any) => t.promotion.discount?.promotionStatus === "UP_COMING"
            ).length > 0 && (
              <Card shadow="none" className="rounded-3xl p-6 bg-background">
                <CardBody>
                  <h1 className="text-2xl font-semibold text-black">New</h1>
                  <p className="text-gray-600">Up coming promotion</p>
                  <div className="grid grid-cols-3 items-stretch">
                    {data.promotionSpecialOffer.products
                      .filter(
                        (t: any) =>
                          t.promotion.discount?.promotionStatus === "UP_COMING"
                      )
                      .slice(0, 3)
                      .map((res: ProductProps, idx: number) => {
                        return (
                          <Link
                            href={`/products/${res.product?.slug}`}
                            key={idx}
                          >
                            <ProductCardImageOnly {...res} isGroup={true} />
                          </Link>
                        );
                      })}
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
