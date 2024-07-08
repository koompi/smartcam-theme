"use client";
import React from "react";

import { Image } from "@nextui-org/react";
import { Promotion } from "./components/Promotion";
import ScrollingBanner from "@/components/CustomComponent/ScrollingBrandsBanner";
import SectionListProducts from "./components/SectionListProducts";
// import { products } from "@/data/products";
import Banner from "./components/Banner";
import Link from "next/link";
import { GET_ALL_PRODUCTS, GLOBAL_PRODUCT_FILTERING } from "@/graphql/product";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { Loading, CardLoading } from "@/components/globals/Loading";

export default function Home() {
  // const searchParams = useSearchParams();
  // const search = searchParams.get("search") || null;
  // const cat = searchParams.get("category") || null;
  // const sub = searchParams.get("sub_category") || null;
  // const page = (searchParams.get("page") as string) || "1";
  // const size = (searchParams.get("size") as string) || "16";
  // const minPice = (searchParams.get("min_price") as string) || null;
  // const maxPice = (searchParams.get("max_price") as string) || null;
  // const sortParam = (searchParams.get("sort") as string) || null;
  // const price =
  //   ["price_low_to_high", "price_high_to_low"].includes(sortParam as string) ||
  //   null;
  // const brands = searchParams.get("brands") || null;
  // let limit = parseInt(size as string);
  // let rangePrice = minPice
  //   ? {
  //       start: parseInt(minPice as string),
  //       end: parseInt(maxPice as string),
  //     }
  //   : null;
  // let skip =
  //   parseInt(page as string) > 1
  //     ? (parseInt(size as string) / 2) * parseInt(page as string) + 1
  //     : 0;

  // const { data: products } = useQuery(GLOBAL_PRODUCT_FILTERING, {
  //   variables: {
  //     tagId: brands ? brands : cat ? (sub ? [sub] : [cat]) : search ? [] : null,
  //     keyword: search ? search : search,
  //     status: price ? "price" : null,
  //     range: rangePrice,
  //     filter: {
  //       limit: limit,
  //       skip: skip,
  //       sort: price ? (sortParam == "price_low_to_high" ? 1 : -1) : -1,
  //     },
  //   },
  // });

  const { data: products, loading } = useQuery(GET_ALL_PRODUCTS, {
    variables: {
      filter: {
        limit: 10,
        skip: 0,
        sort: -1,
      },
    },
  });

  return (
    <main className="min-h-96">
      <Banner />
      <BrandsScrolling />
      <Promotion />
      {/* most popular */}
      {loading || !products ? (
        <CardLoading />
      ) : (
        <SectionListProducts
          title="Most Popular"
          data={products?.storeProducts?.products?.slice(0, 7)}
        />
      )}

      {/* new arrival */}
      {/* <SectionListProducts title="New Arrival" data={products.slice(0, 7)} /> */}

      {/* recommended */}
      {/* <SectionListProducts title="Recommended" data={products.slice(0, 7)} /> */}
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
