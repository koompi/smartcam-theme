"use client";

import React, { FC } from "react";
import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-gray-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
        content: "text-white pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

export const CustomCheckbox: FC<any> = (props) => {
  const { children, isSelected, isFocusVisible, getBaseProps, getInputProps } =
    useCheckbox({
      ...props,
    });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        size="lg"
        color="primary"
        startContent={
          isSelected ? (
            <Icon icon="material-symbols:check" className="text-white" />
          ) : null
        }
        variant="bordered"
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};
