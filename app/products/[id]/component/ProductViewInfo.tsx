"use client";

import {
  Breadcrumbs,
  BreadcrumbItem,
  Spacer,
  Image,
  Button,
  RadioGroup,
  Input,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Card,
  CardBody,
  Tab,
  Tabs,
  Select,
  SelectItem,
  useDisclosure,
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
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { VariantRadio } from "./VariantRadio";
import { formatToUSD } from "@/utils/formatUSD";
import productReviews from "@/data/productReviews";
import {
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookShareButton,
  FacebookIcon,
} from "next-share";
import ModalReview from "./ReviewModal";
import Review from "./Reviews";
import SummaryRatingCard from "./SummaryRatingCard";

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

const ProductViewInfo = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const fullHost = window.location.href;
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    const zoomButton = document.getElementById("zoom-button");
    const handleZoom = () => {
      if (swiperRef.current) {
        const swiper = swiperRef.current;
        if (swiper.zoom.scale === 1) {
          swiper.zoom.in();
        } else {
          swiper.zoom.out();
        }
      }
    };

    if (zoomButton) {
      zoomButton.addEventListener("click", handleZoom);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (zoomButton) {
        zoomButton.removeEventListener("click", handleZoom);
      }
    };
  }, []);

  const video_files = ["video/mp4", "video/mov", "video/webm"];
  const previews = [
    "apple-m3-gray.png",
    "apple-m3-black.png",
    "apple-m3-black2.png",
    "imac.png",
    "apple-mini.png",
    "mouse.png",
  ];

  return (
    <main>
      <Breadcrumbs color="primary" size="lg">
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem href="#">Category</BreadcrumbItem>
        <BreadcrumbItem href="#">Sub Category</BreadcrumbItem>
        <BreadcrumbItem href="#">Product Name</BreadcrumbItem>
      </Breadcrumbs>
      <Spacer y={3} />
      <div className="flex gap-6">
        <div className="w-3/4 h-full overflow-y-scroll hide-scroll-bar">
          <div className="grid grid-cols-12 gap-3 items-center ">
            {/* ---- swiper scroll galleries ---- */}
            <div className="col-span-2 px-3 sm:px-3 lg:px-0 h-[50rem]">
              <Swiper
                onSwiper={setThumbsSwiper as any}
                loop={true}
                autoplay={{
                  delay: 9000,
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
                    className="border border-primary rounded-2xl"
                  >
                    {video_files?.includes(preview.split(".")[1]) ? (
                      <Icon
                        icon="solar:play-circle-bold-duotone"
                        className="relative cursor-pointer w-full h-full object-cover object-center text-primary"
                      />
                    ) : (
                      <>
                        <Image
                          alt="image"
                          radius="lg"
                          // src={`${
                          //   process.env.NEXT_PUBLIC_DRIVE ??
                          //   "https://drive.backend.riverbase.org"
                          // }/api/drive?hash=${preview}`}
                          src={`/images/products/${preview && preview}`}
                          className="relative w-full cursor-pointer object-contain object-center"
                        />
                      </>
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
                delay: 9000,
                disableOnInteraction: false,
              }}
              zoom={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              pagination={{
                type: "fraction",
              }}
              className="col-span-10 bg-background flex justify-center items-center px-0 rounded-3xl border-0 sm:border-0 lg:border "
            >
              {previews?.map((preview, index) => (
                <SwiperSlide key={index}>
                  {video_files?.includes(preview?.split(".")[1]) ? (
                    <video
                      className="h-[30dvh] sm:h-[30dvh] lg:h-[60dvh] w-full grid place-items-center mx-auto"
                      autoPlay
                      loop
                      muted
                    >
                      <source
                        // src={`${
                        //   process.env.NEXT_PUBLIC_DRIVE ??
                        //   "https://drive.backend.riverbase.org"
                        // }/api/drive?hash=${preview}`}
                        src={`/images/products/${preview && preview}`}
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    // <div className="w-full h-full grid place-items-center">
                    //   <InnerImageZoom
                    //     // src={`${
                    //     //   process.env.NEXT_PUBLIC_DRIVE ??
                    //     //   "https://drive.backend.riverbase.org"
                    //     // }/api/drive?hash=${preview}`}
                    //     // zoomSrc={`${
                    //     //   process.env.NEXT_PUBLIC_DRIVE ??
                    //     //   "https://drive.backend.riverbase.org"
                    //     // }/api/drive?hash=${preview}`}
                    //     src={`/images/products/${preview && preview}`}
                    //     zoomSrc={`/images/products/${preview && preview}`}
                    //     zoomType="click"
                    //     className="object-contain object-center backdrop-filter backdrop-blur-xl h-full"
                    //   />
                    // </div>
                    <div className="swiper-zoom-container grid place-items-center place-content-center h-full object-contain object-center">
                      <Image
                        alt="Product thumbnail"
                        //     // src={`${
                        //     //   process.env.NEXT_PUBLIC_DRIVE ??
                        //     //   "https://drive.backend.riverbase.org"
                        //     // }/api/drive?hash=${preview}`}
                        src={`/images/products/${preview && preview}`}
                        className="h-full"
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
              <Button
                radius="full"
                isIconOnly
                id="zoom-button"
                size="lg"
                variant="flat"
                color="primary"
                className="absolute z-50 bottom-3 right-3"
              >
                <Icon icon="solar:magnifer-zoom-in-linear" fontSize={30} />
              </Button>
            </Swiper>

            {/* <div className="mt-16 hidden sm:hidden lg:block">
              <h2 className="text-xl font-semibold mb-3">Details</h2>
              <p className="text-medium text-default-500">
                <LexicalReader data={detail} />
              </p>
            </div> */}
            <div className="col-span-12 flex w-full flex-col mt-6">
              <div className="flex w-full flex-col">
                <Tabs
                  variant="underlined"
                  size="lg"
                  color="primary"
                  aria-label="Disabled Options"
                >
                  <Tab key="description" title="Decription">
                    <Card className="rounded-3xl" shadow="none">
                      <CardBody className="p-12">
                        <p className="text-black leading-9">
                          -CPU / Processor: Apple M3 Pro chip 12-core CPU with 6
                          performance cores and 6 efficiency cores 18-core GPU
                          Hardware-accelerated ray tracing 16-core Neural Engine
                          150GB/s memory bandwidth-Operating System : macOS-RAM
                          / Memory: 36GB unified memory-Storage: 512GB
                          SSD-Graphic: Apple Integrated 18-core GPU-Display:
                          16.2-inch (diagonal) Liquid Retina XDR display
                          3456-by-2234 native resolution at 254 pixels per
                          inch-Optical Drive: None-Wireless: Wi-Fi 6E (802.11ax)
                          + Bluetooth 5.3-Audio: High-fidelity six-speaker sound
                          system with force-cancelling woofers Wide stereo
                          sound-Webcame: 1080p FaceTime HD camera Advanced image
                          signal processor with computational video-Ports :-SDXC
                          card slot , HDMI port, 3.5 mm headphone jack, MagSafe
                          3 port.           Three Thunderbolt 4 (USB-C) ports
                          with support for: *Charging, DisplayPort, Thunderbolt
                          4 (up to 40Gb/s), USB 4 (up to 40Gb/s).-Battery: M3
                          Pro Chip Up to 22 hours Apple TV app movie playback   
                                     Up to 15 hours wireless web-Keyboard:
                          Backlit Magic Keyboard Touch ID-Weight: 4.7 pounds
                          (2.14 kg)-Warranty: 1year warranty
                        </p>

                        <p className="text-black leading-9">
                          -CPU / Processor: Apple M3 Pro chip 12-core CPU with 6
                          performance cores and 6 efficiency cores 18-core GPU
                          Hardware-accelerated ray tracing 16-core Neural Engine
                          150GB/s memory bandwidth-Operating System : macOS-RAM
                          / Memory: 36GB unified memory-Storage: 512GB
                          SSD-Graphic: Apple Integrated 18-core GPU-Display:
                          16.2-inch (diagonal) Liquid Retina XDR display
                          3456-by-2234 native resolution at 254 pixels per
                          inch-Optical Drive: None-Wireless: Wi-Fi 6E (802.11ax)
                          + Bluetooth 5.3-Audio: High-fidelity six-speaker sound
                          system with force-cancelling woofers Wide stereo
                          sound-Webcame: 1080p FaceTime HD camera Advanced image
                          signal processor with computational video-Ports :-SDXC
                          card slot , HDMI port, 3.5 mm headphone jack, MagSafe
                          3 port.           Three Thunderbolt 4 (USB-C) ports
                          with support for: *Charging, DisplayPort, Thunderbolt
                          4 (up to 40Gb/s), USB 4 (up to 40Gb/s).-Battery: M3
                          Pro Chip Up to 22 hours Apple TV app movie playback   
                                     Up to 15 hours wireless web-Keyboard:
                          Backlit Magic Keyboard Touch ID-Weight: 4.7 pounds
                          (2.14 kg)-Warranty: 1year warranty
                        </p>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="rerviews" title="Reviews">
                    <Card className="rounded-3xl" shadow="none">
                      <CardBody className="p-12">
                        <section className="mx-auto w-full max-w-6xl px-2 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-12 lg:px-6">
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
                              <Select
                                aria-label="Sort by"
                                className="w-40 text-black"
                                defaultSelectedKeys={["most_recent"]}
                                labelPlacement="outside"
                                radius="full"
                                variant="bordered"
                              >
                                <SelectItem
                                  key="most_recent"
                                  value="most_recent"
                                >
                                  Most recent
                                </SelectItem>
                                <SelectItem
                                  key="most_helpful"
                                  value="most_helpful"
                                >
                                  Most helpful
                                </SelectItem>
                                <SelectItem
                                  key="highest_rating"
                                  value="highest_rating"
                                >
                                  Highest rating
                                </SelectItem>
                              </Select>
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
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        {/* desc info */}
        <div className="w-1/4">
          <div className="sticky top-40 bg-foreground rounded-3xl shadow-sm p-6">
            <h2 className="text-xl font-semibold">
              Apple Macbook Pro 16.2" M3 Pro chip CPU 12-core and 18-core
              GPU-36GB-512GB-Space
            </h2>
            <Spacer y={6} />
            <h2 className="text-4xl font-bold text-primary">
              {formatToUSD(900)}
            </h2>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => {
                const isSelected = i + 1 <= 4;

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
              })}{" "}
              (Rerviews)
            </div>
            <Spacer y={6} />
            <ul className="list-disc pl-3">
              <li>CPU: Apple M3 Pro chip 12-core</li>
              <li>OS: macOS</li>
              <li>RAM: 36GB unified memory</li>
              <li>Storage: 512GB SSD</li>
              <li>Graphic: Integrated 18-core GPU</li>
              <li>Display: 16.2-inch (3456-by-2234)</li>
              <li>Battery: Up to 15hours</li>
              <li>Weight: 2.14kg</li>
              <li>Warranty: 1 year</li>
            </ul>
            {/*  ---variants----- */}
            <div className="mt-6 flex flex-col gap-1">
              <RadioGroup label="Variants" defaultValue={"1"}>
                <div className="flex flex-col gap-2">
                  <VariantRadio
                    value="1"
                    // value={item?.id ? item.id : props.id}
                    // onChange={(_) =>
                    //   setVariant({
                    //     ...item,
                    //     default: item.id ? false : true,
                    //   })
                    // }
                  >
                    <div className="grid items-center grid-cols-5 gap-3 justify-between">
                      <Image
                        alt="variants"
                        // src={`${
                        //   process.env.NEXT_PUBLIC_DRIVE ??
                        //   "https://drive.backend.riverbase.org"
                        // }/api/drive?hash=${item?.previews}`}
                        src="/images/products/apple-m3-gray.png"
                        className="20 col-span-1"
                        radius="md"
                      />
                      <div className="col-span-4">
                        <span className="text-md text-black font-semibold">
                          Apple M3 Space Gray
                        </span>
                        <p className="text-base text-primary">
                          {/* {formatToUSD(parseInt(item?.price.toString()))} */}
                          {formatToUSD(900)}
                        </p>
                        {/* {item.attributes.map((item: Attribute, idx: number) => (
                        <div key={idx} className="text-xs flex">
                          <span>{item.option}</span>
                        </div>
                      ))} */}
                      </div>
                    </div>
                  </VariantRadio>
                  <VariantRadio
                    value="2"
                    // value={item?.id ? item.id : props.id}
                    // onChange={(_) =>
                    //   setVariant({
                    //     ...item,
                    //     default: item.id ? false : true,
                    //   })
                    // }
                  >
                    <div className="grid items-center grid-cols-5 gap-3 justify-between">
                      <Image
                        alt="variants"
                        // src={`${
                        //   process.env.NEXT_PUBLIC_DRIVE ??
                        //   "https://drive.backend.riverbase.org"
                        // }/api/drive?hash=${item?.previews}`}
                        src="/images/products/apple-m3-black.png"
                        className="20 col-span-1"
                        radius="md"
                      />
                      <div className="col-span-4">
                        <span className="text-md text-black font-semibold">
                          Apple M3 Space Black
                        </span>
                        <p className="text-base text-primary">
                          {/* {formatToUSD(parseInt(item?.price.toString()))} */}
                          {formatToUSD(900)}
                        </p>
                        {/* {item.attributes.map((item: Attribute, idx: number) => (
                        <div key={idx} className="text-xs flex">
                          <span>{item.option}</span>
                        </div>
                      ))} */}
                      </div>
                    </div>
                  </VariantRadio>
                </div>
              </RadioGroup>
            </div>
            <Spacer y={6} />
            <p className="mt-3 font-medium">Quantity</p>
            <div className="flex items-center justify-between mt-3">
              <div className="max-w-48 flex items-center gap-3">
                <Button
                  color="default"
                  size="sm"
                  isIconOnly
                  variant="flat"
                  radius="full"
                >
                  <Icon icon="ic:baseline-minus" fontSize={24} />
                </Button>
                <Input
                  type="number"
                  min={1}
                  defaultValue="1"
                  variant="flat"
                  radius="full"
                  className="bg-foreground"
                ></Input>
                <Button
                  isIconOnly
                  variant="flat"
                  radius="full"
                  color="default"
                  size="sm"
                >
                  <Icon icon="material-symbols:add" fontSize={24} />
                </Button>
              </div>
              <Button
                variant="bordered"
                radius="full"
                color="primary"
                isIconOnly
              >
                <Icon icon="solar:heart-bold" fontSize={24} />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-3">48 available</p>

            <div className="grid grid-cols-12 place-items-center gap-3 mt-6">
              <Button
                className="col-span-6"
                variant="shadow"
                size="lg"
                radius="full"
                color="primary"
                fullWidth
                startContent={<Icon icon="solar:bag-3-bold" fontSize={24} />}
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
              >
                Add to Cart
              </Button>
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
                    startContent={<Icon icon="solar:link-bold" fontSize={21} />}
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
    </main>
  );
};

export default ProductViewInfo;
