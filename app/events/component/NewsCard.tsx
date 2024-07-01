"use client";

import { cn } from "@/utils/cn";
import { Skeleton, Image } from "@nextui-org/react";
import Link from "next/link";
import React, { FC } from "react";

export type CardItems = {
  title: string;
  href: string;
  description?: string;
  imageSrc: string;
  isLoading: boolean;
  isBanner: boolean;
  classNames?: string;
  author: string;
  createdAt: string;
};

const NewsCard: FC<CardItems> = ({
  title,
  href,
  description,
  imageSrc,
  isLoading,
  isBanner,
  classNames,
  author,
  createdAt,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex w-full flex-none flex-col gap-3 shadow-none",
        classNames
      )}
    >
      <Image
        isBlurred
        isZoomed
        alt={title}
        className="aspect-video w-full hover:scale-110"
        isLoading={isLoading}
        src={imageSrc}
      />

      <div className="mt-1 flex flex-col gap-2 px-1">
        {isLoading ? (
          <div className="my-1 flex flex-col gap-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-gray-200" />
            </Skeleton>
            <Skeleton className="mt-3 w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-gray-200" />
            </Skeleton>
            <Skeleton className="mt-4 w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-gray-300" />
            </Skeleton>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <p className="text-sm text-gray-400">{author}</p>
              <p className="text-sm text-gray-400">{createdAt}</p>
            </div>
            <div className="flex items-start justify-between gap-1">
              <h3
                className={cn(
                  "text-md font-normal text-gray-700 line-clamp-3",
                  {
                    "line-clamp-2 font-medium text-black text-xl": isBanner,
                  }
                )}
              >
                {title}
              </h3>
            </div>
            {description ? (
              <p className="text-small text-gray-500">{description}</p>
            ) : null}
          </>
        )}
      </div>
    </Link>
  );
};

export default NewsCard;
