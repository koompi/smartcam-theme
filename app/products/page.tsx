"use client";

import React from "react";
import ProductCard from "@/components/globals/ProductCard";
// import { products } from "@/data/products";
import ecommerceItems from "@/components/CustomComponent/EcommerceItems";
import FiltersWrapper from "@/components/CustomComponent/FilterWrapper";
import SidebarDrawer from "@/components/CustomComponent/SidebarDrawer";
import PromotionCard from "../components/PromotionCard";
import { CATEGORIES } from "@/graphql/category";
import { GLOBAL_PRODUCT_FILTERING } from "@/graphql/product";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { Loading } from "@/components/globals/Loading";
import { ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";

interface ProductProps {
  product: ProductType;
  promotion: PromotionType;
}

const ProductPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || null;
  const cat = searchParams.get("category") || null;
  const sub = searchParams.get("sub_category") || null;
  const page = (searchParams.get("page") as string) || "1";
  const size = (searchParams.get("size") as string) || "16";
  const minPice = (searchParams.get("min_price") as string) || null;
  const maxPice = (searchParams.get("max_price") as string) || null;
  const sortParam = (searchParams.get("sort") as string) || null;
  const price =
    ["price_low_to_high", "price_high_to_low"].includes(sortParam as string) ||
    null;

  const brands = searchParams.get("brands") || null;

  let skip =
    parseInt(page as string) > 1
      ? (parseInt(size as string) / 2) * parseInt(page as string) + 1
      : 0;
  let limit = parseInt(size as string);
  let rangePrice = minPice
    ? {
        start: parseInt(minPice as string),
        end: parseInt(maxPice as string),
      }
    : null;

  const { data: products, loading: loadingProduct } = useQuery(
    GLOBAL_PRODUCT_FILTERING,
    {
      variables: {
        tagId: brands
          ? cat
            ? sub
              ? [...brands?.split(","), cat, sub]
              : [...brands?.split(","), cat]
            : [...brands?.split(",")]
          : cat
          ? sub
            ? [sub]
            : [cat]
          : search
          ? []
          : null,
        keyword: search ? search : search,
        status: price ? "price" : null,
        range: rangePrice,
        filter: {
          limit: limit,
          skip: skip,
          sort: price ? (sortParam == "price_low_to_high" ? 1 : -1) : -1,
        },
      },
    }
  );

  // const { data: categories } = useQuery(CATEGORIES, {
  //   variables: {
  //     filter: null,
  //   },
  // });

  if (loadingProduct || !products) {
    return <Loading />;
  }

  console.log("prod", products.storeGlobalFilterProducts?.products);

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
            {Array.from(
              products?.storeGlobalFilterProducts?.products,
              (res: ProductProps, idx) => {
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
                        discountPercentage:
                          res.promotion?.discount?.discountPercentage,
                        discountPrice: res.promotion?.discount?.discountPrice,
                        discountType: res.promotion?.discount?.discountType,
                        originalPrice: res.promotion?.discount?.originalPrice,
                        totalDiscount: res.promotion?.discount?.totalDiscount,
                      },
                    }}
                  />
                );
              }
            )}
          </div>
        </section>
      </section>
    </main>
  );
};

export default ProductPage;
