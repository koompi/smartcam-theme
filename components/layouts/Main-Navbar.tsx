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
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import { Menubar } from "./Menubar";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export const MainNavbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 inset-x-0 flex flex-col flex-wrap z-50 w-full bg-background border-b border-gray-200">
      <Header />
      <Navbar maxWidth="full" className="bg-background flex flex-col">
        <NavbarBrand as={Link} href="/">
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
          <NavbarItem isActive={pathname === "/compare"}>
            <Link href="/compare">
              <Badge color="danger" content={3} shape="circle">
                <Button
                  color={pathname === "/compare" ? "primary" : "default"}
                  variant={pathname === "/compare" ? "flat" : "light"}
                  radius="full"
                  className={cn(
                    "text-black hover:underline hover:text-primary",
                    {
                      "text-primary": pathname === "/compare",
                    }
                  )}
                >
                  Compare
                </Button>
              </Badge>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/wishlist">
              <Badge color="danger" content={9} shape="circle">
                <Button
                  isIconOnly
                  radius="full"
                  color={pathname === "/wishlist" ? "primary" : "default"}
                  variant={pathname === "/wishlist" ? "flat" : "light"}
                >
                  <Icon
                    icon={
                      pathname === "/wishlist"
                        ? "solar:heart-bold"
                        : "solar:heart-linear"
                    }
                    className="text-primary"
                    fontSize={27}
                  />
                </Button>
              </Badge>
            </Link>
          </NavbarItem>
          <NavbarItem className="mr-12">
            <Link href="/cart">
              <Badge color="danger" content={9} shape="circle">
                <Button
                  isIconOnly
                  radius="full"
                  color={pathname === "/cart" ? "primary" : "default"}
                  variant={pathname === "/cart" ? "flat" : "light"}
                >
                  <Icon
                    icon={
                      pathname === "/cart"
                        ? "solar:bag-3-bold"
                        : "solar:bag-3-linear"
                    }
                    fontSize={27}
                    className="text-primary"
                  />
                </Button>
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
      <Menubar />
    </header>
  );
};
