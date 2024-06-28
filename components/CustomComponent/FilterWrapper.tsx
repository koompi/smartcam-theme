"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  RadioGroup,
  ScrollShadow,
  Switch,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import PriceSlider from "./PriceSlider";

// import ColorRadioItem from "./color-radio-item";
// import PriceSlider from "./price-slider";
// import RatingRadioGroup from "./rating-radio-group";
// import TagGroupItem from "./tag-group-item";
import { cn } from "@/utils/cn";

export enum FilterTypeEnum {
  Tabs = "tabs",
  PriceRange = "price_range",
  Rating = "rating",
  TagGroup = "tag_group",
  CheckboxGroup = "checkbox_group",
  Toggle = "toggle",
  Color = "color",
}

export type RangeValue = [number, number];

export type RangeFilter = {
  min: number;
  max: number;
  step: number;
  defaultValue: RangeValue;
};

export type Filter = {
  type: FilterTypeEnum;
  title: string;
  description?: string;
  range?: RangeFilter;
  defaultOpen?: boolean;
  options?: Array<{
    title: string;
    value: string;
    description?: string;
    icon?: string;
    color?: string;
  }>;
};

export type FiltersWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  items: Filter[];
  title?: string;
  showTitle?: boolean;
  showActions?: boolean;
  className?: string;
  scrollShadowClassName?: string;
};

const FiltersWrapper = React.forwardRef<HTMLDivElement, FiltersWrapperProps>(
  (
    {
      items,
      title = "Filters",
      showTitle = true,
      showActions = true,
      className,
      scrollShadowClassName,
    },
    ref
  ) => {
    const renderFilter = React.useCallback((filter: Filter) => {
      switch (filter.type) {
        case FilterTypeEnum.Tabs:
          return (
            <Tabs fullWidth aria-label={filter.title}>
              {filter.options?.map((option) => (
                <Tab key={option.value} title={option.title} />
              ))}
            </Tabs>
          );
        case FilterTypeEnum.PriceRange:
          return <PriceSlider aria-label={filter.title} range={filter.range} />;

        // case FilterTypeEnum.Rating:
        //   return <RatingRadioGroup />;

        // case FilterTypeEnum.TagGroup:
        //   return (
        //     <CheckboxGroup
        //       aria-label="Select amenities"
        //       className="gap-1"
        //       orientation="horizontal"
        //     >
        //       {filter.options?.map((option) => (
        //         <TagGroupItem
        //           key={option.value}
        //           icon={option.icon}
        //           value={option.value}
        //         >
        //           {option.title}
        //         </TagGroupItem>
        //       ))}
        //     </CheckboxGroup>
        //   );
        case FilterTypeEnum.Toggle:
          return (
            <div className="-mx-4 flex flex-col">
              {filter.options?.map((option) => (
                <Switch
                  key={option.value}
                  classNames={{
                    base: cn(
                      "inline-flex flex-row-reverse w-full bg-content1 hover:bg-content2 items-center",
                      "justify-between cursor-pointer rounded-lg gap-2 -mr-2 px-4 py-3"
                    ),
                    wrapper: "mr-0",
                  }}
                  value={option.value}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-medium">{option.title}</p>
                    <p className="text-tiny text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </Switch>
              ))}
            </div>
          );
        case FilterTypeEnum.CheckboxGroup:
          return (
            <Accordion
              className="px-0"
              defaultExpandedKeys={filter?.defaultOpen ? ["options"] : []}
            >
              <AccordionItem
                key="options"
                classNames={{
                  title: "text-medium font-medium leading-8 text-black",
                  trigger: "p-0",
                  content: "px-1",
                }}
                title={filter.title}
              >
                <CheckboxGroup aria-label={filter.title}>
                  {filter.options?.map((option) => (
                    <Checkbox key={option.value} value={option.value}>
                      <p className="text-gray-700">{option.title}</p>
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </AccordionItem>
            </Accordion>
          );
        // case FilterTypeEnum.Color:
        //   return (
        //     <RadioGroup
        //       aria-label={filter.title}
        //       classNames={{
        //         wrapper: "gap-2",
        //       }}
        //       orientation="horizontal"
        //     >
        //       {filter.options?.map((option) => (
        //         <ColorRadioItem
        //           key={option.value}
        //           color={option.color}
        //           tooltip={option.title}
        //           value={option.value}
        //         />
        //       ))}
        //     </RadioGroup>
        //   );
      }
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          "h-full max-h-fit overflow-hidden w-full rounded-medium p-6",
          className
        )}
      >
        {showTitle && (
          <>
            <h2 className="text-large font-medium text-black">{title}</h2>
            <Divider className="my-3 bg-gray-200" />
          </>
        )}
        <ScrollShadow
          className={cn(
            "-mx-6 h-full px-6 ",
            {
              "max-h-[calc(100%_-_220px)]": showActions,
            },
            scrollShadowClassName
          )}
        >
          <div className="flex flex-col gap-6 text-danger">
            {items.map((filter) => (
              <div key={filter.title} className="flex flex-col gap-3">
                {filter.type !== FilterTypeEnum.CheckboxGroup ? (
                  <div>
                    <h3 className="text-medium font-medium leading-8 text-black">
                      {filter.title}
                    </h3>
                    <p className="text-small text-black">
                      {filter.description}
                    </p>
                  </div>
                ) : null}
                {renderFilter(filter)}
              </div>
            ))}
          </div>
        </ScrollShadow>

        <Button size="lg" color="primary" variant="flat" fullWidth radius="lg">
          Clear all filters
        </Button>
        {/* {showActions && (
          <>
            <Divider className="my-6 bg-gray-200" />

            <div className="mt-auto flex flex-col gap-2">
              <Button
                color="primary"
                startContent={
                  <Icon
                    className="text-primary-foreground [&>g]:stroke-[3px]"
                    icon="solar:magnifer-linear"
                    width={16}
                  />
                }
              >
                Show 300+ stays
              </Button>
              <Button size="lg" color="primary" variant="flat">
                Clear all filters
              </Button>
            </div>
          </>
        )} */}
      </div>
    );
  }
);

FiltersWrapper.displayName = "FiltersWrapper";

export default FiltersWrapper;
