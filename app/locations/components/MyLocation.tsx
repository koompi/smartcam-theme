"use client";

import {
  Card,
  CardBody,
  Button,
  Image,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { FC } from "react";
import { LocationType } from "@/types/location";

const MyLocation: FC<LocationType> = (props) => {
  console.log("poro", props);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-full "
      shadow="sm"
    >
      {/* <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            radius="full"
            variant="flat"
            size="sm"
            className="absolute right-1 top-1 z-10"
          >
            <Icon icon="solar:menu-dots-bold" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="edit"
            startContent={<Icon icon="solar:pen-bold" />}
          >
            Edit
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<Icon icon="solar:trash-bin-minimalistic-2-bold" />}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
      <CardBody className="px-4">
        <div className="grid grid-cols-3 space-x-6 items-center justify-center">
          <div className="relative col-span-1">
            <Image
              alt={props?.address?.streetValue}
              className="object-cover w-full h-full"
              shadow="none"
              src={
                props?.photos?.length > 0
                  ? props?.photos[0]
                  : "/images/shop.png"
              }
            />
          </div>
          <div className="flex flex-col col-span-2">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                {props.label && (
                  <Chip color="primary" variant="flat" size="sm">
                    {props.label}
                  </Chip>
                )}
                {props?.address?.streetNo && (
                  <Chip color="primary" variant="flat" size="sm">
                    {props?.address?.streetNo}
                  </Chip>
                )}
                <h3 className="font-semibold mt-2 line-clamp-3">
                  {props?.address?.streetValue}
                </h3>
                <div className="flex gap-3 mt-2">
                  <p className=" text-sm font-light">
                    {props?.firstName} {props?.lastName}
                  </p>
                  <p className="text-sm font-light">{props?.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default MyLocation;
