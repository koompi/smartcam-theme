"use client";

import { CustomCheckbox } from "@/components/CustomComponent/CustomCheckBox";
import { WISHLISTS } from "@/graphql/wishlist";
import { ProductType } from "@/types/product";
import { PromotionType } from "@/types/promotion";
import { cn } from "@/utils/cn";
import { useMutation, useQuery } from "@apollo/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LexicalReader } from "@/editor/LexicalReader";

import {
  CheckboxGroup,
  Divider,
  Spacer,
  Image,
  Button,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useState, FC } from "react";
import { RESET_ITEM_COMPARE_LIST } from "@/graphql/mutation/wishlist";
import { toast } from "sonner";
import Empty from "@/components/globals/Empty";
import { useCart } from "@/context/useCart";
import { AddCart } from "@/types/global";

interface Topic {
  title: string;
  value: string; // Use a string for topic values
}

interface ProductsComparisonTableProps {
  products: any;
  setGroupSelected: (value: string[]) => void;
  groupSelected: string[];
}

const topics: Topic[] = [
  {
    title: "Information",
    value: "information",
  },
  {
    title: "Price",
    value: "price",
  },
  {
    title: "Brand",
    value: "brand",
  },
  {
    title: "Category",
    value: "category",
  },
  {
    title: "Description",
    value: "description",
  },
  {
    title: "Details",
    value: "details",
  },
];

const ComparisonPage = () => {
  const [groupSelected, setGroupSelected] = useState<string[]>([
    "information",
    "price",
    "description",
  ]);

  const { data, loading, refetch, error } = useQuery(WISHLISTS, {
    variables: {
      wishlistType: "COMPARE",
    },
  });

  const [resetItemCompare] = useMutation(RESET_ITEM_COMPARE_LIST);

  return loading ? (
    <Spinner />
  ) : error ? (
    <Empty />
  ) : (
    <section className="container py-6 px-3 sm:px-3 lg:px-0">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Comparison</h1>
        <div>
          <Button
            color="danger"
            variant="flat"
            radius="full"
            onPress={() => {
              resetItemCompare({
                variables: {
                  compareId: data?.customerWishlists?.id,
                },
              })
                .then((res) => {
                  toast.success(res.data.resetCompareList.message);
                  refetch();
                })
                .catch((e) => {
                  toast.error(e.message);
                });
            }}
            endContent={<Icon icon="solar:refresh-square-bold" fontSize={24} />}
          >
            Reset
          </Button>
        </div>
      </div>
      <Spacer y={3} />
      <div className="flex flex-col gap-1 w-full">
        <CheckboxGroup
          className="gap-1"
          orientation="horizontal"
          value={groupSelected}
          onChange={setGroupSelected}
        >
          {Array.from(topics, (t: Topic, idx) => {
            return (
              <CustomCheckbox key={idx} value={t.value}>
                {t.title}
              </CustomCheckbox>
            );
          })}
        </CheckboxGroup>
        {/* <p className="mt-4 ml-1 text-default-500">
        Selected: {groupSelected.join(", ")}
      </p> */}
      </div>
      <Divider className="my-3" />
      <Spacer y={6} />

      <ProductsComparisonTable
        products={data?.customerWishlists?.products}
        groupSelected={groupSelected}
        setGroupSelected={setGroupSelected}
      />
    </section>
  );
};

export default ComparisonPage;

const ProductsComparisonTable: FC<ProductsComparisonTableProps> = (props) => {
  const renderTopicData = (
    product: ProductType,
    promotion: PromotionType,
    topicValue: string
  ): string | JSX.Element => {
    switch (topicValue) {
      case "information":
        return props?.groupSelected.includes("information")
          ? product.title
          : ""; // Assuming 'desc' contains detailed information
      case "price":
        return `$${promotion.discount ? promotion?.discount.totalDiscount : product.price}`;
      case "brand":
        return product.brand;
      case "category":
        return product.category.title.en;
      case "description":
        return product.desc ? (
          <LexicalReader data={product.desc} />
        ) : (
          "Desc not specified"
        ); // Same as 'information' for this example
      case "details":
        return product.detail ? (
          <LexicalReader data={product.detail} />
        ) : (
          "Details not specified"
        ); // Handle if details are not present
      default:
        return ""; // Default case
    }
  };

  const { addToCart } = useCart();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-white">
            <th className="py-2 text-left">
              <div className="w-full flex flex-col items-center justify-center">
                <Button
                  size="lg"
                  variant="solid"
                  color="primary"
                  radius="full"
                  isIconOnly
                  className="w-auto h-auto"
                  as={Link}
                  href="/products"
                >
                  <Icon icon="solar:add-circle-bold" className="text-[3rem]" />
                </Button>
              </div>
            </th>
            {props.products?.map(
              ({
                product,
                promotion,
              }: {
                product: ProductType;
                promotion: PromotionType;
              }) => {
                return (
                  <th key={product.id} className="py-2 px-4 ">
                    <div className="w-full col-span-1 flex flex-col items-center justify-center p-3">
                      <Image
                        radius="lg"
                        alt={product.title}
                        src={
                          product?.thumbnail
                            ? `${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${product?.thumbnail}`
                            : "/images/default-thumbnail.png"
                        }
                        className="h-30 sm:h-30 lg:h-60 mx-auto"
                        isZoomed
                      />
                      {product?.stocks?.amount > 0 && (
                        <Button
                          variant="light"
                          color="primary"
                          className="font-semibold"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart({product_id: product.id, variant_id: null} as AddCart);
                            toast.success(
                              "The product is added into the cart!"
                            );
                          }}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </th>
                );
              }
            )}
          </tr>
        </thead>
        <tbody>
          {props.groupSelected.map((topic, idx) => (
            <tr
              key={topic}
              className={cn("px-4", {
                "bg-white": idx % 2,
              })}
            >
              <td className="py-6 px-4 font-bold capitalize">{topic}</td>
              {props.products.map(
                ({
                  product,
                  promotion,
                }: {
                  product: ProductType;
                  promotion: PromotionType;
                }) => (
                  <td key={`${product.id}-${topic}`} className="py-2 px-4">
                    {renderTopicData(product, promotion, topic)}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
