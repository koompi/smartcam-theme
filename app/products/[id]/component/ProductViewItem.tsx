"use client";

import {
  Breadcrumbs,
  BreadcrumbItem,
  Spacer,
  Image,
  Button,
  RadioGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Card,
  CardBody,
  Tab,
  Tabs,
  Input,
  Divider,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utils/cn";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Thumbs,
  Zoom,
  Pagination,
} from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types"; // Import Swiper type
import { Swiper, SwiperSlide } from "swiper/react";

import { VariantRadio } from "./VariantRadio";
import { formatToUSD } from "@/utils/formatUSD";
// import productReviews from "@/data/productReviews";
import {
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookShareButton,
  FacebookIcon,
} from "next-share";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/useCart";
import { ProductType, Variants } from "@/types/product";
import { toast } from "sonner";
import { LexicalReader } from "@/editor/LexicalReader";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  ADD_COMPARE_WISHLIST,
  ADD_WISHLIST,
} from "@/graphql/mutation/wishlist";
import { useMutation, useQuery } from "@apollo/client";
import { AddCart } from "@/types/global";
import { PRODUCT_SECTION_TYPE } from "@/graphql/product";
import { CardLoading } from "@/components/globals/Loading";
import RelatedProducts from "./RelatedProducts";
import { useAuth } from "@/context/useAuth";

type ProductViewInfoProps = Omit<React.HTMLAttributes<HTMLDivElement>, "id"> & {
  isPopular?: boolean;
  isLoading?: boolean;
  removeWrapper?: boolean;
  loading?: boolean;
} & ProductType;

const ratings = [
  {
    rating: 5,
    count: 120,
  },
  {
    rating: 4,
    count: 50,
  },
  {
    rating: 3,
    count: 25,
  },
  {
    rating: 2,
    count: 33,
  },
  {
    rating: 1,
    count: 30,
  },
];

export const ProductViewItem = React.forwardRef<
  HTMLDivElement,
  ProductViewInfoProps
>(
  ({
    title,
    previews,
    price,
    desc,
    rating,
    variants,
    detail,
    stocks,
    favorite,
    compare,
    offer,
    ...props
  }) => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || null;
    const sortParam = searchParams.get("sort") || null;
    const brands = searchParams.get("brands") || null;
    const { user } = useAuth();

    const router = useRouter();

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const swiperRef = useRef<SwiperType | null>(null);
    const fullHost = window.location.href;
    const [isFavorite, setIsFavorite] = useState(favorite);
    const [isCompare, setIsCompare] = useState(compare);
    const [qty, setQty] = useState<number>(1);
    const [isZoomed, setIsZoomed] = useState<boolean>(false);

    const [addWishlistCompare] = useMutation(ADD_COMPARE_WISHLIST);
    const [addWishlist] = useMutation(ADD_WISHLIST);

    const { addToCart, refetch, membershipId } = useCart();

    // related products
    const { data: relatedProducts, loading: relatedProductsLoading } = useQuery(
      PRODUCT_SECTION_TYPE,
      {
        variables: {
          statusType: "SUGGESTION",
          membershipId: membershipId,
          category: props?.category?.id,
          filter: {
            limit: 10,
            skip: 0,
            sort: -1,
          },
        },
        skip: !props?.category?.id,
      }
    );

    const handleZoom = () => {
      if (swiperRef.current) {
        const swiper = swiperRef.current;
        const currentScale = swiper.zoom.scale ?? 1;

        if (currentScale < 1.1) {
          // Zoom in and stop autoplay
          swiper.zoom.in();
          swiper.autoplay.stop();
          setIsZoomed(!isZoomed);
        } else {
          // Zoom out and restart autoplay
          swiper.zoom.out();
          swiper.autoplay.start();
          setIsZoomed(!isZoomed);
        }
      }
    };

    const video_files = ["mp4", "mov", "webm"];
    const cartVariants = [
      {
        id: null,
        label: "Default",
        default: true,
        previews: previews[0],
        price: price,
        attributes: [],
      },
    ].concat(variants as never[]);

    const [variant, setVariant] = useState<Variants>({
      id: null,
      label: "Default",
      default: true,
      previews: previews[0],
      price: price,
      attributes: [],
    });

    const handleCopy = async () => {
      try {
        await navigator.clipboard
          .writeText(fullHost)
          .then(() => {
            toast.success("Copied!");
          })
          .catch(() => {
            toast.error("something went wrong!");
          });
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };

    if (!relatedProducts || relatedProductsLoading) {
      return <CardLoading />;
    }

    return (
      <main>
        {/* nav */}
        <div className="flex sm:flex lg:hidden items-center justify-between p-3 bg-white">
          <Button
            isIconOnly
            variant="flat"
            radius="full"
            onPress={() => router.back()}
          >
            <Icon
              icon="ic:outline-arrow-back-ios"
              className="text-primary-900"
              fontSize={18}
            />
          </Button>
          <p>Details</p>
          <Button
            variant="shadow"
            isIconOnly
            radius="full"
            color="primary"
            isDisabled={stocks?.status === "OUT-STOCK"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(
                {
                  product_id: props.id,
                  variant_id: variant.id,
                } as AddCart,
                qty
              );
              toast.success("The product is added into the cart!");
            }}
          >
            <Icon icon="solar:cart-large-2-bold" fontSize={24} />
          </Button>
        </div>

        <Breadcrumbs
          size="lg"
          className="my-3 hidden sm:hidden lg:inline-flex"
          variant="light"
          color="primary"
          radius="lg"
        >
          <BreadcrumbItem href="/products">Products</BreadcrumbItem>
          {props?.category && (
            <BreadcrumbItem
              href={`/products?search=${search ? search : ""}&brands=${
                brands ? brands : ""
              }&category=${
                props?.category?.id ? props?.category?.id : ""
              }&sort=${sortParam ? sortParam : ""}`}
            >
              {props?.category?.title?.en}
            </BreadcrumbItem>
          )}
          {props?.subcategories.length > 0 && (
            <BreadcrumbItem
              href={`/products?search=${search ? search : ""}&brands=${
                brands ? brands : ""
              }&category=${
                props?.category?.id ? props?.category?.id : ""
              }&sub_category=${
                props?.subcategories[0]?.id ? props?.subcategories[0]?.id : ""
              }&sort=${sortParam ? sortParam : ""}`}
            >
              {props?.subcategories[0]?.title?.en}
            </BreadcrumbItem>
          )}
          <BreadcrumbItem className="line-clamp-1 text-sm">
            {title}
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex gap-6 px-0">
          <div className="w-full sm:w-full lg:w-3/4 h-full overflow-y-scroll hide-scroll-bar">
            <div className="grid grid-cols-12 gap-3 items-center ">
              {/* ---- swiper scroll galleries ---- */}
              <div className="hidden sm:hidden lg:flex col-span-2 px-3 sm:px-3 lg:px-0 h-[50rem]">
                <Swiper
                  onSwiper={setThumbsSwiper as any}
                  loop={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  direction="vertical"
                  className="mySwiper"
                  modules={[FreeMode, Autoplay, Navigation, Thumbs]}
                >
                  {previews?.map((preview, index) => (
                    <SwiperSlide
                      key={index}
                      className="border border-primary rounded-2xl p-1"
                    >
                      {video_files?.includes(preview.split(".")[1]) ? (
                        <Icon
                          icon="solar:play-circle-bold-duotone"
                          className="relative cursor-pointer w-full h-full object-cover object-center text-primary"
                        />
                      ) : (
                        <div className="grid place-items-center mx-auto">
                          <Image
                            alt="image"
                            radius="lg"
                            src={`${process.env.NEXT_PUBLIC_S3}/${preview}`}
                            className="h-full max-h-[11.5rem] relative w-[30rem] cursor-pointer object-cover object-center"
                          />
                        </div>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={false}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[
                  FreeMode,
                  Autoplay,
                  Navigation,
                  Thumbs,
                  Zoom,
                  Pagination,
                ]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                zoom={true}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                pagination={{
                  type: "fraction",
                }}
                className="col-span-12  sm:col-span-12 lg:col-span-10 bg-white flex justify-center items-center px-0 rounded-none sm:rounded-none lg:rounded-3xl border-0 sm:border-0 lg:border "
              >
                {previews?.map((preview, index) => (
                  <SwiperSlide key={index}>
                    {video_files?.includes(preview?.split(".")[1]) ? (
                      <video
                        className="h-[36dvh] sm:h-[36dvh] lg:h-[60dvh] w-full grid place-items-center mx-auto"
                        autoPlay
                        loop
                        muted
                      >
                        <source
                          src={`${process.env.NEXT_PUBLIC_S3}/${preview}`}
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <div className="swiper-zoom-container grid place-items-center place-content-center h-full object-contain object-center">
                        <Image
                          alt="Product thumbnail"
                          src={isZoomed ? `${process.env.NEXT_PUBLIC_S3}/${preview.split(".")[0] + "_max." + preview.split(".")[1]}` : `${process.env.NEXT_PUBLIC_S3}/${preview}`}
                          className="h-[36dvh] sm:h-[36dvh] lg:h-[60dvh] object-contain object-center"
                        />
                      </div>
                    )}
                  </SwiperSlide>
                ))}
                <Button
                  radius="full"
                  isIconOnly
                  id="zoom-button"
                  onClick={() => handleZoom()}
                  variant="flat"
                  color="primary"
                  className="absolute z-50 bottom-3 right-3"
                >
                  <Icon icon="solar:magnifer-zoom-in-linear" fontSize={30} />
                </Button>
              </Swiper>

              {/* Swap thumbnail for smaller devices */}

              {/* <div className="col-span-12 flex sm:flex lg:hidden">
                <Swiper
                  onSwiper={setThumbsSwiper as any}
                  loop={true}
                  autoplay={{
                    delay: 90000,
                    disableOnInteraction: false,
                  }}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  className="mySwiper flex items-center mt-3"
                  modules={[FreeMode, Autoplay, Navigation, Thumbs]}
                >
                  {previews.map((preview, index) => (
                    <SwiperSlide
                      key={index}
                      className="swiperSlider border border-primary rounded-2xl p-1"
                    >
                      {video_files.includes(preview.split(".")[1]) ? (
                        <Icon
                          icon="solar:play-circle-bold-duotone"
                          className="relative cursor-pointer w-full h-full object-cover object-center text-primary"
                        />
                      ) : (
                        <Image
                          alt={title}
                          radius="lg"
                          src={`${
                            process.env.NEXT_PUBLIC_DRIVE ??
                            "https://drive.backend.riverbase.org"
                          }/api/drive?hash=${preview}`}
                          className="relative w-24 h-24 cursor-pointer object-contain object-center"
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div> */}

              {/* desc info for small devices */}

              <div className="col-span-12 flex sm:flex lg:hidden w-full">
                <div className="bg-white rounded-none sm:rounded-none lg:rounded-3xl shadow-sm p-3 w-full">
                  <h1 className="text-xl font-bold tracking-tight">{title}</h1>
                  <Spacer y={6} />
                  <h2 className="text-4xl font-bold">
                    {props.promotion?.discount ? (
                      <div className="flex items-center gap-3">
                        <div className="line-through text-xl text-danger">
                          {formatToUSD(
                            parseInt(
                              props?.promotion?.discount.originalPrice.toString()
                            )
                          )}
                        </div>
                        <label className="text-primary">
                          {formatToUSD(
                            parseFloat(
                              props?.promotion?.discount?.totalDiscount.toString()
                            )
                          )}
                        </label>
                      </div>
                    ) : (
                      <label className="text-primary">
                        {formatToUSD(
                          parseFloat(props?.currencyPrice?.usd.toString())
                        )}
                      </label>
                      // `${formatToUSD(parseInt(variant.price.toString()))}`
                    )}
                  </h2>
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
                    })}{" "}
                    (Reviews)
                  </div>
                  <Spacer y={6} />
                  {offer?.promotionStatus === "UP COMING" && (
                    <>
                      <div className="flex items-center gap-2">
                        <Icon icon="hugeicons:discount" fontSize={24} />
                        <p>
                          Big Offer at{" "}
                          <span className="font-semibold text-lg">
                            {offer?.startPromotion}
                          </span>
                        </p>
                      </div>
                      <Spacer y={1} />
                    </>
                  )}
                  <div className="flex items-center gap-2 text-default-700">
                    <Icon icon="solar:box-line-duotone" fontSize={24} />
                    {stocks?.status === "IN-STOCK" && (
                      <p className="text-small font-semibold">
                        {stocks?.status}
                      </p>
                    )}
                    {stocks?.status === "LOWER" && (
                      <p className="text-small font-semibold text-warning">
                        {stocks?.status}
                      </p>
                    )}
                    {stocks?.status === "OUT-STOCK" && (
                      <p className="text-small font-semibold text-danger">
                        OUT-OF-STOCK
                      </p>
                    )}
                  </div>
                  <div className="divide-y divide-dashed mt-3">
                    <p className="sr-only">Product desc</p>
                    <p className="line-clamp-9 text-medium text-gray-500 whitespace-pre-line pt-3 px-3">
                      <LexicalReader data={desc} />
                    </p>
                  </div>
                  {/*  ---variants----- */}
                  <div className="mt-6 flex flex-col gap-1">
                    {variants.length > 0 && (
                      <RadioGroup label="Variants" defaultValue={props.id}>
                        <div className="flex flex-col gap-2">
                          {variants.length > 0 &&
                            cartVariants.map((item: Variants, idx: number) => {
                              return (
                                <VariantRadio
                                  key={idx}
                                  value={item?.id ? item.id : props.id}
                                  onChange={(_) => {
                                    setVariant({
                                      ...item,
                                      default: item.id ? false : true,
                                    });
                                    router.push(`?variant=${item.id}`);
                                  }}
                                >
                                  <div className="grid items-center grid-cols-5 justify-between">
                                    <Image
                                      alt="variants"
                                      src={`${process.env.NEXT_PUBLIC_S3}/${item?.previews}`}
                                      className="h-12 col-span-1"
                                      radius="md"
                                    />
                                    <div className="col-span-4">
                                      <span className="text-md font-semibold line-clamp-1">
                                        {item.label}
                                      </span>
                                      <p className="text-base font-medium text-primary">
                                        {formatToUSD(
                                          parseInt(item?.price.toString())
                                        )}
                                      </p>
                                      {/* {item.attributes.map(
                                    (item: Attribute, idx: number) => (
                                      <div key={idx} className="text-xs flex">
                                        <span>{item.option}</span>
                                      </div>
                                    )
                                  )} */}
                                    </div>
                                  </div>
                                </VariantRadio>
                              );
                            })}
                        </div>
                      </RadioGroup>
                    )}
                  </div>

                  {/* <Spacer y={6} /> */}
                  <p className="mt-3 font-medium">Quantity</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="max-w-48 flex items-center gap-3">
                      <Button
                        color="default"
                        size="sm"
                        isIconOnly
                        variant="flat"
                        radius="full"
                        isDisabled={qty <= 1}
                        onPress={() => setQty(qty - 1)}
                      >
                        <Icon icon="ic:baseline-minus" fontSize={24} />
                      </Button>
                      <Input
                        type="number"
                        min={1}
                        defaultValue={qty.toString()}
                        value={qty.toString()}
                        variant="flat"
                        radius="full"
                        className="bg-white"
                        onValueChange={(value) => {
                          setQty(parseInt(value.toString()));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "." || e.key === ",") {
                            e.preventDefault();
                          }
                        }}
                        onPaste={(e) => {
                          let pasteData = e.clipboardData.getData("text");

                          if (pasteData) {
                            e.preventDefault();
                            pasteData.replace(/[^0-9]*/g, "");
                          }
                        }}
                        pattern="[0-9]"
                      />
                      <Button
                        isIconOnly
                        variant="flat"
                        radius="full"
                        color="default"
                        size="sm"
                        onPress={() => setQty(qty + 1)}
                      >
                        <Icon icon="material-symbols:add" fontSize={24} />
                      </Button>
                    </div>
                    {user && (
                      <Button
                        isIconOnly
                        variant="flat"
                        color="primary"
                        radius="full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addWishlist({
                            variables: {
                              wishlistType: "FAVORITE",
                              productId: props.id,
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
                          <Icon icon="solar:heart-bold" fontSize={24} />
                        ) : (
                          <Icon icon="solar:heart-outline" fontSize={24} />
                        )}
                      </Button>
                    )}
                  </div>
                  <div className="mt-6">
                    {/* <Button
                      className="col-span-6"
                      variant="shadow"
                      size="lg"
                      radius="full"
                      color="primary"
                      fullWidth
                      startContent={
                        <Icon icon="solar:bag-3-bold" fontSize={24} />
                      }
                    >
                      Buy Now
                    </Button> */}
                    <div className="flex place-items-center gap-3 mt-3">
                      <Button
                        variant="flat"
                        size="lg"
                        radius="full"
                        color="primary"
                        fullWidth
                        startContent={
                          <Icon icon="solar:cart-large-2-bold" fontSize={24} />
                        }
                        isDisabled={stocks?.status === "OUT-STOCK"}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(
                            {
                              product_id: props.id,
                              variant_id: variant.id,
                            } as AddCart,
                            qty
                          );
                          toast.success("The product is added into the cart!");
                        }}
                      >
                        Add to Cart
                      </Button>
                      {user && (
                        <Button
                          variant={isCompare ? "flat" : "bordered"}
                          size="lg"
                          radius="full"
                          color={isCompare ? "danger" : "primary"}
                          fullWidth
                          startContent={
                            isCompare ? (
                              <Icon
                                icon="icon-park-twotone:back"
                                fontSize={20}
                              />
                            ) : (
                              <Icon icon="fluent-mdl2:compare" fontSize={20} />
                            )
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addWishlistCompare({
                              variables: {
                                wishlistType: "COMPARE",
                                productId: props.id,
                                categoryId: props.category.id,
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
                          {isCompare ? "Undo" : "Compare"}
                        </Button>
                      )}
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-12 place-items-center gap-3 mt-6">
                    <Button
                      className="col-span-6"
                      variant="shadow"
                      size="lg"
                      radius="full"
                      color="primary"
                      fullWidth
                      startContent={
                        <Icon icon="solar:bag-3-bold" fontSize={24} />
                      }
                      isDisabled
                    >
                      Buy Now
                    </Button>
                    <Button
                      className="col-span-6"
                      variant="flat"
                      size="lg"
                      radius="full"
                      color="primary"
                      fullWidth
                      startContent={
                        <Icon icon="solar:cart-large-2-bold" fontSize={24} />
                      }
                      isDisabled={stocks?.status === "OUT-STOCK"}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(variant.id ? variant.id : props.id);
                        toast.success("The product is added into the cart!");
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div> */}
                  <div className="flex items-center justify-end mt-6">
                    <Dropdown placement="top" size="lg" type="listbox">
                      <DropdownTrigger>
                        <Button
                          startContent={
                            <Icon icon="solar:share-bold" fontSize={18} />
                          }
                          variant="light"
                          radius="full"
                          size="lg"
                        >
                          Share
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        variant="flat"
                        aria-label="Dropdown menu with description"
                      >
                        <DropdownItem
                          showDivider
                          key="new"
                          description="Copy link send to another"
                          startContent={
                            <Icon icon="solar:link-bold" fontSize={21} />
                          }
                          onPress={() => handleCopy()}
                        >
                          Copy Link
                        </DropdownItem>
                        <DropdownItem
                          key="telegram"
                          startContent={
                            <TwitterShareButton
                              url={fullHost}
                              title={
                                "next-share is a social share buttons for your next React apps."
                              }
                            >
                              <TwitterIcon size={24} round />
                            </TwitterShareButton>
                          }
                        >
                          <TwitterShareButton
                            url={fullHost}
                            title={
                              "next-share is a social share buttons for your next React apps."
                            }
                          >
                            Share on X
                          </TwitterShareButton>
                        </DropdownItem>
                        <DropdownItem
                          key="new"
                          startContent={
                            <TelegramShareButton
                              url={fullHost}
                              title={
                                "next-share is a social share buttons for your next React apps."
                              }
                            >
                              <TelegramIcon size={24} round />
                            </TelegramShareButton>
                          }
                        >
                          <TelegramShareButton
                            url={fullHost}
                            title={
                              "next-share is a social share buttons for your next React apps."
                            }
                          >
                            Share on Telgram
                          </TelegramShareButton>
                        </DropdownItem>
                        <DropdownItem
                          key="facebook"
                          startContent={
                            <FacebookShareButton
                              url={fullHost}
                              quote={
                                "next-share is a social share buttons for your next React apps."
                              }
                              hashtag={"#nextshare"}
                            >
                              <FacebookIcon size={24} round />
                            </FacebookShareButton>
                          }
                        >
                          <FacebookShareButton
                            url={fullHost}
                            quote={
                              "next-share is a social share buttons for your next React apps."
                            }
                            hashtag={"#nextshare"}
                          >
                            Share on Facebook
                          </FacebookShareButton>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>

              <div className="col-span-12 flex w-full flex-col mt-0 sm:mt-0 lg:mt-6">
                <div className="flex w-full flex-col">
                  <Tabs
                    variant="underlined"
                    size="lg"
                    color="primary"
                    aria-label="Disabled Options"
                  >
                    <Tab key="description" title="Decription">
                      <Card
                        className="rounded-none sm:rounded-none lg:rounded-3xl"
                        shadow="none"
                      >
                        <CardBody className="p-6">
                          <LexicalReader data={detail} />
                        </CardBody>
                      </Card>
                    </Tab>
                    {/* <Tab key="rerviews" title="Reviews">
                      <Card
                        className="rounded-xl sm:rounded-xl lg:rounded-3xl"
                        shadow="none"
                      >
                        <CardBody className="px-3 py-3 sm:py-3 lg:py-6">
                          <section className="mx-auto w-full max-w-6xl lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-12">
                            <div className="lg:col-span-4">
                              <SummaryRatingCard
                                averageRating={4.4}
                                ratings={ratings}
                                totalRatingCount={139}
                                onWriteReview={onOpen}
                              />
                            </div>
                            <div className="mt-16 lg:col-span-8 lg:mt-0">
                              <header className="flex flex-wrap items-center justify-between gap-4">
                                <h1 className="text-large font-semibold text-black">
                                  136 Reviews
                                </h1>
                              </header>
                              <div className="mt-4 flex flex-col">
                                {productReviews.map((review, index) => (
                                  <div
                                    key={index}
                                    className="border-divider px-2 py-10 [&:not(:last-child)]:border-b-1"
                                  >
                                    <Review {...review} />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <ModalReview
                              isOpen={isOpen}
                              onClose={onClose}
                              onOpenChange={onOpenChange}
                            />
                          </section>
                        </CardBody>
                      </Card>
                    </Tab> */}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>

          {/* desc info */}
          <div className="hidden sm:hidden lg:block w-1/4">
            <div className="sticky top-40 bg-white rounded-3xl shadow-sm p-6">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <Spacer y={6} />
              <h2 className="text-4xl font-bold">
                {props.promotion?.discount ? (
                  <div className="flex items-center gap-3">
                    <div className="line-through text-xl text-danger">
                      {formatToUSD(
                        parseInt(
                          props?.promotion?.discount.originalPrice.toString()
                        )
                      )}
                    </div>
                    <label className="text-primary">
                      {formatToUSD(
                        parseFloat(
                          props?.promotion?.discount?.totalDiscount.toString()
                        )
                      )}
                    </label>
                  </div>
                ) : (
                  <label className="text-primary">
                    {formatToUSD(
                      parseFloat(props?.currencyPrice?.usd.toString())
                    )}
                  </label>
                  // `${formatToUSD(parseInt(variant.price.toString()))}`
                )}
              </h2>
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
                })}{" "}
                (Rerviews)
              </div>
              <Spacer y={6} />
              {offer?.promotionStatus === "UP COMING" && (
                <>
                  <div className="flex items-center gap-2">
                    <Icon icon="hugeicons:discount" fontSize={24} />
                    <p>
                      Big Offer at{" "}
                      <span className="font-semibold text-lg">
                        {offer?.startPromotion}
                      </span>
                    </p>
                  </div>
                  <Spacer y={1} />
                </>
              )}
              <div className="flex items-center gap-2 text-default-700">
                <Icon icon="solar:box-line-duotone" fontSize={24} />
                {stocks?.status === "IN-STOCK" && (
                  <p className="text-small font-semibold text-primary">
                    {stocks?.status}
                  </p>
                )}
                {stocks?.status === "LOWER" && (
                  <p className="text-small font-semibold text-warning">
                    {stocks?.status}
                  </p>
                )}
                {stocks?.status === "OUT-STOCK" && (
                  <p className="text-small font-semibold text-danger">
                    OUT-OF-STOCK
                  </p>
                )}
              </div>
              <div className="divide-y divide-dashed mt-3">
                <p className="sr-only">Product desc</p>
                <p className="line-clamp-9 text-medium text-gray-500 whitespace-pre-line pt-3">
                  {<LexicalReader data={desc} />}
                </p>
              </div>
              {/*  ---variants----- */}
              <div className="mt-6 flex flex-col gap-1">
                {variants.length > 0 && (
                  <RadioGroup label="Variants" defaultValue={props.id}>
                    <div className="flex flex-col gap-2">
                      {variants.length > 0 &&
                        cartVariants.map((item: Variants, idx: number) => {
                          return (
                            <VariantRadio
                              key={idx}
                              value={item?.id ? item.id : props.id}
                              onChange={(_) =>
                                setVariant({
                                  ...item,
                                  default: item.id ? false : true,
                                })
                              }
                            >
                              <div className="grid items-center grid-cols-5 justify-between">
                                <Image
                                  alt="variants"
                                  src={`${process.env.NEXT_PUBLIC_S3}/${item?.previews}`}
                                  className="h-12 col-span-1"
                                  radius="md"
                                />
                                <div className="col-span-4">
                                  <span className="text-md font-semibold line-clamp-1">
                                    {item.label}
                                  </span>
                                  <p className="text-base font-medium text-primary">
                                    {formatToUSD(
                                      parseInt(item?.price.toString())
                                    )}
                                  </p>
                                  {/* {item.attributes.map(
                                    (item: Attribute, idx: number) => (
                                      <div key={idx} className="text-xs flex">
                                        <span>{item.option}</span>
                                      </div>
                                    )
                                  )} */}
                                </div>
                              </div>
                            </VariantRadio>
                          );
                        })}
                    </div>
                  </RadioGroup>
                )}
              </div>

              {/* <Spacer y={6} /> */}
              <p className="mt-3 font-medium">Quantity</p>
              <div className="flex items-center justify-between mt-3">
                <div className="max-w-48 flex items-center gap-3">
                  <Button
                    color="default"
                    size="sm"
                    isIconOnly
                    variant="flat"
                    radius="full"
                    isDisabled={qty <= 1}
                    onPress={() => setQty(qty - 1)}
                  >
                    <Icon icon="ic:baseline-minus" fontSize={24} />
                  </Button>
                  <Input
                    type="number"
                    min={1}
                    defaultValue={qty.toString()}
                    value={qty.toString()}
                    variant="flat"
                    radius="full"
                    className="bg-white"
                    onValueChange={(value) => {
                      setQty(parseInt(value.toString()));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "." || e.key === ",") {
                        e.preventDefault();
                      }
                    }}
                    onPaste={(e) => {
                      let pasteData = e.clipboardData.getData("text");
                      if (pasteData) {
                        e.preventDefault();
                        pasteData.replace(/[^0-9]*/g, "");
                      }
                    }}
                  />
                  <Button
                    isIconOnly
                    variant="flat"
                    radius="full"
                    color="default"
                    size="sm"
                    onPress={() => setQty(qty + 1)}
                  >
                    <Icon icon="material-symbols:add" fontSize={24} />
                  </Button>
                </div>
                {user && (
                  <Button
                    isIconOnly
                    variant="flat"
                    color="primary"
                    radius="full"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addWishlist({
                        variables: {
                          wishlistType: "FAVORITE",
                          productId: props.id,
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
                      <Icon icon="solar:heart-bold" fontSize={24} />
                    ) : (
                      <Icon icon="solar:heart-outline" fontSize={24} />
                    )}
                  </Button>
                )}
              </div>

              {/* <p className="text-sm text-gray-600 mt-3">
                {stocks?.amount} available
              </p> */}

              <div className="mt-6">
                {/* <Button
                  className="col-span-6"
                  variant="shadow"
                  size="lg"
                  radius="full"
                  color="primary"
                  fullWidth
                  startContent={<Icon icon="solar:bag-3-bold" fontSize={24} />}
                >
                  Buy Now
                </Button> */}
                <div className="flex place-items-center gap-3 mt-3">
                  <Button
                    variant="flat"
                    size="lg"
                    radius="full"
                    color="primary"
                    fullWidth
                    startContent={
                      <Icon icon="solar:cart-large-2-bold" fontSize={24} />
                    }
                    isDisabled={stocks?.status === "OUT-STOCK"}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(
                        {
                          product_id: props.id,
                          variant_id: variant.id,
                        } as AddCart,
                        qty
                      );
                      toast.success("The product is added into the cart!");
                    }}
                  >
                    Add to Cart
                  </Button>
                  {user && (
                    <Button
                      variant={isCompare ? "flat" : "bordered"}
                      size="lg"
                      radius="full"
                      color={isCompare ? "danger" : "primary"}
                      fullWidth
                      startContent={
                        isCompare ? (
                          <Icon icon="icon-park-twotone:back" fontSize={20} />
                        ) : (
                          <Icon icon="fluent-mdl2:compare" fontSize={20} />
                        )
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addWishlistCompare({
                          variables: {
                            wishlistType: "COMPARE",
                            productId: props.id,
                            categoryId: props.category.id,
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
                      {isCompare ? "Undo" : "Compare"}
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end mt-6">
                <Dropdown placement="top" size="lg" type="listbox">
                  <DropdownTrigger>
                    <Button
                      startContent={
                        <Icon icon="solar:share-bold" fontSize={18} />
                      }
                      variant="light"
                      radius="full"
                      size="lg"
                    >
                      Share
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    variant="flat"
                    aria-label="Dropdown menu with description"
                  >
                    <DropdownItem
                      showDivider
                      key="new"
                      description="Copy link send to another"
                      startContent={
                        <Icon icon="solar:link-bold" fontSize={21} />
                      }
                      onPress={() => handleCopy()}
                    >
                      Copy Link
                    </DropdownItem>
                    <DropdownItem
                      key="telegram"
                      startContent={
                        <TwitterShareButton
                          url={fullHost}
                          title={
                            "next-share is a social share buttons for your next React apps."
                          }
                        >
                          <TwitterIcon size={24} round />
                        </TwitterShareButton>
                      }
                    >
                      <TwitterShareButton
                        url={fullHost}
                        title={
                          "next-share is a social share buttons for your next React apps."
                        }
                      >
                        Share on X
                      </TwitterShareButton>
                    </DropdownItem>
                    <DropdownItem
                      key="new"
                      startContent={
                        <TelegramShareButton
                          url={fullHost}
                          title={
                            "next-share is a social share buttons for your next React apps."
                          }
                        >
                          <TelegramIcon size={24} round />
                        </TelegramShareButton>
                      }
                    >
                      <TelegramShareButton
                        url={fullHost}
                        title={
                          "next-share is a social share buttons for your next React apps."
                        }
                      >
                        Share on Telgram
                      </TelegramShareButton>
                    </DropdownItem>
                    <DropdownItem
                      key="facebook"
                      startContent={
                        <FacebookShareButton
                          url={fullHost}
                          quote={
                            "next-share is a social share buttons for your next React apps."
                          }
                          hashtag={"#nextshare"}
                        >
                          <FacebookIcon size={24} round />
                        </FacebookShareButton>
                      }
                    >
                      <FacebookShareButton
                        url={fullHost}
                        quote={
                          "next-share is a social share buttons for your next React apps."
                        }
                        hashtag={"#nextshare"}
                      >
                        Share on Facebook
                      </FacebookShareButton>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        {/* related products */}
        {relatedProducts?.storeSortProducts?.products?.length > 0 && (
          <RelatedProducts
            relatedProducts={relatedProducts?.storeSortProducts?.products}
          />
        )}
      </main>
    );
  }
);
