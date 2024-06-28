"use client";

import React from "react";
import Banner from "../components/Banner";
import { products } from "@/data/products";
import ProductCard from "@/components/globals/ProductCard";
import { Spacer } from "@nextui-org/react";

const PromotionPage = () => {
  return (
    <main>
      <Banner />
      <section className="px-6 py-12">
        <h1 className="text-2xl font-semibold">All Promotions</h1>
        <Spacer y={6} />
        <div className="grid grid-cols-5 gap-3">
          {Array.from(
            products.filter((t) => t.discountType),
            (res, idx) => {
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
            }
          )}
        </div>
      </section>
    </main>
  );
};

export default PromotionPage;
