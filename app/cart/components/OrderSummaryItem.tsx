"use client";

import React from "react";
import { Button, Chip, Image, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
// import { CartItem } from "@/types/global";
import { useCart } from "@/context/useCart";
// import { formatToUSD } from "@/utils/usd";
import { ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";

interface Product {
  product: ProductType;
  promotion: PromotionType;
  qty: number;
}
export type OrderSummaryItemProps = React.HTMLAttributes<HTMLLIElement> &
  Product;

const OrderSummaryItem = React.forwardRef<HTMLLIElement, OrderSummaryItemProps>(
  ({ children, product, promotion, qty, className, ...props }, ref) => {
    const { addToCart, minusCart, removeFromCart } = useCart();

    return (
      <li
        ref={ref}
        className={cn(
          "flex items-center gap-x-4 border-b-small border-divider py-4",
          className
        )}
        {...props}
      >
        {/* {productId} */}
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
          <Image
            alt={product?.title}
            src={
              product?.thumbnail
                ? `${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${product?.thumbnail}`
                : "/images/default-thumbnail.png"
            }
            isZoomed
            isBlurred
            className="h-full w-full"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h4 className="text-small">
            <Link
              className="font-medium text-black line-clamp-1"
              href="#"
              underline="hover"
            >
              {product?.title || children}
            </Link>
          </h4>

          <div className="mt-2 flex items-center gap-2">
            {promotion.discount ? (
              <div className="space-x-2 flex items-center">
                {/* <div className="font-bold">
                  <div className="line-through text-sm">
                    ${promotion.discount.originalPrice.toFixed(2)}
                  </div>
                  <div>${(promotion?.discount.originalPrice).toFixed(2)}</div>
                </div> */}
                <div className="font-bold">
                  <div className="line-through text-sm text-danger">
                    ${(promotion?.discount.originalPrice * qty).toFixed(2)}
                    {/* <span className="text-danger"> x {qty}</span> */}
                  </div>
                  <div>
                    ${(promotion?.discount.totalDiscount * qty).toFixed(2)} x (
                    {qty} QTY)
                  </div>
                  {/* <div className="text-danger">
                    ${product?.price.toFixed(2)}
                  </div> */}
                </div>
              </div>
            ) : (
              <div>
                {product?.price.toFixed(2)}
                <span className="text-danger"> x {qty}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2 mt-2">
            {product?.promotion &&
              (promotion?.discount.discountType == "PERCENTAGE" ? (
                <Chip radius="sm" size="sm" variant="flat" color="danger">
                  {promotion?.discount.discountPercentage}%
                </Chip>
              ) : (
                <Chip radius="sm" size="sm" variant="flat" color="danger">
                  ${promotion?.discount.discountPrice}
                </Chip>
              ))}
            {/* {product?.variant?.attributes.map((atr, idx: number) => {
              return (
                <Chip
                  radius="sm"
                  size="sm"
                  variant="flat"
                  color="secondary"
                  key={idx}
                >
                  {atr.option}
                </Chip>
              );
            })} */}
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            isIconOnly
            className="h-6 w-6 min-w-[1.5rem]"
            radius="full"
            variant="flat"
            isDisabled={qty <= 1}
            onPress={() => minusCart(product?.id)}
          >
            <Icon icon="lucide:minus" width={14} />
          </Button>
          <Button
            isIconOnly
            className="h-6 w-6 min-w-[1.5rem]"
            radius="full"
            variant="flat"
            color="success"
            onPress={() => addToCart(product?.id)}
          >
            <Icon icon="lucide:plus" width={14} />
          </Button>
          <Button
            isIconOnly
            className="h-6 w-6 min-w-[1.5rem]"
            radius="full"
            variant="flat"
            color="danger"
            onPress={() => {
              removeFromCart(product?.id);
            }}
          >
            <Icon icon="lucide:x" width={14} />
          </Button>
        </div>
      </li>
    );
  }
);

OrderSummaryItem.displayName = "OrderSummaryItem";

export default OrderSummaryItem;
