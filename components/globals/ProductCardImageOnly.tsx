"use client";

import { formatToUSD } from "@/utils/formatUSD";
import { Image } from "@nextui-org/react";
import React, { FC } from "react";
import { cn } from "@/utils/cn";

interface ProductCardImageOnlyType {
  src: string;
  orginal_price: number;
  promotion_price: number;
  off: number;
  isGroup: boolean;
}

const ProductCardImageOnly: FC<ProductCardImageOnlyType> = (props) => {
  return (
    <>
      <Image
        alt={props.src}
        src={`/images/products/${props.src}`}
        radius="none"
        className="h-full w-full object-cover"
      />
      <div className="flex items-center justify-around">
        <p
          className={cn("line-through text-danger", "text-xl", {
            "text-sm": props.isGroup,
          })}
        >
          {formatToUSD(props.orginal_price)}
        </p>
        <p
          className={cn("font-semibold text-black", "text-3xl", {
            "text-lg": props.isGroup,
          })}
        >
          {formatToUSD(props.promotion_price)}
        </p>
      </div>
    </>
  );
};

export default ProductCardImageOnly;
