"use client";

import React, { MouseEvent } from "react";
import { useAnimate } from "framer-motion";
import { Image, Spacer, Spinner } from "@nextui-org/react";
import { BRANDS } from "@/graphql/brands";
import { useQuery } from "@apollo/client";
import { BrandsType } from "@/types/product";
import Link from "next/link";

export const ClientGridCard = () => {
  return (
    <div className="bg-neutral-50 px-4 py-0 sm:py-0 lg:py-12" id="customers">
      <div className="mx-auto container">
        <h1 className="text-2xl sm:text-2xl lg:text-5xl font-bold text-center">
          Authorized Reseller
        </h1>
        <Spacer y={9} />
        <ClipPathLinks />
      </div>
    </div>
  );
};

const ClipPathLinks = () => {
  const { data, loading } = useQuery(BRANDS);

  if (loading || !data) {
    return (
      <div className="w-full grid place-items-center">
        <Spinner label="Loading ..." size="lg" color="primary" />
      </div>
    );
  }

  // Function to divide brands into rows of increasing sizes (pyramid structure)
  const getPyramidRows = (brands: any) => {
    const rows = [];
    const pattern = [3, 4, 5]; // This pattern will repeat

    let index = 0;
    let patternIndex = 0;

    while (index < brands?.length) {
      const itemsInRow = pattern[patternIndex];
      rows.push(brands.slice(index, index + itemsInRow));
      index += itemsInRow;
      patternIndex = (patternIndex + 1) % pattern.length; // Cycle through the pattern
    }

    return rows;
  };

  const rows = getPyramidRows(data?.storeOwnerBrands);

  return (
    <div className="divide-y divide-gray-300 border border-gray-300">
      {rows.map((row, rowIndex) => {
        return (
          <div
            key={rowIndex}
            className={`grid grid-cols-${row?.length} gap-4 divide-x divide-gray-300`}
          >
            {row.map((brand: BrandsType) => (
              <Link
                key={brand?.id}
                href={`/products?brands=${brand?.title?.en}`}
              >
                <LinkBox
                  Logo={`${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${brand?.logo}`}
                />
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

type Side = "top" | "left" | "bottom" | "right";
type KeyframeMap = {
  [key in Side]: string[];
};

const ENTRANCE_KEYFRAMES: KeyframeMap = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES: KeyframeMap = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Logo }: { Logo: string }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: MouseEvent) => {
    const box = (e.target as HTMLElement).getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left" as Side,
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right" as Side,
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top" as Side,
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom" as Side,
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e: MouseEvent) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e: MouseEvent) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <div
      onMouseEnter={(e) => {
        handleMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave(e);
      }}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36"
    >
      <Image
        alt="logo"
        radius="none"
        src={Logo}
        className="w-12 sm:w-12 lg:w-32"
      />
      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 grid place-content-center bg-gray-200 text-white"
      >
        <Image
          alt="logo"
          radius="none"
          src={Logo}
          className="w-12 sm:w-12 lg:w-32"
        />
      </div>
    </div>
  );
};
