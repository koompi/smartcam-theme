import { BLOG } from "@/graphql/cms";
import { getClient } from "@/libs/client";
import { InMemoryCache } from "@apollo/client";
import { ResolvingMetadata, Metadata } from "next";
import React from "react";

interface Props {
  params: { eventId: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.eventId;

  if (!id) {
    console.error("Blog ID is undefined in route params");
    return {};
  }

  const client = getClient();
  client.cache = new InMemoryCache(); // Ensure fresh cache

  try {
    const { data } = await client.query({
      query: BLOG,
      variables: { storeBlogByIdId: id },
      fetchPolicy: "no-cache", // Ensure fresh data fetch
    });

    if (!data || !data.storeBlogById) {
      console.error("Blog data not found for ID:", id);
      return {};
    }

    const blog = data.storeBlogById;

    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: blog.title || "Default Title",
      description: blog?.owner?.username,
      metadataBase: new URL("https://smartcam-electronic.com.kh/"),
      openGraph: {
        title: {
          default: blog.title || "Default Title",
          template: `%s - ${blog.title || "Default Title"}`,
        },
        description: blog?.owner?.username,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_S3}/${blog.thumbnail}`,
            width: 1200,
            height: 630,
          },
          ...previousImages,
        ],
        locale: "en-US",
        type: "website",
      },
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      title: "Error",
      description: "Unable to fetch blog data",
    };
  }
}

export default async function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
