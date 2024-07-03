"use client";

import React from "react";
import { Divider } from "@nextui-org/react";
import OrderSummaryItem from "./OrderSummaryItem";
// import { useCart } from "@/context/useCart";
import { Toaster } from "sonner";

export type OrderSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  hideTitle?: boolean;
};

const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  ({ hideTitle, ...props }, ref) => {
    // const { cartItems } = useCart();

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
          {/* {cartItems?.map((item, idx: number) => (
            <OrderSummaryItem key={idx} {...item} />
          ))} */}
        </ul>
      </div>
    );
  }
);

OrderSummary.displayName = "OrderSummary";

export default OrderSummary;
