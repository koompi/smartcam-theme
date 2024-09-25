"use client";

import React from "react";
import { Divider, Image, Skeleton } from "@nextui-org/react";
import OrderSummaryItem from "./OrderSummaryItem";
import { Toaster } from "sonner";
import { ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";

export type OrderSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  hideTitle?: boolean;
  orders: Product[];
  loading: boolean;
};

interface Product {
  product: ProductType;
  promotion: PromotionType;
  qty: number;
  slug: string;
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
            props?.orders
              ?.slice()
              ?.reverse()
              ?.map((item: Product, idx: number) => (
                <OrderSummaryItem key={idx} {...item} />
              ))
          ) : (
            <div className="flex flex-col gap-3 justify-center items-center">
              <Image
                isBlurred
                radius="none"
                alt="Empty"
                src="/images/empty-cart.svg"
                className="h-12 sm:h-20 lg:h-32"
              />
              <p className="font-semibold text-xl text-center">Emtpy Cart</p>
            </div>
          )}
        </ul>
      </div>
    );
  }
);

OrderSummary.displayName = "OrderSummary";

export default OrderSummary;
