"use client";

import type { PopoverProps } from "@nextui-org/react";

import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";

export type PopoverFilterWrapperProps = Omit<PopoverProps, "children"> & {
  title?: string;
  children: React.ReactNode;
  priceRange: number[];
};

const PopoverFilterWrapper = React.forwardRef<
  HTMLDivElement,
  PopoverFilterWrapperProps
>(({ title, children, priceRange, ...props }, ref) => {
  const { isOpen, onClose, onOpenChange } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = useSearchParams();
  const brands = searchParams.get("brands") || null;
  const cat = searchParams.get("category") || null;
  const sub = searchParams.get("sub_category") || null;
  const sortParam = searchParams.get("sort") || null;
  const min = searchParams.get("min_price") || null;
  const max = searchParams.get("max_price") || null;

  const handleApply = useCallback(() => {
    router.push(
      `/products?search=${
        search.get("search") ? search.get("search") : ""
      }&brands=${brands ? brands : ""}&category=${
        cat ? cat : ""
      }&sub_category=${
        sub ? sub : ""
      }&sort=${sortParam ? sortParam : ""}&min_price=${priceRange[0]}&max_price=${priceRange[1]}`
    );
    onClose();
  }, [priceRange, router, onClose]);

  return (
    <Popover ref={ref} isOpen={isOpen} onOpenChange={onOpenChange} {...props}>
      <PopoverTrigger>
        <Button
          className="border-gray-200 text-gray-white"
          endContent={<Icon icon="solar:alt-arrow-down-linear" />}
          variant="bordered"
          radius="full"
        >
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex max-w-xs flex-col items-start gap-2 px-4 pt-4">
        <span className="mb-2 text-medium font-medium text-gray-600">
          {title}
        </span>
        {/* <div className="w-full px-2">
          {React.cloneElement(children as React.ReactElement, {
            onChange: handlePriceChange,
            value: priceRange,
          })}
        </div> */}
        <div className="w-full px-2">{children}</div>
        <Divider className="mt-3 bg-gray-100" />
        <div className="flex w-full justify-end gap-2 py-2">
          <Button
            size="sm"
            radius="lg"
            color="danger"
            variant="light"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            size="sm"
            radius="lg"
            variant="flat"
            onPress={handleApply}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
});

PopoverFilterWrapper.displayName = "PopoverFilterWrapper";

export default PopoverFilterWrapper;
