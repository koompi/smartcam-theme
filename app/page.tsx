"use client";
import React from "react";

import { Image } from "@nextui-org/react";
import { Promotion } from "./components/Promotion";
import ScrollingBanner from "@/components/CustomComponent/ScrollingBrandsBanner";
import SectionListProducts from "./components/SectionListProducts";
import ProductCard from "@/components/globals/ProductCard";
import { products } from "@/data/products";
import Banner from "./components/Banner";

export default function Home() {
  return (
    <main className="min-h-96">
      <Banner />
      <BrandsScrolling />
      <Promotion />
      {/* most popular */}
      <SectionListProducts title="Most Popular">
        <div className="grid grid-cols-5 place-items-stretch gap-3">
          {Array.from(products.slice(0, 5), (res, idx) => {
            return (
              <ProductCard
                key={idx}
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
            );
          })}
        </div>
      </SectionListProducts>
      {/* new arrival */}
      <SectionListProducts title="New Arrival">
        <div className="grid grid-cols-5 place-items-stretch gap-3">
          {Array.from(products.slice(0, 5), (res, idx) => {
            return (
              <ProductCard
                key={idx}
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
            );
          })}
        </div>
      </SectionListProducts>
      {/* recommended */}
      <SectionListProducts title="Recommended">
        <div className="grid grid-cols-5 place-items-stretch gap-3">
          {Array.from(products.slice(0, 5), (res, idx) => {
            return (
              <ProductCard
                key={idx}
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
            );
          })}
        </div>
      </SectionListProducts>
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
    <section className="mx-auto w-full bg-foreground h-36 flex items-center justify-start">
      <ScrollingBanner shouldPauseOnHover gap="40px">
        {logo.map((b, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center text-foreground w-20"
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
