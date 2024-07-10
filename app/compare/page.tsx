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
import React, { useState } from "react";

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
  topics: Topic[];
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

  const ProductsComparisonTable: React.FC<ProductsComparisonTableProps> = ({
    products,
    topics,
  }) => {
    const renderTopicData = (
      product: Product,
      topicValue: string
    ): string | JSX.Element => {
      switch (topicValue) {
        case "information":
          return groupSelected.includes("information") ? product.title : ""; // Assuming 'desc' contains detailed information
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
              {products.map((product) => (
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
            {groupSelected.map((topic, idx) => (
              <tr
                key={topic}
                className={cn("px-4", {
                  "bg-white": idx % 2,
                })}
              >
                <td className="py-6 px-4 font-bold">{topic}</td>
                {products.map((product) => (
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
          {Array.from(topics, (t, idx) => {
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
      {/* <Table
        aria-label="Example static collection table"
        isStriped
        isVirtualized
        removeWrapper
      >
        <TableHeader>
          <TableColumn
            width={300}
            className="bg-white rounded-lg"
            isRowHeader
          >
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
          </TableColumn>
          <TableColumn>
            <div className="w-full flex flex-col items-center justify-center">
              <Image
                radius="lg"
                alt="products"
                src="/images/products/apple-m3-black.png"
                className="h-60 mx-auto"
              />
              <Button variant="light" color="primary" className="font-semibold">
                Add to Cart
              </Button>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="w-full flex flex-col items-center justify-center">
              <Image
                radius="lg"
                alt="products"
                src="/images/products/apple-m3-black.png"
                className="h-60 mx-auto"
              />
              <Button variant="light" color="primary" className="font-semibold">
                Add to Cart
              </Button>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="w-full flex flex-col items-center justify-center">
              <Image
                radius="lg"
                alt="products"
                src="/images/products/apple-m3-black.png"
                className="h-60 mx-auto"
              />
              <Button variant="light" color="primary" className="font-semibold">
                Add to Cart
              </Button>
            </div>
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow
            key="information"
            hidden={groupSelected.includes("information") ? false : true}
          >
            <TableCell className="font-semibold">Information</TableCell>
            <TableCell>
              MacBook Pro 16-M2 Max Chip-CPU 12‑core and 38Core-GPU-32GB-1TB
              SSD-16'' Silver
            </TableCell>
            <TableCell>
              Apple Macbook Pro 16.2" M3 Pro chip CPU 12-core and 18-core
              GPU-36GB-512GB-Space Black
            </TableCell>
            <TableCell>
              MacBook Pro 16-M2 Max Chip-CPU 12‑core and 38Core-GPU-32GB-1TB
              SSD-16'' Space Grey
            </TableCell>
          </TableRow>
          <TableRow
            key="price"
            hidden={groupSelected.includes("price") ? false : true}
          >
            <TableCell className="font-semibold">Price</TableCell>
            <TableCell>{formatToUSD(1800)}</TableCell>
            <TableCell>{formatToUSD(1800)}</TableCell>
            <TableCell>{formatToUSD(1800)}</TableCell>
          </TableRow>
          <TableRow
            key="brand"
            hidden={groupSelected.includes("brand") ? false : true}
          >
            <TableCell className="font-semibold">Brand</TableCell>
            <TableCell>Apple</TableCell>
            <TableCell>Apple</TableCell>
            <TableCell>Apple</TableCell>
          </TableRow>
          <TableRow
            key="category"
            hidden={groupSelected.includes("category") ? false : true}
          >
            <TableCell className="font-semibold">Category</TableCell>
            <TableCell>Computer</TableCell>
            <TableCell>Computer</TableCell>
            <TableCell>Computer</TableCell>
          </TableRow>
          <TableRow
            key="description"
            hidden={groupSelected.includes("description") ? false : true}
          >
            <TableCell className="font-semibold">Description</TableCell>
            <TableCell>
              -CPU: Apple M3 Pro chip 12-core -OS: macOS -RAM: 18GB unified
              memory -Storage: 1TB SSD -Graphic: Integrated 18-core GPU
              -Display: 14.2-inch (3024-by-1964) -Battery: Up to 15hours
              -Weight: 1.55kg -Warranty: 1 year
            </TableCell>
            <TableCell>
              -CPU: Apple M3 Pro chip 12-core -OS: macOS -RAM: 18GB unified
              memory -Storage: 1TB SSD -Graphic: Integrated 18-core GPU
              -Display: 14.2-inch (3024-by-1964) -Battery: Up to 15hours
              -Weight: 1.55kg -Warranty: 1 year
            </TableCell>
            <TableCell>
              -CPU: Apple M3 Pro chip 12-core -OS: macOS -RAM: 18GB unified
              memory -Storage: 1TB SSD -Graphic: Integrated 18-core GPU
              -Display: 14.2-inch (3024-by-1964) -Battery: Up to 15hours
              -Weight: 1.55kg -Warranty: 1 year
            </TableCell>
          </TableRow>
          <TableRow
            key="details"
            hidden={groupSelected.includes("details") ? false : true}
          >
            <TableCell className="font-semibold">Details</TableCell>
            <TableCell>
              -CPU / Processor: Apple M3 Pro chip 12-core CPU with 6 performance
              cores and 6 efficiency cores 18-core GPU Hardware-accelerated ray
              tracing 16-core Neural Engine 150GB/s memory bandwidth -Operating
              System : macOS -RAM / Memory: 18GB unified memory -Storage: 1TB
              SSD -Graphic: Apple Integrated 18-core GPU -Display: 14.2-inch
              (diagonal) Liquid Retina XDR display 3024-by-1964 native
              resolution at 254 pixels per inch -Optical Drive: None -Wireless:
              Wi-Fi 6E (802.11ax) + Bluetooth 5.3 -Audio : High-fidelity
              six-speaker sound system with force-cancelling woofers Wide stereo
              sound -Webcame: 1080p FaceTime HD camera Advanced image signal
              processor with computational video -Ports : Three Thunderbolt 4
              ports with support for: *Charging *DisplayPort *Thunderbolt 4 (up
              to 40Gb/s) *USB 4 (up to 40Gb/s) *3.5 mm headphone jack with
              advanced support for high-impedance headphones -Battery: M3 Pro
              Chip Up to 18 hours Apple TV app movie playback Up to 12 hours
              wireless web -Keyboard: Backlit Magic Keyboard Touch ID -Weight:
              3.5 pounds (1.61 kg) -Warranty: 1year warranty
            </TableCell>
            <TableCell>
              -CPU / Processor: Apple M3 Pro chip 12-core CPU with 6 performance
              cores and 6 efficiency cores 18-core GPU Hardware-accelerated ray
              tracing 16-core Neural Engine 150GB/s memory bandwidth -Operating
              System : macOS -RAM / Memory: 18GB unified memory -Storage: 1TB
              SSD -Graphic: Apple Integrated 18-core GPU -Display: 14.2-inch
              (diagonal) Liquid Retina XDR display 3024-by-1964 native
              resolution at 254 pixels per inch -Optical Drive: None -Wireless:
              Wi-Fi 6E (802.11ax) + Bluetooth 5.3 -Audio : High-fidelity
              six-speaker sound system with force-cancelling woofers Wide stereo
              sound -Webcame: 1080p FaceTime HD camera Advanced image signal
              processor with computational video -Ports : Three Thunderbolt 4
              ports with support for: *Charging *DisplayPort *Thunderbolt 4 (up
              to 40Gb/s) *USB 4 (up to 40Gb/s) *3.5 mm headphone jack with
              advanced support for high-impedance headphones -Battery: M3 Pro
              Chip Up to 18 hours Apple TV app movie playback Up to 12 hours
              wireless web -Keyboard: Backlit Magic Keyboard Touch ID -Weight:
              3.5 pounds (1.61 kg) -Warranty: 1year warranty
            </TableCell>
            <TableCell>
              -CPU / Processor: Apple M3 Pro chip 12-core CPU with 6 performance
              cores and 6 efficiency cores 18-core GPU Hardware-accelerated ray
              tracing 16-core Neural Engine 150GB/s memory bandwidth -Operating
              System : macOS -RAM / Memory: 18GB unified memory -Storage: 1TB
              SSD -Graphic: Apple Integrated 18-core GPU -Display: 14.2-inch
              (diagonal) Liquid Retina XDR display 3024-by-1964 native
              resolution at 254 pixels per inch -Optical Drive: None -Wireless:
              Wi-Fi 6E (802.11ax) + Bluetooth 5.3 -Audio : High-fidelity
              six-speaker sound system with force-cancelling woofers Wide stereo
              sound -Webcame: 1080p FaceTime HD camera Advanced image signal
              processor with computational video -Ports : Three Thunderbolt 4
              ports with support for: *Charging *DisplayPort *Thunderbolt 4 (up
              to 40Gb/s) *USB 4 (up to 40Gb/s) *3.5 mm headphone jack with
              advanced support for high-impedance headphones -Battery: M3 Pro
              Chip Up to 18 hours Apple TV app movie playback Up to 12 hours
              wireless web -Keyboard: Backlit Magic Keyboard Touch ID -Weight:
              3.5 pounds (1.61 kg) -Warranty: 1year warranty
            </TableCell>
          </TableRow>
        </TableBody>
      </Table> */}

      <ProductsComparisonTable products={productsComparison} topics={topics} />
    </section>
  );
};

export default ComparisonPage;
