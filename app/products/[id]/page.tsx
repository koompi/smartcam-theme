import React from "react";
import dynamic from "next/dynamic";
import { GET_PRODUCT } from "@/graphql/product";
import { getClient } from "@/libs/client";
import { ResolvingMetadata, Metadata } from "next";
import "@/styles/editor.css";

const ProductDetail = dynamic(() => import("./component/ProductDetail"));

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  const client = getClient();

  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: { slug: id },
  });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data?.storeProduct?.title,
    description: data?.storeProduct?.desc,

    openGraph: {
      title: {
        default: data?.storeProduct?.title,
        template: `%s - ${data?.storeProduct?.title}`,
      },
      description: data?.storeProduct?.desc,
      images: [
        {
          url:
            process.env.NEXT_PUBLIC_DRIVE ??
            `https://drive.backend.riverbase.org/api/drive?hash=${data?.storeProduct?.previews[0]}`,
          width: 800,
          height: 600,
        },
        {
          url:
            process.env.NEXT_PUBLIC_DRIVE ??
            `https://drive.backend.riverbase.org/api/drive?hash=${data?.storeProduct?.previews[0]}`,
          width: 1800,
          height: 1600,
        },
        ...previousImages,
      ],
      locale: "en-US",
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section className="px-0 sm:px-0 lg:px-6 mx-auto py-3 sm:py-3 lg:py-6">
      <ProductDetail slug={params.id} />
    </section>
  );
}
