"use client";

import { Card, CardBody, Image, Spacer } from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProductCardImageOnly from "@/components/globals/ProductCardImageOnly";

export const Promotion = () => {
  const promotion = [
    {
      src: "apple-m3-black.png",
      original_price: 1850,
      promotion_price: 1800,
      off: 10,
      isGroup: true,
      url: "#",
    },
    {
      src: "apple-m3-gray.png",
      original_price: 1850,
      promotion_price: 1800,
      off: 10,
      isGroup: true,
      url: "#",
    },
    {
      src: "apple-m3-black2.png",
      original_price: 1850,
      promotion_price: 1800,
      off: 10,
      isGroup: true,
      url: "#",
    },
  ];

  return (
    <section className="py-9 bg-foreground">
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
                  href="#"
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
                    src="apple-m3-black.png"
                    orginal_price={1890}
                    promotion_price={1800}
                    off={10}
                    isGroup={false}
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
              <div className="rounded-2xl bg-foreground p-3 h-full flex flex-col justify-center">
                <Link href="#">
                  <ProductCardImageOnly
                    src="imac.png"
                    orginal_price={1890}
                    promotion_price={1700}
                    off={15}
                    isGroup={false}
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
                  {promotion.map((res, idx) => {
                    return (
                      <Link href={res.url} key={idx}>
                        <ProductCardImageOnly
                          src={res.src}
                          orginal_price={res.original_price}
                          promotion_price={res.promotion_price}
                          off={res.off}
                          isGroup={res.isGroup}
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
                  {promotion.map((res, idx) => {
                    return (
                      <Link href={res.url} key={idx}>
                        <ProductCardImageOnly
                          src={res.src}
                          orginal_price={res.original_price}
                          promotion_price={res.promotion_price}
                          off={res.off}
                          isGroup={res.isGroup}
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
