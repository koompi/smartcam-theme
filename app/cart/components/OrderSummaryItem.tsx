"use client";

import React from "react";
import { Button, Chip, Image, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
// import { CartItem } from "@/types/global";
// import { useCart } from "@/context/useCart";
import { formatToUSD } from "@/utils/formatUSD";

// CartItem
export type OrderSummaryItemProps = React.HTMLAttributes<HTMLLIElement> & any;

const OrderSummaryItem = React.forwardRef<HTMLLIElement, OrderSummaryItemProps>(
  ({ children, quantity, product, className, ...props }, ref) => {
    // const { addToCart, minusCart, removeFromCart } = useCart();

    return (
      <li
        ref={ref}
        className={cn(
          "flex items-center gap-x-4 border-b-small border-divider py-4",
          className
        )}
        {...props}
      >
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
          <Image
            alt={product?.name}
            src={`${
              process.env.NEXT_PUBLIC_DRIVE ??
              "https://drive.backend.riverbase.org"
            }/api/drive?hash=${product?.preview}`}
            isZoomed
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h4 className="text-small">
            <Link
              className="font-medium text-foreground line-clamp-1"
              href="#"
              underline="hover"
            >
              {product?.name || children}
            </Link>
          </h4>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-small font-semibold text-default-700">
              {formatToUSD(product?.price)}
            </span>
            <span className="text-small text-danger">x {quantity}</span>
          </div>

          <div className="flex space-x-2 mt-2">
            {!product.variant?.id && (
              <Chip radius="sm" size="sm" variant="flat" color="secondary">
                Default
              </Chip>
            )}
            {product?.variant?.attributes.map((atr, idx: number) => {
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
            })}
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            isIconOnly
            className="h-6 w-6 min-w-[1.5rem]"
            radius="full"
            variant="flat"
            isDisabled={quantity <= 1}
            // onPress={() => minusCart(product)}
          >
            <Icon icon="lucide:minus" width={14} />
          </Button>
          <Button
            isIconOnly
            className="h-6 w-6 min-w-[1.5rem]"
            radius="full"
            variant="flat"
            color="success"
            // onPress={() => addToCart(product)}
          >
            <Icon icon="lucide:plus" width={14} />
          </Button>
          <Button
            isIconOnly
            className="h-6 w-6 min-w-[1.5rem]"
            radius="full"
            variant="flat"
            color="danger"
            // onPress={() => {
            //   removeFromCart(product.id);
            // }}
          >
            <Icon icon="lucide:x" width={14} />
          </Button>
        </div>
        {/* <div className="flex gap-3">
          <Tooltip content="Minus" placement="top">
            <Button
              isIconOnly
              className="h-6 w-6 min-w-[1.5rem]"
              radius="full"
              variant="flat"
              isDisabled={quantity <= 1}
              onPress={() =>
                minusCart(product, product.variant?.id != "1" ? true : false)
              }
            >
              <Icon icon="lucide:minus" width={14} />
            </Button>
          </Tooltip>
          <Tooltip content="Add" placement="top">
            <Button
              isIconOnly
              className="h-6 w-6 min-w-[1.5rem]"
              radius="full"
              variant="flat"
              color="success"
              onPress={() =>
                addToCart(product, product.variant?.id ? true : false)
              }
            >
              <Icon icon="lucide:plus" width={14} />
            </Button>
          </Tooltip>
          <Tooltip content="Remove" placement="top">
            <Button
              isIconOnly
              className="h-6 w-6 min-w-[1.5rem]"
              radius="full"
              variant="flat"
              color="danger"
              onPress={() => {
                removeFromCart(
                  product.variant?.id ? product.variant?.id : product.id,
                  product.variant?.id ? true : false
                );
              }}
            >
              <Icon icon="lucide:x" width={14} />
            </Button>
          </Tooltip>
        </div> */}
      </li>
    );
  }
);

OrderSummaryItem.displayName = "OrderSummaryItem";

export default OrderSummaryItem;
