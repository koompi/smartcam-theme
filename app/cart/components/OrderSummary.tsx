"use client";

import React from "react";
import { Button, Divider, Image } from "@nextui-org/react";
import OrderSummaryItem from "./OrderSummaryItem";
// import { useCart } from "@/context/useCart";
import { Toaster } from "sonner";
// import { useQuery } from "@apollo/client";
// import { ESTIMATION_PRICE } from "@/graphql/order";
import { ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";

interface OrderCart {
  product: ProductType;
  promotion: PromotionType;
  qty: number;
}

export type OrderSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  hideTitle?: boolean;
  orders?: any;
};

interface Product {
  product: ProductType;
  promotion: PromotionType;
  qty: number;
}

const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  ({ hideTitle, ...props }, ref) => {
    // const { cartItems, membershipId } = useCart();

    // const { data: orders, loading } = useQuery(ESTIMATION_PRICE, {
    //   variables: {
    //     input: [...cartItems],
    //     membershipId: membershipId,
    //   },
    // });

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
          {props?.orders?.map((item: Product, idx: number) => (
            <OrderSummaryItem key={idx} {...item} />
          ))}
        </ul>
      </div>
    );
  }
);

OrderSummary.displayName = "OrderSummary";

export default OrderSummary;
