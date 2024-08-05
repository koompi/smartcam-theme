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
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Wish List ({data?.customerWishlists?.products?.length})
      </h1>
      <Spacer y={6} />
      <div className="grid grid-cols-5 place-items-stretch gap-3">
        {data?.customerWishlists?.products?.map((res: any, idx: number) => {
          return (
            <WishingListCard
              key={idx}
              id={res.product.id}
              url={res.url}
              thumbnail={res.product.thumbnail}
              title={res.product.title}
              description={res.product.desc}
              rating={res.rating}
              price={res.product.price}
              discountType={res?.promotion?.discountType}
              promotionPercentage={res?.promotion?.promotionPercentage}
              promotionPrice={res?.promotionPrice}
              totalPrice={res?.promotion?.totalPrice}
              refetch={refetch}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WishListPage;
