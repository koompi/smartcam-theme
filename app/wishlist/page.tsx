"use client";

import WishingListCard from "@/components/globals/WishingListCard";
import { products } from "@/data/products";
import { Spacer } from "@nextui-org/react";
import React from "react";

const WishListPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Wish List ({products.length})</h1>
      <Spacer y={6} />
      <div className="grid grid-cols-5 place-items-stretch gap-3">
        {Array.from(products, (res, idx) => {
          return (
            <WishingListCard
              key={idx}
              url={res.url}
              thumbnail={`/images/products/${res.thumbnail}`}
              title={res.title}
              description={undefined}
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
    </div>
  );
};

export default WishListPage;
