"use client";

import React from "react";
import { Button, Divider, Image, Skeleton } from "@nextui-org/react";
import OrderSummaryItem from "./OrderSummaryItem";
import { Toaster } from "sonner";
import { ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";
import Link from "next/link";

export type OrderSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  hideTitle?: boolean;
  orders: Product[];
  loading: boolean;
};

interface Product {
  product: ProductType;
  promotion: PromotionType;
  qty: number;
}

const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  ({ hideTitle, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        <Toaster position="top-center" richColors />
        {!hideTitle && (
          <>
            <h2 className="font-medium text-default-500">Your Order</h2>
            <Divider className="mt-4" />
          </>
        )}
        <h3 className="sr-only">Items in your cart</h3>

        <ul>
          {props.loading ? (
            <div className="max-w-full w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-md w-14 h-14" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
          ) : props?.orders?.length > 0 ? (
            props?.orders?.map((item: Product, idx: number) => (
              <OrderSummaryItem key={idx} {...item} />
            ))
          ) : (
            <section className="grid place-items-center px-6 py-12 sm:py-14 lg:px-8">
              <div className="text-center">
                <div className="flex justify-center items-center">
                  <Image
                    isBlurred
                    radius="none"
                    alt="Empty"
                    src="/images/empty-cart.svg"
                    className="h-12 sm:h-20 lg:h-32"
                  />
                </div>
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Whoops! Your cart is currently empty.
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Browse our amazing selection of products and fill your cart
                  with goodies!
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Button
                    variant="shadow"
                    color="primary"
                    as={Link}
                    href="/"
                    className="text-background"
                  >
                    Go back home
                  </Button>

                  <Button
                    variant="light"
                    color="primary"
                    as={Link}
                    href="/products"
                    endContent={<span aria-hidden="true">&rarr;</span>}
                  >
                    Products
                  </Button>
                </div>
              </div>
            </section>
          )}
        </ul>
      </div>
    );
  }
);

OrderSummary.displayName = "OrderSummary";

export default OrderSummary;
