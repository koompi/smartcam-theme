"use client";

import React, { FC, ReactNode } from "react";
import PromotionCard from "../components/PromotionCard";
import FiltersWrapper from "@/components/CustomComponent/FilterWrapper";
import ecommerceItems from "@/components/CustomComponent/EcommerceItems";
import SidebarDrawer from "@/components/CustomComponent/SidebarDrawer";

interface Props {
  children: ReactNode;
}

const ProductLayout: FC<Props> = ({ children }) => {
  return (
    <main>
      <PromotionCard />
      <section className="flex gap-6 px-6 pb-12">
        <SidebarDrawer className="w-[27rem]">
          <FiltersWrapper
            className="bg-foreground sticky top-20"
            items={ecommerceItems}
            scrollShadowClassName="pb-12"
            showActions={false}
            title="Filter by"
          />
        </SidebarDrawer>
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
};

export default ProductLayout;
