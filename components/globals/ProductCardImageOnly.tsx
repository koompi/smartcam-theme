"use client";

import { formatToUSD } from "@/utils/formatUSD";
import { Image } from "@nextui-org/react";
import React, { FC } from "react";
import { cn } from "@/utils/cn";

interface ProductCardImageOnlyType {
  src: string;
  orginal_price: number;
  promotion_price: number;
  promotion_percentage: number;
  off: number;
  isGroup: boolean;
  discountType: string;
}

const ProductCardImageOnly: FC<ProductCardImageOnlyType> = (props) => {
  return (
    <>
      <Image
        alt={props.src}
        src={
          props.src
            ? `${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${props.src}`
            : "/images/default-thumbnail.png"
        }
        radius="none"
        className="w-full object-cover h-full"
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
          className={cn("font-semibold text-black", "text-xl", {
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
