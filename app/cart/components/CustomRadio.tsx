"use client";

import type { RadioProps } from "@nextui-org/react";
import React from "react";
import { Chip, Radio } from "@nextui-org/react";

import { cn } from "@/utils/cn";

export type CustomRadioProps = RadioProps & {
  icon?: React.ReactNode;
  label?: string;
  isExpired?: boolean;
  isRecommended?: boolean;
  chip?: string;
};

const CustomRadio = React.forwardRef<HTMLInputElement, CustomRadioProps>(
  (
    {
      label,
      children,
      description,
      icon,
      isExpired,
      isRecommended,
      chip,
      classNames = {},
      className,
      ...props
    },
    ref
  ) => (
    <Radio
      ref={ref}
      {...props}
      classNames={{
        ...classNames,
        base: cn(
          "inline-flex m-0 px-3 py-4 max-w-[100%] items-center justify-between",
          "flex-row-reverse w-full cursor-pointer rounded-lg 3 !border-medium border-default-100",
          "data-[selected=true]:border-primary",
          classNames?.base,
          className
        ),
        labelWrapper: cn("ml-0", classNames?.labelWrapper),
      }}
      color="primary"
    >
      <div className="flex w-full items-center gap-3">
        <div className="item-center flex p-2">{icon}</div>
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-3">
            <p className="text-small line-clamp-2">{label}</p>
            {isExpired && (
              <Chip className="h-6 p-0 text-tiny" color="danger">
                Expired
              </Chip>
            )}
            {isRecommended && !chip && (
              <Chip
                className="h-6 p-0 text-tiny"
                color="success"
                variant="flat"
              >
                Recommended
              </Chip>
            )}
            {chip && !isRecommended && (
              <Chip className="h-6 p-0 text-tiny" color="danger" variant="flat">
                {chip}
              </Chip>
            )}
          </div>
          <p className="text-tiny text-default-400">
            {description || children}
          </p>
        </div>
      </div>
    </Radio>
  )
);

CustomRadio.displayName = "CustomRadio";

export default CustomRadio;
