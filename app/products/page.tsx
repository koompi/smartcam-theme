"use client";

import React from "react";
import ProductCard from "@/components/globals/ProductCard";
import { products } from "@/data/products";

const ProductPage = () => {
  return (
    <section>
      <div className="grid grid-cols-5 place-items-stretch gap-3">
        {Array.from(products, (res, idx) => {
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
    </section>
  );
};

export default ProductPage;
