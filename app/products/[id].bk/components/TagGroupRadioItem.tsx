"use client";

import type { RadioProps } from "@nextui-org/react";

import React from "react";
import {
  VisuallyHidden,
  useRadio,
  useRadioGroupContext,
} from "@nextui-org/react";

import { cn } from "@/utils/cn";

export type TagGroupRadioItemProps = Omit<RadioProps, "icon"> & {
  icon?: string;
};

const TagGroupRadioItem = React.forwardRef<
  HTMLLabelElement,
  TagGroupRadioItemProps
>(({ icon, ...props }, ref) => {
  const {
    Component,
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
  } = useRadio(props);

  const groupContext = useRadioGroupContext();

  const isReadOnly = groupContext.groupState.isReadOnly;
  const size = props.size || groupContext.size || "md";
  const color = props.color || groupContext.color || "primary";

  const baseProps = getBaseProps();

  const colors = React.useMemo(() => {
    switch (color) {
      case "primary":
        return {
          bg: "border-primary",
          fg: "text-primary-foreground",
        };
      case "secondary":
        return {
          bg: "border-secondary",
          fg: "text-secondary-foreground",
        };
      case "success":
        return {
          bg: "border-success",
          fg: "text-success-foreground",
        };
      case "warning":
        return {
          bg: "border-warning",
          fg: "text-warning-foreground",
        };
      case "danger":
        return {
          bg: "border-danger",
          fg: "text-danger-foreground",
        };
      default:
        return {
          bg: "border-primary",
          fg: "text-primary-foreground",
        };
    }
  }, [color]);

  return (
    <Component
      {...baseProps}
      ref={ref}
      className={cn(
        "group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse",
        "cursor-pointer border border-default rounded-lg",
        "data-[selected=true]:border-primary"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      {/* <Chip
        classNames={{
          base: cn({
            "ring-2 ring-focus ring-offset-2 ring-offset-background":
              isFocusVisible,
            [colors.bg]: isSelected,
          }),
          content: cn("!text-small text-default-400", {
            [colors.fg]: isSelected,
            "pr-1": !!icon,
          }),
        }}
        radius="sm"
        size={size}
        startContent={
          icon ? (
            <Icon
              className={cn("text-default-400", {
                [colors.fg]: isSelected,
              })}
              icon={icon}
              width={16}
            />
          ) : undefined
        }
        variant={isSelected ? "bordered" : "flat"}
        {...getLabelProps()}
      >
        {children}
      </Chip> */}
      {/* <div>{children && <span {...getLabelProps()}>{children}</span>}</div> */}
      <div>{children}</div>
    </Component>
  );
});

TagGroupRadioItem.displayName = "TagGroupRadioItem";

export default TagGroupRadioItem;
