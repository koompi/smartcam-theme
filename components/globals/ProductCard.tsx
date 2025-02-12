"use client";

import { useAuth } from "@/context/useAuth";
import { useCart } from "@/context/useCart";
import { LexicalReader } from "@/editor/LexicalReader";
import {
  ADD_COMPARE_WISHLIST,
  ADD_WISHLIST,
} from "@/graphql/mutation/wishlist";
import { AddCart } from "@/types/global";
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
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import React, { FC, ReactNode, useState } from "react";
import { toast } from "sonner";

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
  remark: string;
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
  remark,
}) => {
  const { addToCart, refetch } = useCart();
  const { user } = useAuth();
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
      className="group flex flex-col flex-grow col-span-1 h-full group items-stretch"
    >
      {remark && (
        <Chip
          size="sm"
          color="danger"
          className="rounded-br-lg absolute top-0 left-0 z-20"
          radius="none"
          variant="shadow"
        >
          {remark === "BESTSELLER"
            ? "BEST SELLER"
            : remark === "ARRIVAL"
              ? "NEW ARRIVAL"
              : remark}
        </Chip>
      )}
      <CardBody className="flex flex-col flex-grow">
        {user && (
          <Button
            isIconOnly
            radius="lg"
            color="primary"
            variant="shadow"
            size="sm"
            className="opacity-0 transition-all ease-linear duration-250 absolute right-3 top-3 z-20 group-hover:opacity-100"
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
            <Icon icon="solar:undo-right-bold" fontSize={18} />
          </Button>
        )}
        <div className="flex justify-center items-center overflow-hidden ">
          <Image
            alt="products"
            src={
              thumbnail
                ? `${process.env.NEXT_PUBLIC_S3}/${thumbnail}`
                : "/images/default-thumbnail.png"
            }
            isZoomed
            isBlurred
            className="w-96 h-36 sm:h-36 lg:h-60 object-cover object-center"
          />
        </div>
        <Spacer y={2} />
        <div className="flex justify-between items-center">
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
          {promotion?.discount?.discountType && (
            <Chip size="sm" color="danger" radius="sm" variant="shadow">
              OFF{" "}
              {promotion?.discount?.discountType === "PRICE" &&
                usd(promotion?.discount?.discountPrice)}
              {promotion?.discount?.discountType === "PERCENTAGE" &&
                promotion?.discount?.discountPercentage + "%"}
            </Chip>
          )}
        </div>
        <Spacer y={2} />
        <div className="flex flex-col flex-grow">
          <h2 className="text-black font-medium text-sm sm:text-sm lg:text-lg line-clamp-2">
            {title}
          </h2>
          <Divider className="mt-2" />
          <p className="text-gray-500 text-xs sm:text-xs lg:text-sm pl-1 whitespace-pre-line mt-2 sm:mt-2 lg:mt-3 fontSizeTextEditor line-clamp-3">
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
            startContent={<Icon icon="solar:cart-plus-bold" fontSize={21} />}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart({ product_id: id, variant_id: null } as AddCart);
              toast.success("The product is added into the cart!");
            }}
            isDisabled={stocks?.status === "OUT-STOCK"}
          >
            Add to Cart
          </Button>
        </div>

        <div>
          {user && (
            <Button
              isIconOnly
              variant="light"
              radius="full"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
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
          )}
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
