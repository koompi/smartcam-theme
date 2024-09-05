import { GET_PRODUCT } from "@/graphql/product";
import { getClient } from "@/libs/client";
import { InMemoryCache } from "@apollo/client";
import { ResolvingMetadata, Metadata } from "next";
import React from "react";

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  if (!id) {
    console.error("Product ID is undefined in route params");
    return {};
  }

  const client = getClient();
  client.cache = new InMemoryCache(); // Ensure fresh cache

  try {
    const { data } = await client.query({
      query: GET_PRODUCT,
      variables: { slug: id },
      fetchPolicy: "no-cache", // Ensure fresh data fetch
    });

    if (!data || !data.storeProduct) {
      console.error("Product data not found for ID:", id);
      return {};
    }

    const product = data.storeProduct;

    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: product.product.title || "Default Title",
      description: product.product.brand || "Default Description",
      metadataBase: new URL("https://smartcam.riverbase.org"),
      openGraph: {
        title: {
          default: product.product.title || "Default Title",
          template: `%s - ${product.product.title || "Default Title"}`,
        },
        description: product.product.brand || "Default Description",
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${product.product.thumbnail}`,
            width: 1200,
            height: 630,
          },
          // ...previousImages,
        ],
        locale: "en-US",
        type: "website",
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      title: "Error",
      description: "Unable to fetch product data",
    };
  }
}

export default async function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
