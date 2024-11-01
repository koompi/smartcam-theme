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
import { AddCart } from "@/types/global";

interface Product {
  product: ProductType;
  promotion: PromotionType;
  qty: number;
  slug: string;
}

export type OrderSummaryItemProps = React.HTMLAttributes<HTMLLIElement> &
  Product;

const OrderSummaryItem = React.forwardRef<HTMLLIElement, OrderSummaryItemProps>(
  ({ children, product, promotion, qty, className, ...props }, ref) => {
    const { addToCart, minusCart, removeFromCart } = useCart();

    const cart: AddCart = {
      product_id: product?.id,
      variant_id: null,
    };

    return (
      <li
        ref={ref}
        className={cn(
          "grid grid-cols-12 gap-3 items-center border-b-small border-divider py-6 sm:py-6 lg:py-1 px-3 my-1 bg-white border rounded-xl relative",
          className
        )}
        {...props}
      >
        <Button
          isIconOnly
          className="h-6 w-6 min-w-[1.5rem] absolute right-1 top-1 z-20"
          radius="full"
          variant="flat"
          color="danger"
          onPress={() => {
            removeFromCart(product?.id);
          }}
        >
          <Icon icon="solar:trash-bin-2-linear" width={14} />
        </Button>
        <div className="col-span-3 sm:col-span-3 lg:col-span-2 flex flex-shrink-0 items-center justify-center">
          <Image
            alt={product?.title}
            src={
              product?.thumbnail
                ? `${process.env.NEXT_PUBLIC_S3}/${product?.thumbnail}`
                : "/images/default-thumbnail.png"
            }
            isZoomed
            isBlurred
            radius="lg"
            className="h-20 sm:h-20 lg:h-36 w-20 sm:w-20 lg:w-36 object-contain object-center bg-white"
          />
        </div>
        <div className="col-span-9 sm:col-span-10 lg:col-span-7 flex flex-1 flex-col">
          <Link href={`/products/${product?.slug}`} underline="hover">
            <span className="font-medium text-primary-900 text-sm sm:text-sm lg:text-lg line-clamp-2">
              {product?.title || children}
            </span>
          </Link>

          <div className="mt-2 flex items-center gap-2">
            {promotion?.discount ? (
              <div className="space-x-2 flex items-center">
                <div className="line-through text-sm text-danger">
                  ${(promotion?.discount.originalPrice * qty).toFixed(2)}
                </div>
                <div>
                  ${(promotion?.discount.totalDiscount * qty).toFixed(2)}
                </div>
              </div>
            ) : (
              <div>{product?.price.toFixed(2)}</div>
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
          </div>
        </div>

        {/* large devices */}
        <div className="col-span-3 hidden sm:hidden lg:flex justify-end items-end gap-3">
          <Button
            isIconOnly
            className="h-6 w-6 min-w-[1.5rem]"
            radius="full"
            variant="flat"
            isDisabled={qty <= 1}
            onPress={() => minusCart(cart?.product_id)}
          >
            <Icon icon="lucide:minus" width={14} />
          </Button>
          <p className="font-semibold">{qty}</p>
          <Button
            isIconOnly
            className="h-6 w-6 min-w-[1.5rem]"
            radius="full"
            variant="flat"
            color="success"
            onPress={() => addToCart(cart)}
          >
            <Icon icon="lucide:plus" width={14} />
          </Button>
        </div>

        {/* small devices */}
        <div className="col-span-12 flex sm:flex lg:hidden justify-end items-end gap-3">
          <Button
            isIconOnly
            className="h-6 w-6 min-w-[1.5rem]"
            radius="full"
            variant="flat"
            isDisabled={qty <= 1}
            onPress={() => minusCart(cart?.product_id)}
          >
            <Icon icon="lucide:minus" width={14} />
          </Button>
          <p className="font-semibold">{qty}</p>
          <Button
            isIconOnly
            className="h-6 w-6 min-w-[1.5rem]"
            radius="full"
            variant="flat"
            color="success"
            onPress={() => addToCart(cart)}
          >
            <Icon icon="lucide:plus" width={14} />
          </Button>
        </div>
      </li>
    );
  }
);

OrderSummaryItem.displayName = "OrderSummaryItem";

export default OrderSummaryItem;
