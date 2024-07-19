"use client";

import { formatToUSD } from "@/utils/formatUSD";
import { Image } from "@nextui-org/react";
import React, { FC } from "react";
import { cn } from "@/utils/cn";
import { ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";

interface ProductCardImageOnlyType {
  product: ProductType;
  promotion: PromotionType;
  isGroup: boolean;
}

const ProductCardImageOnly: FC<ProductCardImageOnlyType> = (props) => {
  return (
    <>
      <Image
        alt={props.product?.title}
        src={
          props.product
            ? `${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${props.product?.thumbnail}`
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
          {formatToUSD(props.promotion?.discount?.originalPrice)}
        </p>
        <p
          className={cn("font-semibold text-black", "text-xl", {
            "text-lg": props.isGroup,
          })}
        >
          {formatToUSD(props.promotion?.discount?.totalDiscount)}
        </p>
      </div>
    </>
  );
};

export default ProductCardImageOnly;
