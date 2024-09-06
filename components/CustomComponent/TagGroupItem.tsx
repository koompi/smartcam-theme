"use client";

import type { CheckboxProps } from "@nextui-org/react";
import React from "react";
import { Chip, VisuallyHidden, useCheckbox } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";

// Define the prop types and omit the "icon" from CheckboxProps
export type TagGroupItemProps = Omit<CheckboxProps, "icon"> & {
  icon?: string;
};

const TagGroupItem = React.forwardRef<any, TagGroupItemProps>(
  ({ icon, size, ...props }, ref) => {
    // Extract necessary properties using the useCheckbox hook
    const {
      children,
      isSelected,
      isFocusVisible,
      getBaseProps,
      getLabelProps,
      getInputProps,
    } = useCheckbox({
      ...props,
    });

    return (
      <label {...getBaseProps()}>
        {/* Visually hidden input */}
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>

        <Chip
          // @ts-ignore
          ref={ref as React.Ref<HTMLDivElement | null>}
          classNames={{
            base: cn({
              "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background":
                isFocusVisible,
              "bg-primary": isSelected,
            }),
            content: cn("!text-small text-gray-600 font-medium", {
              "text-background": isSelected,
              "pr-1": !!icon,
            }),
          }}
          radius="lg"
          size={size}
          color={isSelected ? "primary" : "default"}
          startContent={
            icon ? (
              <Icon
                className={cn("text-default-400", {
                  "text-primary-foreground": isSelected,
                })}
                icon={icon}
                width={16}
              />
            ) : undefined
          }
          variant={isSelected ? "shadow" : "flat"}
          {...getLabelProps()}
        >
          {children}
        </Chip>
      </label>
    );
  }
);

TagGroupItem.displayName = "TagGroupItem";

export default TagGroupItem;
