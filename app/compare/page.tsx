"use client";

import { CustomCheckbox } from "@/components/CustomComponent/CustomCheckBox";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  CheckboxGroup,
  Divider,
  Spacer,
  Image,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useState, FC } from "react";

interface Topic {
  title: string;
  value: string; // Use a string for topic values
}

interface Product {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  rating: number;
  price: number;
  discountType: string;
  promotionPercentage: number;
  promotionPrice: number;
  totalPrice: number;
  brand: string;
  category: string;
}

interface ProductsComparisonTableProps {
  products: Product[];
  setGroupSelected: (value: string[]) => void;
  groupSelected: string[];
}

export const productsComparison: Product[] = [
  {
    id: "1",
    url: "#",
    thumbnail: "apple-m3-black.png",
    title:
      " Apple Macbook Pro 16.2' M3 Pro chip CPU 12-core and 18-core GPU-36GB-512GB-Space Black (MRW23ZP/A)1Y",
    description:
      "-CPU / Processor: Apple M3 Pro chip 12-core CPU with 6 performance cores and 6 efficiency cores 18-core GPU Hardware-accelerated ray tracing 16-core Neural Engine 150GB/s memory bandwidth-Operating System : macOS-RAM / Memory: 36GB unified memory-Storage: 512GB SSD-Graphic: Apple Integrated 18-core GPU-Display: 16.2-inch (diagonal) Liquid Retina XDR display 3456-by-2234 native resolution at 254 pixels per inch-Optical Drive: None-Wireless: Wi-Fi 6E (802.11ax) + Bluetooth 5.3-Audio: High-fidelity six-speaker sound system with force-cancelling woofers Wide stereo sound-Webcame: 1080p FaceTime HD camera Advanced image signal processor with computational video-Ports :-SDXC card slot , HDMI port, 3.5 mm headphone jack, MagSafe 3 port.           Three Thunderbolt 4 (USB-C) ports with support for: *Charging, DisplayPort, Thunderbolt 4 (up to 40Gb/s), USB 4 (up to 40Gb/s).-Battery: M3 Pro Chip Up to 22 hours Apple TV app movie playback Up to 15 hours wireless web-Keyboard: Backlit Magic Keyboard Touch ID-Weight: 4.7 pounds (2.14 kg)-Warranty: 1year warranty",
    rating: 4,
    price: 1850,
    discountType: "PERCENTAGE",
    promotionPercentage: 5,
    promotionPrice: 0,
    totalPrice: 1800,
    brand: "Apple",
    category: "Computer",
  },
  {
    id: "2",
    url: "#",
    thumbnail: "apple-m3-black2.png",
    title:
      "Apple Macbook Pro 16.2' M3 Pro chip CPU 12-core and 18-core GPU-36GB-512GB-Space Black (MRW23ZP/A)1Y",
    description:
      "-CPU / Processor: Apple M3 Pro chip 12-core CPU with 6 performance cores and 6 efficiency cores 18-core GPU Hardware-accelerated ray tracing 16-core Neural Engine 150GB/s memory bandwidth-Operating System : macOS-RAM / Memory: 36GB unified memory-Storage: 512GB SSD-Graphic: Apple Integrated 18-core GPU-Display: 16.2-inch (diagonal) Liquid Retina XDR display 3456-by-2234 native resolution at 254 pixels per inch-Optical Drive: None-Wireless: Wi-Fi 6E (802.11ax) + Bluetooth 5.3-Audio: High-fidelity six-speaker sound system with force-cancelling woofers Wide stereo sound-Webcame: 1080p FaceTime HD camera Advanced image signal processor with computational video-Ports :-SDXC card slot , HDMI port, 3.5 mm headphone jack, MagSafe 3 port.           Three Thunderbolt 4 (USB-C) ports with support for: *Charging, DisplayPort, Thunderbolt 4 (up to 40Gb/s), USB 4 (up to 40Gb/s).-Battery: M3 Pro Chip Up to 22 hours Apple TV app movie playback Up to 15 hours wireless web-Keyboard: Backlit Magic Keyboard Touch ID-Weight: 4.7 pounds (2.14 kg)-Warranty: 1year warranty",
    rating: 4,
    price: 1850,
    discountType: "PERCENTAGE",
    promotionPercentage: 5,
    promotionPrice: 0,
    totalPrice: 1800,
    brand: "Apple",
    category: "Computer",
  },
  {
    id: "3",
    url: "#",
    thumbnail: "apple-m3-gray.png",
    title:
      "Apple Macbook Pro 16.2' M3 Pro chip CPU 12-core and 18-core GPU-36GB-512GB-Space Black (MRW23ZP/A)1Y",
    description:
      "-CPU / Processor: Apple M3 Pro chip 12-core CPU with 6 performance cores and 6 efficiency cores 18-core GPU Hardware-accelerated ray tracing 16-core Neural Engine 150GB/s memory bandwidth-Operating System : macOS-RAM / Memory: 36GB unified memory-Storage: 512GB SSD-Graphic: Apple Integrated 18-core GPU-Display: 16.2-inch (diagonal) Liquid Retina XDR display 3456-by-2234 native resolution at 254 pixels per inch-Optical Drive: None-Wireless: Wi-Fi 6E (802.11ax) + Bluetooth 5.3-Audio: High-fidelity six-speaker sound system with force-cancelling woofers Wide stereo sound-Webcame: 1080p FaceTime HD camera Advanced image signal processor with computational video-Ports :-SDXC card slot , HDMI port, 3.5 mm headphone jack, MagSafe 3 port.           Three Thunderbolt 4 (USB-C) ports with support for: *Charging, DisplayPort, Thunderbolt 4 (up to 40Gb/s), USB 4 (up to 40Gb/s).-Battery: M3 Pro Chip Up to 22 hours Apple TV app movie playback Up to 15 hours wireless web-Keyboard: Backlit Magic Keyboard Touch ID-Weight: 4.7 pounds (2.14 kg)-Warranty: 1year warranty",
    rating: 4,
    price: 1850,
    discountType: "PERCENTAGE",
    promotionPercentage: 5,
    promotionPrice: 0,
    totalPrice: 1800,
    brand: "Apple",
    category: "Computer",
  },
];

export const topics: Topic[] = [
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
    title: "Descripton",
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

  return (
    <section className="container py-6">
      <h1 className="text-2xl font-bold">Comparison</h1>
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
        products={productsComparison}
        groupSelected={groupSelected}
        setGroupSelected={setGroupSelected}
      />
    </section>
  );
};

export default ComparisonPage;

export const ProductsComparisonTable: FC<ProductsComparisonTableProps> = (
  props
) => {
  const renderTopicData = (
    product: Product,
    topicValue: string
  ): string | JSX.Element => {
    switch (topicValue) {
      case "information":
        return props?.groupSelected.includes("information")
          ? product.title
          : ""; // Assuming 'desc' contains detailed information
      case "price":
        return `$${product.totalPrice}`;
      case "brand":
        return product.brand;
      case "category":
        return product.category;
      case "description":
        return product.description; // Same as 'information' for this example
      case "details":
        return "Details not specified"; // Handle if details are not present
      default:
        return ""; // Default case
    }
  };

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
                  className="h-20 w-20"
                  as={Link}
                  href="/products"
                >
                  <Icon icon="solar:add-circle-bold" fontSize={80} />
                </Button>
              </div>
            </th>
            {props.products?.map((product: any) => (
              <th key={product.id} className="py-2 px-4 ">
                <div className="w-full col-span-1 flex flex-col items-center justify-center p-3">
                  <Image
                    radius="lg"
                    alt={product.title}
                    src={`/images/products/${product.thumbnail}`}
                    className="h-60 mx-auto"
                    isZoomed
                  />
                  <Button
                    variant="light"
                    color="primary"
                    className="font-semibold"
                  >
                    Add to Cart
                  </Button>
                </div>
              </th>
            ))}
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
              <td className="py-6 px-4 font-bold">{topic}</td>
              {props.products.map((product: Product) => (
                <td key={`${product.id}-${topic}`} className="py-2 px-4">
                  {renderTopicData(product, topic)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
