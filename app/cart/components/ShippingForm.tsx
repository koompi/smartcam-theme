"use client";

import type { InputProps } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Divider,
  Image,
  Link,
  RadioGroup,
  Spinner,
} from "@nextui-org/react";
import { LocationType } from "@/types/location";
import { Icon } from "@iconify/react/dist/iconify.js";
import CustomRadio from "./CustomRadio";
import axios from "axios";

interface Shipping {
  [x: string]: any;
  id: string;
  isActive: boolean;
  freeDelivery: boolean;
  deliveryFee: number;
  isCustomFee: boolean;
  deliveryType: "L192" | "PERSONAL" | "CP";
}

export type ShippingFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
  // delivery: "PERSONAL" | "L192" | "CP";
  setDelivery: Function;
  location: string;
  setLocation: Function;
  setPosition: Function;
  setMailShippingId: Function;
  ship: number;
  shippingProvider: Shipping;
  customerAddress: LocationType[];
};

const ShippingForm = React.forwardRef<HTMLDivElement, ShippingFormProps>(
  ({
    setDelivery,
    location,
    setLocation,
    ship,
    shippingProvider,
    setPosition,
    customerAddress,
  }) => {
    const deliveryRadioClasses = {
      wrapper: "group-data-[selected=true]:border-primary",
      base: "data-[selected=true]:border-primary",
      control: "bg-primary",
    };
    const [shipping, setShipping] = useState([]);

    useEffect(() => {
      if (!customerAddress) {
        return;
      }
      if (customerAddress?.length > 0) {
        setLocation(customerAddress[0].id);
      }
    }, [customerAddress, setLocation]);

    useEffect(() => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_BACKEND}/api/domestic/mail_object`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          setShipping(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const myLocation = customerAddress?.find(
      (l: LocationType) => l.id == location
    );

    return (
      <>
        <div>
          <h1 className="font-semibold text-sm sm:text-sm lg:text-xl pb-4">
            Delivery address
          </h1>
          <Accordion>
            <AccordionItem
              key="delivery"
              aria-label="Theme"
              indicator={(_: any) => (
                <div className="flex items-center font-semibold cursor-pointer">
                  <Icon
                    icon="solar:alt-arrow-right-line-duotone"
                    style={{ color: "#000", fontSize: "24px" }}
                  />
                </div>
              )}
              title={
                <div>
                  <div className="flex items-center gap-3">
                    {myLocation?.address?.label && (
                      <Chip size="sm" color="primary">
                        {myLocation?.address?.label}
                      </Chip>
                    )}
                    <p>{myLocation?.address?.addressName}</p>
                  </div>
                </div>
              }
            >
              <div className="my-4">
                <RadioGroup
                  aria-label="Select existing payment method"
                  classNames={{ wrapper: "gap-3" }}
                  defaultValue={location}
                  onValueChange={(value: string) => {
                    setLocation(value);
                  }}
                >
                  {customerAddress?.map(
                    (location: LocationType, idx: number) => {
                      return (
                        <CustomRadio
                          key={idx}
                          classNames={deliveryRadioClasses}
                          icon={
                            <Image
                              alt="delivery logo"
                              src={
                                !location?.address?.photos
                                  ? "/images/shop.png"
                                  : location?.address?.photos[0]
                              }
                              radius="none"
                              className="w-24"
                            />
                          }
                          label={location?.address?.addressName}
                          chip={myLocation?.address?.label}
                          description={
                            <div className="leading-snug flex items-center gap-2">
                              <div>{myLocation?.email}</div>
                              <div>{myLocation?.phoneNumber}</div>
                            </div>
                          }
                          value={location.id}
                        />
                      );
                    }
                  )}
                </RadioGroup>
              </div>
            </AccordionItem>
          </Accordion>
          <Divider className="mt-4" />
          <div className="mt-6 flex space-x-4 justify-between">
            <Accordion>
              <AccordionItem
                key="delivery"
                aria-label="Theme"
                indicator={(_: any) => (
                  <div className="flex items-center font-semibold cursor-pointer">
                    <Icon
                      icon="solar:alt-arrow-right-line-duotone"
                      style={{ color: "#000", fontSize: "24px" }}
                    />
                  </div>
                )}
                title={
                  <div className="flex space-x-4 text-black">
                    {shippingProvider?.map((res: Shipping) => {
                      if (res.deliveryType === "PERSONAL") {
                        return (
                          <>
                            <Image
                              src="/images/smartcam-only-icon.png"
                              className="h-12"
                              alt="PERSONAL delivery"
                            />
                            <div>
                              <div className="font-semibold">
                                {res?.deliveryType === "PERSONAL"
                                  ? "Shop Delivery"
                                  : res?.deliveryType}
                              </div>
                              <div className="text-sm">
                                Fee:{" "}
                                {res?.freeDelivery
                                  ? "Free delivery"
                                  : res?.deliveryFee}
                              </div>
                            </div>
                          </>
                        );
                      } else if (res?.deliveryType === "CP") {
                        return (
                          <>
                            <Image
                              src="/images/logo_v1.png"
                              className="h-12"
                              alt=""
                            />
                            <div>
                              <div className="font-semibold">
                                Delivery: ${ship?.toFixed(2)}
                              </div>
                              <div>Cambodia POS</div>
                            </div>
                          </>
                        );
                      } else if (res?.deliveryType === "L192") {
                        return (
                          <>
                            <Image
                              src="/images/l192.png"
                              className="h-12"
                              alt=""
                            />
                            <div>
                              <div className="font-semibold">
                                Delivery: ${ship?.toFixed(2)}
                              </div>
                              <div>L912 Delivery</div>
                            </div>
                          </>
                        );
                      } else {
                        return "Deliver Options";
                      }
                    })}
                  </div>
                }
              >
                <div className="mt-4">
                  <RadioGroup
                    aria-label="Select existing payment method"
                    classNames={{ wrapper: "gap-3" }}
                    onValueChange={(value: string) => {
                      setPosition({
                        lat: myLocation?.lat,
                        lng: myLocation?.lng,
                      });
                      setDelivery(value);
                    }}
                    defaultValue={
                      shippingProvider?.length > 0 &&
                      shippingProvider[0]?.deliveryType
                    }
                  >
                    {shippingProvider?.map((delivery: Shipping) => {
                      return (
                        <CustomRadio
                          key={delivery?.deliveryType}
                          classNames={deliveryRadioClasses}
                          isRecommended
                          description={
                            <div className="space-y-0.5">
                              <div className="font-semibold text-black text-sm sm:text-sm lg:text-lg">
                                {delivery?.deliveryType === "PERSONAL"
                                  ? `Shop Delivery (${delivery?.freeDelivery ? "Free delivery" : delivery?.deliveryFee})`
                                  : delivery?.deliveryType}
                              </div>
                              <div>
                                (Delivery within 2-3 days),{" "}
                                {delivery?.deliveryType === "PERSONAL"
                                  ? "Deliver your product by shop."
                                  : null}
                              </div>
                            </div>
                          }
                          icon={
                            <Image
                              alt="delivery"
                              src={
                                delivery?.deliveryType === "CP"
                                  ? "/images/logo_v1.png"
                                  : delivery?.deliveryType === "L192"
                                    ? "/images/l192.png"
                                    : "/images/smartcam-only-icon.png"
                              }
                              radius="md"
                              className="w-20"
                            />
                          }
                          value={delivery?.deliveryType}
                        />
                      );
                    })}
                  </RadioGroup>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </>
    );
  }
);

ShippingForm.displayName = "ShippingForm";

export default ShippingForm;
