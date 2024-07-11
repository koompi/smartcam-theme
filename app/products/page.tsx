"use client";

import React from "react";
import ProductCard from "@/components/globals/ProductCard";
import { products } from "@/data/products";
import ecommerceItems from "@/components/CustomComponent/EcommerceItems";
import FiltersWrapper from "@/components/CustomComponent/FilterWrapper";
import SidebarDrawer from "@/components/CustomComponent/SidebarDrawer";
import PromotionCard from "../components/PromotionCard";

const ProductPage = () => {
  return (
    <main>
      <PromotionCard />
      <section className="flex gap-6 px-6 pb-12">
        <SidebarDrawer className="w-[27rem]">
          <FiltersWrapper
            className="bg-white sticky top-20"
            items={ecommerceItems}
            scrollShadowClassName="pb-12"
            showActions={false}
            title="Filter by"
          />
        </SidebarDrawer>
        <section className="w-full">
          <div className="grid grid-cols-4 place-items-stretch gap-3">
            {Array.from(products.slice(0, 12), (res, idx) => {
              return (
                <ProductCard
                  key={idx}
                  url={res.url}
                  thumbnail={res.thumbnail}
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
      </section>
    </main>
  );
};

export default ProductPage;
