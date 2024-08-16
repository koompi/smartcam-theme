"use client";

import Empty from "@/components/globals/Empty";
import WishingListCard from "@/components/globals/WishingListCard";
import { WISHLISTS } from "@/graphql/wishlist";
import { useQuery } from "@apollo/client";
import { Spacer, Spinner } from "@nextui-org/react";
import React from "react";

const WishListPage = () => {
  const { data, loading, refetch, error } = useQuery(WISHLISTS, {
    variables: {
      wishlistType: "FAVORITE",
    },
  });

  return loading ? (
    <Spinner />
  ) : error ? (
    <Empty />
  ) : (
    <div className="p-3 sm:p-3 lg:p-6">
      <h1 className="text-2xl font-bold">
        Wish List ({data?.customerWishlists?.products?.length})
      </h1>
      <Spacer y={6} />
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 place-items-stretch gap-3">
        {data?.customerWishlists?.products?.map((res: any, idx: number) => {
          const {
            thumbnail,
            title,
            desc,
            rating,
            price,
            slug,
            stocks,
            currencyPrice,
            category,
          } = res?.product;

          return (
            <WishingListCard
              key={idx}
              id={res.product.id}
              favorite={res?.favorite}
              compare={res?.compare}
              categoryId={category.id}
              thumbnail={thumbnail}
              title={title}
              desc={desc}
              rating={rating ? rating : 4}
              price={price}
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
              slug={slug}
              stocks={stocks}
              currencyPrice={currencyPrice}
              refetch={refetch}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WishListPage;
