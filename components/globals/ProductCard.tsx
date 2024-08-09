"use client";

import { useAuth } from "@/context/useAuth";
import { useCart } from "@/context/useCart";
import { LexicalReader } from "@/editor/LexicalReader";
import {
  ADD_COMPARE_WISHLIST,
  ADD_WISHLIST,
} from "@/graphql/mutation/wishlist";
import { StockType } from "@/types/product";
import { PromotionType } from "@/types/promotion";
import { usd } from "@/utils/formatUSD";
import { useMutation } from "@apollo/client";
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
import React, { FC, ReactNode, useRef, useState } from "react";
import { toast } from "sonner";
import { gsap } from "gsap";

interface ProductCardProps {
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
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  thumbnail,
  title,
  desc,
  promotion,
  slug,
  stocks,
  currencyPrice,
  categoryId,
  favorite,
  compare,
}) => {
  const { addToCart } = useCart();
  const { refetch } = useAuth();
  const [addWishlist] = useMutation(ADD_WISHLIST);
  const [addWishlistCompare] = useMutation(ADD_COMPARE_WISHLIST);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isCompare, setIsCompare] = useState(compare);

  return (
    <Card
      shadow="sm"
      isPressable
      isHoverable
      as={Link}
      href={`/products/${slug}`}
      className="flex flex-col flex-grow col-span-1 h-full group items-stretch"
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
      <CardBody className="flex flex-col flex-grow">
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
              className="absolute right-1 top-1 z-20  hidden group-hover:hidden sm:group-hover:hidden lg:group-hover:flex"
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
              Add to Compare
            </DropdownItem>
            <DropdownItem
              key="buy"
              color="primary"
              className="text-primary"
              description="Get product now"
              startContent={<Icon icon="solar:bag-3-bold" fontSize={21} />}
            >
              Buy Now
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="flex justify-center items-center overflow-hidden ">
          <Image
            alt="products"
            src={
              thumbnail
                ? `${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${thumbnail}`
                : "/images/default-thumbnail.png"
            }
            isZoomed
            isBlurred
            className="w-96 h-36 sm:h-36 lg:h-60 object-cover object-center"
          />
        </div>
        <Spacer y={2} />
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => {
            const isSelected = i + 1 <= 4;

            return (
              <Icon
                key={i}
                className={cn(
                  "text-sm sm:text-sm lg:text-lg",
                  isSelected ? "text-primary" : "text-gray-300"
                )}
                icon="solar:star-bold"
              />
            );
          })}
        </div>
        <Spacer y={2} />
        <div className="flex flex-col flex-grow">
          <h2 className="text-black font-medium text-sm sm:text-sm lg:text-lg line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-500 text-xs sm:text-xs lg:text-sm pl-1 line-clamp-9 whitespace-pre-line mt-2 sm:mt-2 lg:mt-3">
            {desc ? <LexicalReader data={desc.toString()} /> : null}
          </p>
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
        </div>
      </CardBody>
      <CardFooter className="items-center justify-between hidden sm:hidden lg:flex">
        <div className="relative">
          <Button
            radius="full"
            color="primary"
            startContent={
              <Icon icon="solar:cart-large-minimalistic-bold" fontSize={21} />
            }
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(id);
              toast.success("The product is added into the cart!");
            }}
            isDisabled={stocks?.status === "OUT-STOCK"}
          >
            Add to Cart
          </Button>
        </div>

        <div>
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // add product to wishlist
              addWishlist({
                variables: {
                  wishlistType: "FAVORITE",
                  productId: id,
                },
              })
                .then((res) => {
                  toast.success(res.data.storeAddWishlist.message);
                  refetch();
                  setIsFavorite(!isFavorite);
                })
                .catch((e) => {
                  toast.error(e.message);
                });
            }}
          >
            {isFavorite ? (
              <Icon
                icon="solar:heart-bold"
                fontSize={30}
                className="text-danger"
              />
            ) : (
              <Icon
                icon="solar:heart-outline"
                fontSize={30}
                className="text-gray-500"
              />
            )}
          </Button>
          {/* <Button
            isIconOnly
            variant="light"
            radius="full"
            // color="primary"
            className={`${isCompare && `bg-gray-200`}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // add product to wishlist
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
            <Icon
              icon="mdi:compare-horizontal"
              fontSize={30}
              className="text-gray-500"
            />
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
