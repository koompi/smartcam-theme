"use client";

import { formatToUSD } from "@/utils/formatUSD";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Card,
  CardBody,
  Spacer,
  cn,
  CardFooter,
  Button,
  Image,
  Chip,
} from "@nextui-org/react";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface ProductCardProps {
  url: string;
  thumbnail: string;
  title: string;
  desc: ReactNode;
  rating: number;
  price: number;
  discountType: string | null;
  promotionPercentage: number;
  promotionPrice: number;
  totalPrice: number;
}

const ProductCard: FC<ProductCardProps> = ({
  url,
  thumbnail,
  title,
  desc,
  rating,
  price,
  discountType,
  promotionPercentage,
  promotionPrice,
  totalPrice,
}) => {
  return (
    <Card
      shadow="sm"
      isPressable
      isHoverable
      as={Link}
      href={url}
      className="col-span-1 h-full"
    >
      {discountType && (
        <Chip
          size="sm"
          color="danger"
          className="rounded-br-lg absolute top-0 left-0 z-20"
          radius="none"
          variant="shadow"
        >
          OFF {discountType === "PRICE" && formatToUSD(promotionPrice)}
          {discountType === "PERCENTAGE" && promotionPercentage + "%"}
        </Chip>
      )}
      <CardBody>
        <Image alt="products" src={thumbnail} isZoomed />
        <Spacer y={2} />
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => {
            const isSelected = i + 1 <= rating;

            return (
              <Icon
                key={i}
                className={cn(
                  "text-lg sm:text-xl",
                  isSelected ? "text-danger" : "text-gray-300"
                )}
                icon="solar:star-bold"
              />
            );
          })}
        </div>
        <Spacer y={2} />
        <h2 className="text-black font-medium text-lg line-clamp-2">{title}</h2>
        <Spacer y={3} />
        <ul className="list-disc text-gray-500 text-sm pl-6">
          <li>CPU: Apple M3 Pro chip 12-core</li>
          <li>OS: macOS</li>
          <li>RAM: 36GB unified memory</li>
          <li>Storage: 512GB SSD</li>
          <li>Graphic: Integrated 18-core</li>
          <li>GPU -Display: 16.2-inch (3456-by-2234)</li>
          <li>Battery: Up to 15hours</li>
          <li>Weight: 2.14kg</li>
          <li>Warranty: 1 year</li>
        </ul>
        <Spacer y={3} />
        <div className="flex items-center gap-3">
          {discountType ? (
            <>
              <p className="text-black text-md line-through">
                {formatToUSD(price)}
              </p>
              <p className="text-black text-2xl font-bold">
                {formatToUSD(totalPrice)}
              </p>
            </>
          ) : (
            <p className="text-black text-2xl font-bold">
              {formatToUSD(price)}
            </p>
          )}
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <Button
          radius="full"
          color="primary"
          startContent={
            <Icon icon="solar:cart-large-minimalistic-bold" fontSize={21} />
          }
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Add to Cart
        </Button>
        <Button
          isIconOnly
          variant="light"
          radius="full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Icon
            icon="solar:heart-outline"
            fontSize={30}
            className="text-gray-500"
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
