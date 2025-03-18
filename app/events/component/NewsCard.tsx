"use client";

import { UserType } from "@/types/user";
import { cn } from "@/utils/cn";
import { Skeleton, Image } from "@nextui-org/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React, { FC } from "react";

export type CardItems = {
  id?: string;
  title: string;
  href: string;
  description?: string;
  thumbnail: string;
  isLoading: boolean;
  classNames?: string;
  owner: UserType;
  createdAt: string;
  isBanner: boolean;
};

const NewsCard: FC<CardItems> = ({
  title,
  href,
  description,
  thumbnail,
  isLoading,
  classNames,
  owner,
  createdAt,
  isBanner,
}) => {
  dayjs.extend(relativeTime);

  return (
    <Link
      href={href}
      className={cn(
        "relative flex w-full flex-none flex-col gap-3 shadow-none group",
        classNames
      )}
    >
      {isBanner ? (
        <Image
          alt={title}
          className="h-[60dvh] w-screen overflow-hidden object-cover object-center"
          isLoading={isLoading}
          isBlurred
          isZoomed
          src={
            thumbnail
              ? `${process.env.NEXT_PUBLIC_S3}/${thumbnail}`
              : "/images/default-thumbnail.png"
          }
        />
      ) : (
        <Image
          isBlurred
          isZoomed
          alt={title}
          className="aspect-video w-full bg-slate-100 object-cover object-center"
          isLoading={isLoading}
          src={
            thumbnail
              ? `${process.env.NEXT_PUBLIC_S3}/${thumbnail}`
              : "/images/default-thumbnail.png"
          }
        />
      )}

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
              <p className="text-sm text-gray-400">
                {owner?.username ? owner?.username : owner?.first_name}
              </p>
              <p className="text-sm text-gray-400">
                {dayjs(createdAt?.split(" ")[0]).fromNow()}
              </p>
            </div>
            <div className="flex items-start justify-between gap-1">
              <h3
                className={cn(
                  "text-lg font-medium text-gray-700 line-clamp-3 group-hover:underline",
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
