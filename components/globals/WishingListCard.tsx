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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface WishListProps {
  url: string;
  thumbnail: string;
  title: string;
  description: ReactNode;
  rating: number;
  price: number;
  discountType: string | null;
  promotionPercentage: number;
  promotionPrice: number;
  totalPrice: number;
}

const WishingListCard: FC<WishListProps> = ({
  url,
  thumbnail,
  title,
  description,
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
      className="col-span-1 h-full group"
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
        <Dropdown
          showArrow
          classNames={{
            base: "before:bg-default-200", // change arrow background
            content:
              "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
          }}
        >
          <DropdownTrigger>
            <Button
              className="absolute right-1 top-1 z-20 hidden group-hover:flex"
              variant="light"
              isIconOnly
              size="sm"
              radius="lg"
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Icon icon="mage:dots" fontSize={18} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownItem
              key="compare"
              color="primary"
              description="Compare your products"
              startContent={
                <Icon icon="material-symbols:compare" fontSize={21} />
              }
            >
              Add to Compare
            </DropdownItem>
            <DropdownItem
              key="remove"
              className="text-danger"
              color="danger"
              description="Remove from the list"
              startContent={
                <Icon icon="solar:trash-bin-2-bold" fontSize={21} />
              }
            >
              Remove
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
      <CardFooter className="flex gap-3 items-center justify-between">
        <Button
          radius="full"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          fullWidth
        >
          Buy Now
        </Button>
        <Button
          isIconOnly
          variant="flat"
          radius="full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Icon
            icon="solar:cart-large-minimalistic-bold"
            fontSize={24}
            className="text-gray-500"
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WishingListCard;
