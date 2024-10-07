"use client";
import React from "react";

import { Image } from "@nextui-org/react";
import { Promotion } from "./components/Promotion";
import ScrollingBanner from "@/components/CustomComponent/ScrollingBrandsBanner";
import SectionListProducts from "./components/SectionListProducts";
import Banner from "./components/Banner";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { BRANDS } from "@/graphql/brands";
import { BrandsType } from "@/types/product";
import { isDesktop } from "react-device-detect";

export default function Home() {
  return (
    <main className="min-h-96">
      <Banner />
      <BrandsScrolling />
      <>{isDesktop && <Promotion />}</>

      {/* most popular */}
      <SectionListProducts title="Most Popular" type="MOST POPULAR" />

      {/* new arrival */}
      <SectionListProducts title="New Arrival" type="NEW ARRIVAL" />

      {/* recommended */}
      <SectionListProducts title="Recommended" type="RECOMMENDED" />
    </main>
  );
}

const BrandsScrolling = () => {
  const { data, loading } = useQuery(BRANDS);

  if (loading || !data) {
    return;
  }

  // const logo = [
  //   {
  //     title: "Accer",
  //     src: "acer.png",
  //   },
  //   {
  //     title: "Adata",
  //     src: "adata.png",
  //   },
  //   {
  //     title: "Apc",
  //     src: "apc.png",
  //   },
  //   {
  //     title: "Apple",
  //     src: "apple.png",
  //   },
  //   {
  //     title: "Asus",
  //     src: "asus.png",
  //   },
  //   {
  //     title: "Canon",
  //     src: "canon.png",
  //   },
  //   {
  //     title: "Dahua",
  //     src: "dahua.png",
  //   },
  //   {
  //     title: "Dell",
  //     src: "dell.png",
  //   },
  //   {
  //     title: "Epson",
  //     src: "epson.png",
  //   },
  //   {
  //     title: "Hikvision",
  //     src: "hikvision.png",
  //   },
  //   {
  //     title: "Hp",
  //     src: "hp.png",
  //   },
  //   {
  //     title: "Ion",
  //     src: "ion.png",
  //   },
  //   {
  //     title: "Lelnovo",
  //     src: "lenovo.png",
  //   },
  //   {
  //     title: "Meki",
  //     src: "meki.png",
  //   },
  //   {
  //     title: "Microsoft",
  //     src: "microsoft.png",
  //   },
  //   {
  //     title: "Prolink",
  //     src: "prolink.png",
  //   },
  // ];

  return (
    <section className="mx-auto w-full bg-white h-20 sm:h-20 lg:h-36 flex items-center justify-start">
      <ScrollingBanner shouldPauseOnHover gap="40px">
        {data.storeOwnerBrands.map((b: BrandsType, idx: number) => (
          <Link
            href={`/products?brands=${b.title ? b.title?.en : ""}`}
            key={idx}
            className="flex items-center justify-center text-white w-12 sm:w-12 lg:w-20 object-contain aspect-square mix-blend-color-burn"
          >
            <Image
              alt={b.title?.en}
              radius="none"
              src={
                b.logo
                  ? `${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${b.logo}`
                  : "/images/default-thumbnail.png"
              }
              className="w-full h-full "
            />
          </Link>
        ))}
      </ScrollingBanner>
    </section>
  );
};
