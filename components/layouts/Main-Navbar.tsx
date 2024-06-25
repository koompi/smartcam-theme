"use client";

import { Icon } from "@iconify/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Image,
  Spacer,
  Badge,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Card,
  CardBody,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export const MainNavbar = () => {
  return (
    <Navbar maxWidth="full" className="bg-background">
      <NavbarBrand>
        <Image alt="logo" src="/images/smartcam-logo.png" className="h-12" />
        <Spacer x={3} />
        <Image
          alt="logo"
          src="/images/smartcam-solutions.png"
          className="h-16"
        />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <Button isIconOnly radius="full" color="primary" variant="flat">
                <Icon icon="solar:widget-5-bold" fontSize={21} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <ul className=" p-6 list-none flex flex-col gap-3 text-lg">
                <Tooltip content=" Computer" placement="right-end">
                  <li>Computer</li>
                </Tooltip>
                <li>Printers</li>
                <li>Accessories</li>
              </ul>
            </PopoverContent>
          </Popover>
        </NavbarItem>
        <NavbarItem>
          <Input
            type="search"
            placeholder="Find products ..."
            variant="flat"
            className="w-[33rem]"
            radius="full"
            endContent={<Icon icon="mingcute:search-line" fontSize={24} />}
            isClearable
            color="primary"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="flex items-center gap-6">
        <NavbarItem>
          <Link href="#">
            <Badge color="danger" content={9} shape="circle">
              <p className="text-black">Compare</p>
            </Badge>
          </Link>
        </NavbarItem>
        <NavbarItem className="mt-3">
          <Link href="#">
            <Badge color="danger" content={9} shape="circle">
              <Icon
                icon="solar:heart-linear"
                className="text-black"
                fontSize={32}
              />
            </Badge>
          </Link>
        </NavbarItem>
        <NavbarItem className="mt-3 mr-12">
          <Link href="#">
            <Badge color="danger" content={9} shape="circle">
              <Icon
                icon="solar:bag-3-linear"
                fontSize={32}
                className="text-black"
              />
            </Badge>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            radius="full"
            className="px-10 font-semibold"
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
