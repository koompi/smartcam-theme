"use client";

import React from "react";
import Banner from "../components/Banner";
// import { products } from "@/data/products";
import ProductCard from "@/components/globals/ProductCard";
import { Spacer } from "@nextui-org/react";
import { PROMOTIONS } from "@/graphql/product";
import { useQuery } from "@apollo/client";
import { ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";
import Empty from "@/components/globals/Empty";
import { Loading } from "@/components/globals/Loading";

interface ProductProps {
  totalDiscount: number;
  originalPrice: number;
  discountType: "PRICE" | "PERCENTAGE" | undefined;
  promotionPrice: number;
  promotionPercentage: number | undefined;
  product: ProductType;
  promotion: PromotionType;
}

const PromotionPage = () => {
  const { data, loading: promotionLoading } = useQuery(PROMOTIONS);

  if (promotionLoading || !data) {
    return <Loading />;
  }

  return (
    <main>
      <Banner />
      <section className="px-3 sm:px-3 lg:px-6 py-6 sm:py-6 lg:py-12">
        <h1 className="text-lg sm:text-lg lg:text-2xl font-semibold">
          All Promotions
        </h1>
        <Spacer y={6} />
        {data.normalPromotions.length <= 0 && <Empty />}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {Array.from(data.normalPromotions, (res: ProductProps, idx) => {
            const { thumbnail, title, desc, rating, price, id, slug } =
              res?.product;

            return (
              <ProductCard
                key={idx}
                id={id}
                thumbnail={thumbnail}
                title={title}
                desc={desc}
                rating={rating}
                price={price}
                slug={slug}
                promotion={{
                  isMembership: res.promotion?.isMembership,
                  discount: {
                    discountPercentage: res?.promotionPercentage,
                    discountPrice: res?.promotionPrice,
                    discountType: res?.discountType,
                    originalPrice: res?.originalPrice,
                    totalDiscount: res?.totalDiscount,
                  },
                }}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default PromotionPage;
