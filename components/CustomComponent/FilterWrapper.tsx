"use client";

import React, { useState, useCallback } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Chip,
  Divider,
  Radio,
  RadioGroup,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { cn } from "@/utils/cn";

// import ColorRadioItem from "./color-radio-item";
import PriceSlider from "./PriceSlider";
import { Category, SubCategory } from "@/types/category";
import { useSearchParams } from "next/navigation";
import SidebarDrawer from "./SidebarDrawer";
import { BRANDS } from "@/graphql/brands";
import { useQuery } from "@apollo/client";
import { BrandsType } from "@/types/product";

export type RangeValue = [number, number];

export type RangeFilter = {
  min: number;
  max: number;
  step: number;
  defaultValue: RangeValue;
};

export enum FilterTypeEnum {
  Tabs = "tabs",
  PriceRange = "price_range",
  Rating = "rating",
  TagGroup = "tag_group",
  CheckboxGroup = "checkbox_group",
  Toggle = "toggle",
  Color = "color",
}

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
  categories: Category[];
  title?: string;
  showTitle?: boolean;
  showActions?: boolean;
  className?: string;
  scrollShadowClassName?: string;
  total: number;
  onCloseBase: () => void;
};

const FiltersWrapper = React.forwardRef<HTMLDivElement, FiltersWrapperProps>(
  (
    {
      title = "Filters",
      showTitle = true,
      className,
      categories,
      total,
      onCloseBase,
    },
    ref
  ) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || null;
    const cat = searchParams.get("category") || null;
    const sub = searchParams.get("sub_category") || null;
    const sortParam = searchParams.get("sort") || null;
    const min = searchParams.get("min_price") || null;
    const max = searchParams.get("max_price") || null;
    const brands = searchParams.get("brands") || null;
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);

    const [selected, setSelected] = useState(sub);
    const [subcat, setSubCat] = useState<SubCategory[]>();

    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

    const { data, loading } = useQuery(BRANDS);

    const handleApply = useCallback(() => {
      router.push(
        `/products?search=${
          search ? search : ""
        }&brands=${brands ? brands : ""}&category=${
          cat ? cat : ""
        }&sub_category=${
          sub ? sub : ""
        }&sort=${sortParam ? sortParam : ""}&min_price=${priceRange[0]}&max_price=${priceRange[1]}`
      );
      onClose();
      setPriceRange([0, 1500]);
    }, [priceRange, router, onClose]);

    // const price_slider = React.useMemo(() => {
    //   console.log("price", min, max);
    //   return (
    //     <PriceSlider
    //       aria-label="Pricing Filter"
    //       range={{
    //         min: 0,
    //         defaultValue: [
    //           min ? parseInt(min as string) : 0,
    //           max ? parseInt(max as string) : 1500,
    //         ],
    //         max: 3000,
    //         step: 1,
    //       }}
    //       setPriceRange={setPriceRange}
    //     />
    //   );
    // }, [min, max]);

    // console.log("price", min, max);

    return (
      <>
        <div className="block sm:block lg:hidden">
          <SidebarDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
            <div className="px-6 py-3">
              <h3 className="text-medium font-medium leading-8 text-default-600">
                Categories
              </h3>
              <div className="flex flex-col gap-1 items-center container mx-auto py-3">
                {subcat?.map((sub: SubCategory, idx: number) => {
                  return (
                    <Button
                      key={idx}
                      variant="light"
                      size="sm"
                      className="text-start w-full justify-start"
                      onClick={() => {
                        router.push(
                          `?search=${search ? search : ""}&brands=${brands ? brands : ""}&category=${
                            cat ? cat : ""
                          }&sub_category=${sub?.id ? sub?.id : ""}&sort=${
                            sortParam ? sortParam : ""
                          }`
                        );
                        onClose();
                        onCloseBase();
                      }}
                    >
                      <span className="text-sm w-full flex items-center justify-between gap-3">
                        {sub?.title?.en}{" "}
                        {sub?.products > 0 && (
                          <Chip size="sm" color="primary" variant="flat">
                            {sub?.products}
                          </Chip>
                        )}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </SidebarDrawer>
        </div>
        <div
          ref={ref}
          className={cn(
            "h-full w-full max-w-sm rounded-medium bg-content1 p-6 pb-16 ",
            className
          )}
        >
          {showTitle && (
            <>
              <h2 className="text-xl font-semibold text-foreground">{title}</h2>
              <Divider className="my-3 bg-default-100" />
            </>
          )}

          {/* Price range */}
          <h3 className="text-lg font-semibold leading-8 text-default-600">
            Price Range
          </h3>
          {/* {price_slider} */}
          <PriceSlider
            aria-label="Pricing Filter"
            range={{
              min: 0,
              defaultValue: [
                min ? parseInt(min as string) : 0,
                max ? parseInt(max as string) : 1500,
              ],
              max: 3000,
              step: 1,
            }}
            setPriceRange={setPriceRange}
          />

          {(priceRange[0] !== 0 || priceRange[1] !== 1500) && (
            <>
              <Divider className="mt-3 bg-gray-100" />
              <Button
                color="primary"
                radius="lg"
                variant="flat"
                fullWidth
                onPress={handleApply}
              >
                Apply
              </Button>
            </>
          )}

          {/* Brands */}

          <div className="mt-6">
            <h3 className="text-lg font-semibold leading-8 text-default-600">
              Brands
            </h3>
            {loading ? (
              <div className="flex flex-col gap-6 mt-3">
                <Skeleton isLoaded={loading} className="w-full rounded-lg">
                  <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                </Skeleton>
                <Skeleton isLoaded={loading} className="w-full rounded-lg">
                  <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                </Skeleton>
                <Skeleton isLoaded={loading} className="w-full rounded-lg">
                  <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                </Skeleton>
              </div>
            ) : (
              <CheckboxGroup
                color="default"
                onChange={(value) => {
                  router.push(
                    `?search=${search ? search : ""}&brands=${value ? value : ""}&category=${
                      cat ? cat : ""
                    }&sort=${sortParam ? sortParam : ""}`
                  );
                }}
                defaultValue={brands?.split(",")}
              >
                {data?.storeOwnerBrands.map((b: BrandsType) => {
                  return (
                    <Checkbox key={b?.id} value={b?.title?.en}>
                      {b?.title?.en}
                    </Checkbox>
                  );
                })}
              </CheckboxGroup>
            )}
          </div>

          {/* Categories */}

          {categories && (
            <div className="mt-6">
              <div className="hidden sm:hidden lg:block">
                <h3 className="text-lg font-semibold leading-8 text-default-600">
                  Categories
                </h3>
                <Accordion>
                  {categories?.map((cat: Category) => {
                    return (
                      <AccordionItem
                        key={cat?.id}
                        aria-label={cat?.title?.en}
                        isCompact
                        title={
                          <span className="text-sm">
                            {cat?.title?.en}{" "}
                            <Chip
                              size="sm"
                              color="primary"
                              variant="flat"
                            >{`${cat?.products}`}</Chip>
                          </span>
                        }
                        onPress={() => {
                          router.push(
                            `?search=${search ? search : ""}&brands=${brands ? brands : ""}&category=${
                              cat?.id ? cat?.id : ""
                            }&sort=${sortParam ? sortParam : ""}`
                          );
                        }}
                      >
                        <RadioGroup
                          aria-label={cat?.title?.en}
                          orientation="vertical"
                          color="primary"
                          value={selected as string}
                          defaultValue={selected as string}
                          onValueChange={(value) => {
                            setSelected(value),
                              router.push(
                                `?search=${search ? search : ""}&brands=${brands ? brands : ""}&category=${
                                  cat?.id ? cat?.id : ""
                                }&sub_category=${value ? value : ""}&sort=${
                                  sortParam ? sortParam : ""
                                }`
                              );
                          }}
                        >
                          {cat?.children?.map(
                            (sub: SubCategory, idx: number) => (
                              <Radio key={idx} value={sub?.id}>
                                {sub?.title?.en}{" "}
                                <Chip size="sm" variant="flat" color="primary">
                                  {sub?.products}
                                </Chip>
                              </Radio>
                            )
                          )}
                        </RadioGroup>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
              <div className="flex sm:flex lg:hidden flex-col gap-1 my-3">
                {categories?.map((cat: Category, idx: number) => {
                  return (
                    <Button
                      key={idx}
                      variant="light"
                      size="sm"
                      className="text-start w-full justify-start"
                      onClick={() => {
                        onOpen();
                        router.push(
                          `?search=${search ? search : ""}&brands=${brands ? brands : ""}&category=${
                            cat?.id ? cat?.id : ""
                          }&sort=${sortParam ? sortParam : ""}`
                        );
                        setSubCat(cat?.children);
                      }}
                    >
                      <span className="text-sm w-full flex items-center justify-between gap-3">
                        {cat?.title?.en}{" "}
                        {cat?.products > 0 && (
                          <Chip size="sm" color="primary" variant="flat">
                            {cat?.products}
                          </Chip>
                        )}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {(search || cat || sub || brands || min || max || sortParam) && (
            <>
              <Divider className="my-6 bg-default-100" />
              <Button
                onPress={() => {
                  router.push("/products");
                }}
                size="lg"
                color="primary"
                variant="flat"
                fullWidth
                radius="lg"
                className="mb-9"
              >
                Clear all filters
              </Button>
            </>
          )}
        </div>
      </>
    );
  }
);

FiltersWrapper.displayName = "FiltersWrapper";

export default FiltersWrapper;
