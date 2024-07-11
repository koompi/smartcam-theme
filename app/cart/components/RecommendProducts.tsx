"use client";

import React, { FC } from "react";
import { Card, CardBody, Image, Link } from "@nextui-org/react";
import { ProductType } from "@/types/product";
import { formatToUSD } from "@/utils/formatUSD";
// import { useCart } from "@/context/useCart";
// import { useRouter } from "next/navigation";
import RatingRadioGroup from "@/app/products/[id]/component/RatingRadioGroup";
import { PromotionType } from "@/types/promotion";

interface Props {
  product: ProductType;
  promotion: PromotionType;
}

const RecommendProducts = ({ products }: { products: ProductType[] }) => {
  return (
    <div className="hidden sm:hidden lg:block">
      <h1 className="text-2xl font-medium mb-3">Recomended Products</h1>
      <div className="sticky top-28 flex flex-col gap-3">
        {products?.slice(0, 5)?.map((res: any, idx: number) => {
          return <RecommendCard props={res} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default RecommendProducts;

const RecommendCard: FC<{ props: Props }> = ({ props }) => {
  // const { addToCart } = useCart();
  // const router = useRouter();

  console.log("props", props);

  return (
    <>
      {/* <Link href={`/products/${props.slug}`}> */}
      <Link href={`#`}>
        <Card isBlurred shadow="sm" className="group">
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt={props.product.title}
                  className="object-cover aspect-[4/3]"
                  height="200%"
                  width="100%"
                  shadow="none"
                  isBlurred
                  src={`${
                    process.env.NEXT_PUBLIC_DRIVE ??
                    "https://drive.backend.riverbase.org"
                  }/api/drive?hash=${props.product?.thumbnail}`}
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h3 className="font-semibold group-hover:underline">
                      {props.product.title}
                    </h3>
                    <p className="text-small line-clamp-1 mb-3">
                      {formatToUSD(props.product.price)}
                    </p>
                    <p className="text-small line-clamp-1 mb-3">
                      {props.product.desc}
                    </p>
                    <RatingRadioGroup
                      hideStarsText
                      size="sm"
                      value={`${
                        props.product?.rating <= 0 || !props.product?.rating
                          ? "4"
                          : props.product?.rating
                      }`}
                    />
                  </div>
                </div>
              </div>
              {/* <Tooltip showArrow={true} content="Add to Cart">
                <Button
                  radius="full"
                  variant="shadow"
                  isIconOnly
                  color="primary"
                  size="sm"
                  isDisabled={props?.stocks?.status === "OUT-STOCK"}
                  className="absolute z-10 top-2 right-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const product: ItemProduct = {
                      id: props.id,
                      name: props?.title,
                      variant: {
                        id: null,
                        label: "Default",
                        default: true,
                        previews: props?.thumbnail,
                        price: props?.price,
                        attributes: [],
                      },
                      price: props?.price,
                      currency: "USD",
                      preview: props?.thumbnail,
                      productId: props?.id,
                      variantId: null,
                    };

                    addToCart(product);
                  }}
                >
                  <Icon
                    icon="solar:cart-plus-bold"
                    fontSize={21}
                    className="text-background"
                  />
                </Button>
              </Tooltip> */}
            </div>
          </CardBody>
        </Card>
      </Link>
    </>
  );
};
