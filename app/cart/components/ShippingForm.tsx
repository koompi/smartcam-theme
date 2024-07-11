"use client";

import type { InputProps } from "@nextui-org/react";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Chip,
  Divider,
  Image,
  Link,
  RadioGroup,
} from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_LOCATIONS } from "@/graphql.bk/location";
import { LocationType } from "@/types/location";
import { Icon } from "@iconify/react/dist/iconify.js";
import CustomRadio from "./CustomRadio";
import { CustomerAddressType } from "@/types/checkout";

export type ShippingFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
  delivery: "PERSONAL" | "L192" | "CP";
  setDelivery: Function;
  location: string;
  setLocation: Function;
  setPosition: Function;
  ship: number;
};

const ShippingForm = React.forwardRef<HTMLDivElement, ShippingFormProps>(
  ({ delivery, setDelivery, location, setLocation, ship, className }, ref) => {
    const deliveryRadioClasses = {
      wrapper: "group-data-[selected=true]:border-primary",
      base: "data-[selected=true]:border-primary",
      control: "bg-primary",
    };
    const [address, setAddress] = useState(false);
    const { data: locations, loading: loadingAddress } =
      useQuery(GET_ALL_LOCATIONS);

    if (loadingAddress) {
      return "Loading...";
    }

    const myLocation = locations?.storeLocations?.find(
      (l: LocationType) => l.id == location
    );

    // const changeLocation = () => {
    //   setAddress(true);
    // };

    return (
      <>
        <div>
          <h1 className="font-semibold text-xl pb-4">Delivery address</h1>
          {myLocation ? (
            <Accordion>
              <AccordionItem
                key="delivery"
                aria-label="Theme"
                indicator={(_) => (
                  <div className="flex items-center font-semibold cursor-pointer">
                    <Icon
                      icon="solar:alt-arrow-right-line-duotone"
                      style={{ color: "#000", fontSize: "24px" }}
                    />
                  </div>
                )}
                title={
                  <div className="flex items-center gap-3">
                    <Chip size="sm" color="primary">
                      {myLocation?.label}
                    </Chip>
                    <p>{myLocation?.address?.streetValue}</p>
                  </div>
                }
                // title="Delivery Option"
              >
                <div className="my-4">
                  <RadioGroup
                    aria-label="Select existing payment method"
                    classNames={{ wrapper: "gap-3" }}
                    defaultValue={location}
                    onValueChange={(value) => {
                      setDelivery(value);
                    }}
                  >
                    {locations?.storeLocations?.map(
                      (location: LocationType, idx: number) => {
                        return (
                          <CustomRadio
                            key={idx}
                            classNames={deliveryRadioClasses}
                            icon={
                              <Image
                                alt="delivery logo"
                                src={
                                  !myLocation?.photos[0]
                                    ? "/images/shop.png"
                                    : myLocation?.photos[0]
                                }
                                radius="none"
                                className="w-24"
                              />
                            }
                            label={location?.address?.streetValue}
                            chip={myLocation?.label}
                            description={
                              <div className="leading-snug flex items-center gap-2">
                                <div>{myLocation?.email}</div>
                                <div>{myLocation?.phoneNumber}</div>
                              </div>
                            }
                            value={myLocation.id}
                          />
                        );
                      }
                    )}
                  </RadioGroup>
                </div>
              </AccordionItem>
            </Accordion>
          ) : (
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
          )}
          <div className="mt-6 flex space-x-4 justify-between">
            <Accordion defaultExpandedKeys={["delivery"]}>
              <AccordionItem
                key="delivery"
                aria-label="Theme"
                indicator={(_) => (
                  <div className="flex items-center font-semibold cursor-pointer">
                    <Icon
                      icon="solar:alt-arrow-right-line-duotone"
                      style={{ color: "#000", fontSize: "24px" }}
                    />
                  </div>
                )}
                title={
                  <div className="flex space-x-4 text-black">
                    {delivery === "CP" && (
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
                    )}
                    {delivery === "L192" && (
                      <>
                        <Image src="/images/l192.png" className="h-12" alt="" />
                        <div>
                          <div className="font-semibold">
                            Delivery: ${ship?.toFixed(2)}
                          </div>
                          <div>L912 Delivery</div>
                        </div>
                      </>
                    )}
                  </div>
                }
              >
                <div className="mt-4">
                  <RadioGroup
                    aria-label="Select existing payment method"
                    classNames={{ wrapper: "gap-3" }}
                    defaultValue={delivery}
                    onValueChange={(value) => {
                      setDelivery(value);
                    }}
                  >
                    {["CP", "L192"]?.map((delivery: string) => {
                      return (
                        <CustomRadio
                          key={delivery}
                          classNames={deliveryRadioClasses}
                          description={
                            <div className="space-y-0.5">
                              <div className="font-semibold text-black text-lg">
                                {delivery}
                              </div>
                              <div>(Delivery within 2-3 days)</div>
                            </div>
                          }
                          icon={
                            <Image
                              alt="delivery"
                              src={
                                delivery === "CP"
                                  ? "/images/logo_v1.png"
                                  : "/images/l192.png"
                              }
                              radius="none"
                              className="w-20"
                            />
                          }
                          // label={delivery}
                          value={delivery}
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

//  <>
//    <Accordion
//      defaultExpandedKeys={["1", "2"]}
//      selectionMode="multiple"
//      showDivider={false}
//    >
//      <AccordionItem key="1" aria-label="Delivery" title="Delivery Option">
//        <RadioGroup
//          aria-label="Select existing payment method"
//          classNames={{ wrapper: "gap-3" }}
//          onValueChange={(value) => {
//            setShip(value);
//          }}
//        >
//          {data?.storeDeliveries?.map((del: DeliveryType, idx: number) => {
//               return (
//                 <CustomRadio
//                   key={idx}
//                   classNames={deliveryRadioClasses}
//                   description={del?.instruction}
//                   icon={
//                     <Image
//                       alt="delivery logo"
//                       // src={del?.logo ? del?.logo : "/images/shop.png"}
//                       src="/images/l192.svg"
//                       radius="none"
//                       className="h-12"
//                     />
//                   }
//                   label={
//                     del?.express === "PERSONAL"
//                       ? "Shop Delivery"
//                       : "L192 Delivery"
//                   }
//                   value={del?.id}
//                 />
//               );
//             })}
//          <CustomRadio
//            key={2}
//            classNames={deliveryRadioClasses}
//            isRecommended
//            description=""
//            icon={
//              <Image
//                alt="delivery logo"
//                src={
//                  !value?.header?.logo
//                    ? "/images/shop.png"
//                    : value?.header?.logo
//                }
//                radius="none"
//                className="w-24"
//              />
//            }
//            label="Shop Delivery"
//            value="PERSONAL"
//          />
//        </RadioGroup>
//      </AccordionItem>
//      <AccordionItem
//        key="2"
//        aria-label="Delivery to address"
//        title="Delivery to address"
//      >
//        <RadioGroup
//          aria-label="Select existing payment method"
//          classNames={{ wrapper: "gap-3" }}
//          defaultValue={toDelivery as any}
//          onValueChange={async (value) => {
//            setToDelivery(value as unknown as CustomerAddressType);
//          }}
//        >
//          {address?.storeAddress?.map(
//         (ad: CustomerAddressType, idx: number) => {
//           return (
//             <CustomRadio
//               key={idx}
//               classNames={deliveryRadioClasses}
//               description={`${ad.firstName} ${ad.lastName}, ${ad.phoneNumber}`}
//               chip={ad.label}
//               icon={
//                 <Image
//                   alt="shop"
//                   src={
//                     ad.photos.length > 0
//                       ? ad.photos[0]
//                       : "/images/shop.png"
//                   }
//                   radius="none"
//                   className="w-12"
//                 />
//               }
//               label={ad.addressName}
//               value={ad as any}
//             />
//           );
//         }
//       )}
//        </RadioGroup>
//      </AccordionItem>
//    </Accordion>
//    <Link
//      href="/locations/create"
//      className="w-full h-28 border border-dashed rounded-xl items-center justify-center "
//      underline="hover"
//    >
//      <div className="flex gap-3">
//        <Icon icon="solar:map-point-add-linear" fontSize={24} />
//        Add Location
//      </div>
//    </Link>
//  </>;
