"use client";

import type { RadioProps } from "@nextui-org/react";

import React from "react";
import { Tooltip, VisuallyHidden, useRadio } from "@nextui-org/react";

import { cn } from "@/utils/cn";

export type LocationLabelProps = Omit<RadioProps, "color"> & {
  color?: string;
  tooltip?: string;
};

const LocationLabel = React.forwardRef<HTMLInputElement, LocationLabelProps>(
  ({ color, tooltip, ...props }, ref) => {
    const {
      Component,
      isSelected,
      isFocusVisible,
      getBaseProps,
      getInputProps,
    } = useRadio(props);

    return (
      <Tooltip
        content={tooltip}
        delay={1000}
        isDisabled={!tooltip}
        offset={0}
        placement="top"
      >
        <Component {...getBaseProps()} ref={ref}>
          <VisuallyHidden>
            <input {...getInputProps()} />
          </VisuallyHidden>
          <span
            className={cn(
              "pointer-events-none h-8 w-auto px-6 flex items-center rounded-full border border-black border-opacity-10 transition-transform group-data-[pressed=true]:scale-90",
              {
                "ring-2 ring-offset-2 ring-offset-content1 bg-primary text-background":
                  isSelected,
              }
            )}
            style={{
              backgroundColor: color,
              // @ts-ignore
              "--tw-ring-color":
                isSelected || isFocusVisible
                  ? "hsl(var(--nextui-primary))"
                  : "transparent",
            }}
          >
            {props.value}
          </span>
        </Component>
      </Tooltip>
    );
  }
);

LocationLabel.displayName = "LocationLabel";

export default LocationLabel;
