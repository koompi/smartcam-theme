"use client";
import React from "react";

import { Image } from "@nextui-org/react";
import { Promotion } from "./components/Promotion";
import ScrollingBanner from "@/components/CustomComponent/ScrollingBrandsBanner";
import SectionListProducts from "./components/SectionListProducts";
import { products } from "@/data/products";
import Banner from "./components/Banner";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-96">
      <Banner />
      <BrandsScrolling />
      <Promotion />
      {/* most popular */}
      <SectionListProducts title="Most Popular" data={products.slice(0, 7)} />

      {/* new arrival */}
      <SectionListProducts title="New Arrival" data={products.slice(0, 7)} />

      {/* recommended */}
      <SectionListProducts title="Recommended" data={products.slice(0, 7)} />
    </main>
  );
}

export const BrandsScrolling = () => {
  const logo = [
    {
      title: "Accer",
      src: "acer.png",
    },
    {
      title: "Adata",
      src: "adata.png",
    },
    {
      title: "Apc",
      src: "apc.png",
    },
    {
      title: "Apple",
      src: "apple.png",
    },
    {
      title: "Asus",
      src: "asus.png",
    },
    {
      title: "Canon",
      src: "canon.png",
    },
    {
      title: "Dahua",
      src: "dahua.png",
    },
    {
      title: "Dell",
      src: "dell.png",
    },
    {
      title: "Epson",
      src: "epson.png",
    },
    {
      title: "Hikvision",
      src: "hikvision.png",
    },
    {
      title: "Hp",
      src: "hp.png",
    },
    {
      title: "Ion",
      src: "ion.png",
    },
    {
      title: "Lelnovo",
      src: "lenovo.png",
    },
    {
      title: "Meki",
      src: "meki.png",
    },
    {
      title: "Microsoft",
      src: "microsoft.png",
    },
    {
      title: "Prolink",
      src: "prolink.png",
    },
  ];

  return (
    <section className="mx-auto w-full bg-foreground h-20 sm:h-20 lg:h-36 flex items-center justify-start">
      <ScrollingBanner shouldPauseOnHover gap="40px">
        {logo.map((b, idx) => (
          <Link
            href="/products"
            key={idx}
            className="flex items-center justify-center text-foreground w-12 sm:w-12 lg:w-20"
          >
            <Image
              alt={b.title}
              radius="none"
              src={`/images/brands/${b.src}`}
              className="w-full h-full object-cover"
            />
          </Link>
        ))}
      </ScrollingBanner>
    </section>
  );
};
