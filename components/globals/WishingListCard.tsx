"use client";

import { LexicalReader } from "@/editor/LexicalReader";
import { usd } from "@/utils/formatUSD";
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
import React, { FC, ReactNode, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_COMPARE_WISHLIST,
  REMOVE_PRODUCT_FROM_WISHLIST,
} from "@/graphql/mutation/wishlist";
import { toast } from "sonner";
import { StockType } from "@/types/product";
import { PromotionType } from "@/types/promotion";
import { useCart } from "@/context/useCart";
import { AddCart } from "@/types/global";

interface WishListProps {
  id: string;
  thumbnail: string;
  title: string;
  desc: ReactNode;
  rating: number;
  price: number;
  promotion: PromotionType;
  slug: string;
  stocks: StockType;
  categoryId: string;
  favorite: boolean;
  compare: boolean;
  currencyPrice: {
    khr: number;
    usd: number;
  };
  refetch: Function;
}

const WishingListCard: FC<WishListProps> = ({
  id,
  thumbnail,
  title,
  desc,
  promotion,
  slug,
  stocks,
  currencyPrice,
  categoryId,
  compare,
  refetch,
}) => {
  const [isCompare, setIsCompare] = useState(compare);

  const [removeProductFromEWishlist] = useMutation(
    REMOVE_PRODUCT_FROM_WISHLIST
  );
  const [addWishlistCompare] = useMutation(ADD_COMPARE_WISHLIST);

  const { addToCart } = useCart();

  return (
    <Card
      shadow="sm"
      isPressable
      isHoverable
      as={Link}
      href={`/products/${slug}`}
      className="col-span-1 h-full group"
    >
      {promotion?.discount?.discountType && (
        <Chip
          size="sm"
          color="danger"
          className="rounded-br-lg absolute top-0 left-0 z-20"
          radius="none"
          variant="shadow"
        >
          OFF{" "}
          {promotion?.discount?.discountType === "PRICE" &&
            usd(promotion?.discount?.discountPrice)}
          {promotion?.discount?.discountType === "PERCENTAGE" &&
            promotion?.discount?.discountPercentage + "%"}
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
                isCompare ? (
                  <Icon icon="icon-park-twotone:back" fontSize={21} />
                ) : (
                  <Icon icon="fluent-mdl2:compare" fontSize={21} />
                )
              }
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addWishlistCompare({
                  variables: {
                    wishlistType: "COMPARE",
                    productId: id,
                    categoryId: categoryId,
                  },
                })
                  .then((res) => {
                    toast.success(res.data.storeAddCompare.message);
                    refetch();
                    setIsCompare(!isCompare);
                  })
                  .catch((e) => {
                    toast.error(e.message);
                  });
              }}
            >
              {isCompare ? "Undo" : "Add to Compare"}
            </DropdownItem>
            <DropdownItem
              key="remove"
              className="text-danger"
              color="danger"
              description="Remove from the list"
              startContent={
                <Icon icon="solar:trash-bin-2-bold" fontSize={21} />
              }
              onPress={() => {
                removeProductFromEWishlist({
                  variables: {
                    productId: id,
                    wishlistType: "FAVORITE",
                  },
                })
                  .then((_) => {
                    toast.success("Items has been to remove from wishlist");
                    refetch();
                  })
                  .catch((e) => {
                    toast.error(e.message);
                  });
              }}
            >
              Remove
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Image
          alt="products"
          src={
            thumbnail
              ? `${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${thumbnail}`
              : "/images/default-thumbnail.png"
          }
          isZoomed
        />
        <Spacer y={2} />
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => {
            const isSelected = i + 1 <= 4;

            return (
              <Icon
                key={i}
                className={cn(
                  "text-lg sm:text-xl",
                  isSelected ? "text-primary" : "text-gray-300"
                )}
                icon="solar:star-bold"
              />
            );
          })}
        </div>
        <Spacer y={2} />
        <h2 className="text-black font-medium text-sm sm:text-sm lg:text-lg line-clamp-2">
          {title}
        </h2>
        <Spacer y={3} />
        <div className="fontSizeTextEditor">
          {desc ? <LexicalReader data={desc.toString()} /> : null}
        </div>
        <Spacer y={3} />
        <div className="flex items-center gap-3 mt-2 sm:mt-2 lg:mt-3">
          {promotion?.discount?.discountType ? (
            <>
              <p className="text-black text-xs sm:text-xs lg:text-md line-through">
                {usd(promotion?.discount?.originalPrice)}
              </p>
              <p className="text-black  text-lg sm:text-lg lg:text-2xl font-bold">
                {usd(promotion?.discount?.totalDiscount)}
              </p>
            </>
          ) : (
            <p className="text-black  text-lg sm:text-lg lg:text-2xl font-bold">
              {usd(currencyPrice?.usd)}
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
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart({ product_id: id, variant_id: null } as AddCart);
            toast.success("The product is added into the cart!");
          }}
          isDisabled={stocks?.status === "OUT-STOCK"}
        >
          <Icon icon="solar:cart-large-minimalistic-bold" fontSize={24} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WishingListCard;
