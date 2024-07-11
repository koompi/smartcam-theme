"use client";

import React, { useEffect, useState } from "react";
import OrderCard from "./components/OrderCard";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "@/graphql.bk/orders";
import { OrdersType } from "@/types/checkout";
import { Skeleton } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
// import { PaginationProduct } from "../components/Pagination";

const OrderPage = () => {
  const offset = useSearchParams().get("page") ?? "1";
  const limit = useSearchParams().get("size") ?? "16";
  const query_search = useSearchParams().get("search") ?? null;

  const [page, setPage] = useState(parseInt(offset));

  const { data, loading, refetch } = useQuery(GET_ORDERS, {
    variables: {
      filter: !query_search
        ? {
            limit: parseInt(limit),
            skip: page == 1 ? 0 : page,
            sort: -1,
          }
        : null,
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return (
      <section className="container max-w-full sm:max-w-full lg:max-w-5xl py-9 px-3 sm:px-3 lg:px-6 mx-auto">
        <div className="flex flex-col gap-3 items-center">
          <div className="w-full min-h-36">
            <Skeleton className="rounded-lg">
              <div className="h-36 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <div className="w-full min-h-36">
            <Skeleton className="rounded-lg">
              <div className="h-36 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <div className="w-full min-h-36">
            <Skeleton className="rounded-lg">
              <div className="h-36 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      </section>
    );
  }

  console.log("data", data);

  return (
    <section className="bg-white">
      <div className="container max-w-full sm:max-w-full lg:max-w-5xl py-9 px-3 sm:px-3 lg:px-6 mx-auto">
        <div className="my-6">
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="text-base font-light">
            View your order history and check the delivery status for items.
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center">
          {data?.storeOrders?.orders.length <= 0 && <div>No Orders</div>}
          {data?.storeOrders?.orders.map((order: OrdersType, idx: number) => {
            return (
              <OrderCard
                key={idx}
                {...order}
                // carts={order?.carts}
                // code={order?.code}
                // createdAt={order?.createdAt}
                // id={order?.id}
                // ownerId={order?.ownerId}
                // status={order?.status}
                // tax={order?.tax}
                // totalDiscount={order?.totalDiscount}
                // totalPrice={order?.totalPrice}
                refetch={refetch}
              />
            );
          })}
        </div>
        {/* <div className="w-full flex justify-end mt-8 space-x-2">
        <PaginationProduct
          page={page}
          total={data?.storeOrders?.pages}
          rowsPerPage={parseInt(limit)}
          setPage={setPage}
        />
      </div> */}
      </div>
    </section>
  );
};

export default OrderPage;
