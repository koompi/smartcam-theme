"use client";

import type { CheckboxProps } from "@nextui-org/react";

import React from "react";
import { Chip, VisuallyHidden, useCheckbox, cn } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export type TagGroupItemProps = Omit<CheckboxProps, "icon"> & {
  icon?: string;
};

const TagGroupItem = React.forwardRef<HTMLLabelElement, TagGroupItemProps>(
  ({ icon, size = "md", ...props }, ref) => {
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
      <label {...getBaseProps()} ref={ref}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>

        <Chip
          classNames={{
            base: cn({
              "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background":
                isFocusVisible,
              "bg-primary": isSelected,
            }),
            content: cn("!text-small text-gray-400", {
              "text-primary-white": isSelected,
              "pr-1": !!icon,
            }),
          }}
          radius="full"
          size={size}
          startContent={
            icon ? (
              <Icon
                className={cn("text-gray-400", {
                  "text-primary-white": isSelected,
                })}
                icon={icon}
                width={16}
              />
            ) : undefined
          }
          variant="flat"
          {...(getLabelProps() as any)}
        >
          {children}
        </Chip>
      </label>
    );
  }
);

TagGroupItem.displayName = "TagGroupItem";

export default TagGroupItem;
