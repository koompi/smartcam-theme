"use client";

import type { InputProps } from "@nextui-org/react";
import React from "react";
import {
  Accordion,
  AccordionItem,
  Image,
  Link,
  RadioGroup,
} from "@nextui-org/react";
// import { useQuery } from "@apollo/client";
// import { CUSTOMER_ADDRESS, DELIVERIES } from "@/graphql/delivery";
import { CustomerAddressType, DeliveryType } from "@/types/checkout";
import CustomRadio from "./CustomRadio";
import { Icon } from "@iconify/react";
// import { useTheme } from "@/context/useTheme";

export type ShippingFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
  ship: string;
  setShip: Function;
  toDelivery: CustomerAddressType | null;
  setToDelivery: Function;
};

const ShippingForm = React.forwardRef<HTMLDivElement, ShippingFormProps>(
  ({ ship, setShip, toDelivery, setToDelivery, className }, ref) => {
    const deliveryRadioClasses = {
      wrapper: "group-data-[selected=true]:border-foreground",
      base: "data-[selected=true]:border-foreground",
      control: "bg-foreground",
    };
    // const { value } = useTheme();

    // const { data, loading } = useQuery(DELIVERIES);
    // const { data: address, loading: loadingAddress } =
    //   useQuery(CUSTOMER_ADDRESS);

    // if (loading || !data || loadingAddress) {
    //   return "Loading...";
    // }

    return (
      <>
        <Accordion
          defaultExpandedKeys={["1", "2"]}
          selectionMode="multiple"
          showDivider={false}
        >
          <AccordionItem key="1" aria-label="Delivery" title="Delivery Option">
            <RadioGroup
              aria-label="Select existing payment method"
              classNames={{ wrapper: "gap-3" }}
              onValueChange={(value) => {
                setShip(value);
              }}
            >
              {/* {data?.storeDeliveries?.map((del: DeliveryType, idx: number) => {
                return (
                  <CustomRadio
                    key={idx}
                    classNames={deliveryRadioClasses}
                    description={del?.instruction}
                    icon={
                      <Image
                        alt="delivery logo"
                        // src={del?.logo ? del?.logo : "/images/shop.png"}
                        src="/images/l192.svg"
                        radius="none"
                        className="h-12"
                      />
                    }
                    label={
                      del?.express === "PERSONAL"
                        ? "Shop Delivery"
                        : "L192 Delivery"
                    }
                    value={del?.id}
                  />
                );
              })} */}
              {/* <CustomRadio
                key={2}
                classNames={deliveryRadioClasses}
                isRecommended
                description=""
                icon={
                  <Image
                    alt="delivery logo"
                    src={
                      !value?.header?.logo
                        ? "/images/shop.png"
                        : value?.header?.logo
                    }
                    radius="none"
                    className="w-24"
                  />
                }
                label="Shop Delivery"
                value="PERSONAL"
              /> */}
            </RadioGroup>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Delivery to address"
            title="Delivery to address"
          >
            {/* <RadioGroup
              aria-label="Select existing payment method"
              classNames={{ wrapper: "gap-3" }}
              defaultValue={toDelivery as any}
              onValueChange={async (value) => {
                setToDelivery(value as unknown as CustomerAddressType);
              }}
            >
              {address?.storeAddress?.map(
                (ad: CustomerAddressType, idx: number) => {
                  return (
                    <CustomRadio
                      key={idx}
                      classNames={deliveryRadioClasses}
                      description={`${ad.firstName} ${ad.lastName}, ${ad.phoneNumber}`}
                      chip={ad.label}
                      icon={
                        <Image
                          alt="shop"
                          src={
                            ad.photos.length > 0
                              ? ad.photos[0]
                              : "/images/shop.png"
                          }
                          radius="none"
                          className="w-12"
                        />
                      }
                      label={ad.addressName}
                      value={ad as any}
                    />
                  );
                }
              )}
            </RadioGroup> */}
          </AccordionItem>
        </Accordion>
        <Link
          href="/locations/create"
          className="w-full h-28 border border-dashed rounded-xl items-center justify-center "
          underline="hover"
        >
          <div className="flex gap-3">
            <Icon icon="solar:map-point-add-linear" fontSize={24} />
            Add Location
          </div>
        </Link>
      </>
    );
  }
);

ShippingForm.displayName = "ShippingForm";

export default ShippingForm;
