"use client";

import React, { useEffect } from "react";
import OrderCard from "./components/OrderCard";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "@/graphql/orders";
import { OrdersType } from "@/types/checkout";
import { Skeleton } from "@nextui-org/react";
// import { useSearchParams } from "next/navigation";
// import { PaginationProduct } from "../components/Pagination";

const OrderPage = () => {
  // const query_search = useSearchParams().get("search") ?? null;

  const { data, loading, refetch } = useQuery(GET_ORDERS);

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
          {data?.customerOrders?.orders.length <= 0 && <div>No Orders</div>}
          {data?.customerOrders?.orders
            ?.slice() // Create a shallow copy of the orders array
            .sort((a: OrdersType, b: OrdersType) => {
              // Normalize the date string by removing the trailing ":00"
              const normalizedDateA = a.createdAt.replace(" +00:00:00", "Z");
              const normalizedDateB = b.createdAt.replace(" +00:00:00", "Z");

              // Parse the normalized date strings into Date objects
              const dateA = new Date(normalizedDateA).getTime();
              const dateB = new Date(normalizedDateB).getTime();

              return dateB - dateA; // Sort in descending order (latest date first)
            })
            ?.map((order: OrdersType, idx: number) => {
              return <OrderCard key={idx} {...order} refetch={refetch} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
