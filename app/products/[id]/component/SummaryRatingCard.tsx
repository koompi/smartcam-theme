"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button, Progress } from "@nextui-org/react";

import { cn } from "@/utils/cn";

export type SummaryRatingCardProps = React.HTMLAttributes<HTMLDivElement> & {
  ratings: {
    rating: number;
    count: number;
  }[];
  totalRatingCount: number;
  averageRating: number;
  onWriteReview?: () => void;
};

const SummaryRatingCard = React.forwardRef<
  HTMLDivElement,
  SummaryRatingCardProps
>(
  (
    {
      className,
      ratings,
      totalRatingCount,
      averageRating,
      onWriteReview,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-2 rounded-xl p-1 sm:p-1 lg:p-6 shadow-none sm:shadow-none lg:shadow-small",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Icon className="text-danger" icon="solar:star-bold" width={20} />
        <span className="text-large font-semibold text-black">
          {averageRating}
        </span>
        <span className="text-default-500">
          • (Based on {totalRatingCount} reviews)
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {ratings.map(({ rating, count }, index) => {
          const percentage = (count / totalRatingCount) * 100;

          return (
            <div key={index} className="flex items-center gap-1">
              <Progress
                showValueLabel
                aria-label={`${rating} stars`}
                color="danger"
                label={
                  <span className="text-small text-gray-500">{`${rating} ${
                    rating > 1 ? "stars" : "star"
                  }`}</span>
                }
                value={percentage}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex w-full flex-col gap-4">
        <Button
          fullWidth
          radius="full"
          startContent={<Icon icon="solar:pen-bold" />}
          variant="bordered"
          onClick={onWriteReview}
          color="primary"
        >
          Write a review
        </Button>
        <p className="px-2 text-small text-default-500">
          Share your experience with this product
        </p>
      </div>
    </div>
  )
);

SummaryRatingCard.displayName = "SummaryRatingCard";

export default SummaryRatingCard;
