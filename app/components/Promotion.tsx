"use client";

import { Card, CardBody, Image, Spacer } from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProductCardImageOnly from "@/components/globals/ProductCardImageOnly";
import { Loading } from "@/components/globals/Loading";
import { PROMOTIONS } from "@/graphql/product";
import { useQuery } from "@apollo/client";

export const Promotion = () => {
  const { data, loading: promotionLoading } = useQuery(PROMOTIONS);

  if (promotionLoading) {
    return <Loading />;
  } else if (data.normalPromotions.length <= 0) {
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
            <Card
              shadow="none"
              className="rounded-3xl p-6 bg-background h-full"
            >
              <CardBody>
                <h1 className="text-2xl font-semibold text-black">
                  Newcomer Discount
                </h1>
                <p className="text-gray-600">Your exclusive price</p>
                <Link href="#">
                  <ProductCardImageOnly
                    src={data.normalPromotions[0]?.product?.thumbnail}
                    orginal_price={data.normalPromotions[0]?.originalPrice}
                    promotion_price={data.normalPromotions[0]?.promotionPrice}
                    off={10}
                    isGroup={false}
                    promotion_percentage={
                      data.normalPromotions[0]?.promotionPercentage
                    }
                    discountType={data.normalPromotions[0]?.discountType}
                  />
                </Link>
              </CardBody>
            </Card>
          </div>
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
                <Link href="#">
                  <ProductCardImageOnly
                    src={data.normalPromotions[3]?.product?.thumbnail}
                    orginal_price={data.normalPromotions[3]?.originalPrice}
                    promotion_price={data.normalPromotions[3]?.promotionPrice}
                    off={10}
                    isGroup={false}
                    promotion_percentage={
                      data.normalPromotions[3]?.promotionPercentage
                    }
                    discountType={data.normalPromotions[3]?.discountType}
                  />
                </Link>
              </div>
            </CardBody>
          </Card>
          <div className="col-span-5 flex flex-col gap-3">
            <Card shadow="none" className="rounded-3xl p-6 bg-background">
              <CardBody>
                <h1 className="text-2xl font-semibold text-black">
                  Limited Time Offer
                </h1>
                <p className="text-gray-600">Expired 30days</p>
                <div className="grid grid-cols-3 items-stretch">
                  {data.normalPromotions
                    .slice(0, 3)
                    .map((res: any, idx: number) => {
                      const {
                        originalPrice,
                        promotionPrice,
                        discountType,
                        promotionPercentage,
                        product,
                      } = res && res;

                      return (
                        <Link href="#" key={idx}>
                          <ProductCardImageOnly
                            src={product.thumbnail}
                            orginal_price={originalPrice}
                            promotion_price={promotionPrice}
                            promotion_percentage={promotionPercentage}
                            isGroup={res.isGroup}
                            discountType={discountType}
                            off={0}
                          />
                        </Link>
                      );
                    })}
                </div>
              </CardBody>
            </Card>
            <Card shadow="none" className="rounded-3xl p-6 bg-background">
              <CardBody>
                <h1 className="text-2xl font-semibold text-black">New</h1>
                <p className="text-gray-600">New promotion</p>
                <div className="grid grid-cols-3 items-stretch">
                  {data.normalPromotions
                    .slice(1, 4)
                    .map((res: any, idx: number) => {
                      const {
                        originalPrice,
                        promotionPrice,
                        discountType,
                        promotionPercentage,
                        product,
                      } = res && res;

                      return (
                        <Link href="#" key={idx}>
                          <ProductCardImageOnly
                            src={product.thumbnail}
                            orginal_price={originalPrice}
                            promotion_price={promotionPrice}
                            promotion_percentage={promotionPercentage}
                            isGroup={res.isGroup}
                            discountType={discountType}
                            off={0}
                          />
                        </Link>
                      );
                    })}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
