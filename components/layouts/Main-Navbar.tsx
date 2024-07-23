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
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import React, { useState } from "react";
import Header from "./Header";
import { Menubar } from "./Menubar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/useAuth";
import { useCart } from "@/context/useCart";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Search } from "./Search";

export const MainNavbar = () => {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const { cartItems, logout } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      url: "/",
      title: "Home",
    },
    {
      url: "/products",
      title: "Products",
    },
    {
      url: "/promotions",
      title: "Special Offer",
    },
    {
      url: "/about",
      title: "Who We Are?",
    },
    {
      url: "/contact",
      title: "Contact US",
    },
    {
      url: "/events",
      title: "Events",
    },

    {
      url: "/careers",
      title: "Careers",
    },

    {
      url: "/support/video-support",
      title: "Video Support",
    },
    {
      url: "/support/software_support",
      title: "Sofware Support",
    },
    {
      url: "/support/others",
      title: "Helps",
    },
  ];

  return (
    <header className="sticky top-0 inset-x-0 flex flex-col flex-wrap z-50 w-full bg-background border-b border-gray-200">
      <Header />
      <Navbar
        maxWidth="full"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="bg-background flex flex-col h-14 sm:h-auto"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <Link href="/">
            <Image
              alt="logo"
              src="/images/smartcam-logo.png"
              className="h-8 sm:h-12"
              radius="none"
            />
          </Link>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex" justify="start">
          <NavbarBrand as={Link} href="/">
            <Image
              alt="logo"
              src="/images/smartcam-logo.png"
              className="h-11 sm:h-12"
              radius="none"
            />
            <Spacer x={3} />
            <Image
              alt="logo"
              src="/images/smartcam-solutions.png"
              className="hidden sm:flex h-16"
              radius="none"
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {/* <NavbarItem>
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
          </NavbarItem> */}
          <NavbarItem>
            <Search />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="flex sm:hidden items-center gap-6"
        >
          {/* <NavbarItem
            className="mt-2"
            as={Link}
            href="/wishlist"
            isActive={pathname === "/wishlist"}
          >
            <Badge color="danger" content={9} size="sm" shape="circle">
              <Button
                color="primary"
                variant="light"
                radius="full"
                className="font-semibold mt-1"
                size="sm"
                isIconOnly
              >
                <Icon
                  icon={
                    pathname === "/wishlist"
                      ? "solar:heart-bold"
                      : "solar:heart-linear"
                  }
                  fontSize={30}
                />
              </Button>
            </Badge>
          </NavbarItem> */}

          {user ? (
            <Dropdown placement="bottom-end">
              {loading ? (
                <Skeleton className="flex rounded-full w-12 h-12" />
              ) : (
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={user?.avatar}
                  />
                </DropdownTrigger>
              )}
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  key="settings"
                  href="/settings"
                  startContent={
                    <Icon icon="solar:settings-outline" fontSize={21} />
                  }
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  key="locations"
                  href="/locations"
                  startContent={
                    <Icon icon="solar:streets-map-point-broken" fontSize={21} />
                  }
                >
                  My Locations
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  key="orders"
                  href="/orders"
                  startContent={
                    <Icon
                      icon="solar:cart-large-minimalistic-linear"
                      fontSize={21}
                    />
                  }
                >
                  Orders
                </DropdownItem>
                {/* <DropdownItem
                  key="wallet"
                  startContent={
                    <Icon icon="solar:wallet-linear" fontSize={21} />
                  }
                >
                  Wallet
                </DropdownItem> */}

                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={() => logout()}
                  startContent={
                    <Icon icon="solar:logout-outline" fontSize={21} />
                  }
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href={`https://backend.riverbase.org/sso/store`}
                variant="flat"
                radius="full"
                size="md"
                isIconOnly
              >
                <Icon icon="solar:user-rounded-bold" fontSize={24} />
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="hidden sm:flex items-center gap-6"
        >
          {/* <NavbarItem isActive={pathname === "/compare"}>
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
          </NavbarItem> */}
          {/* <NavbarItem>
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
          </NavbarItem> */}
          <NavbarItem className="mr-12">
            <Link href="/cart">
              <Badge
                color="danger"
                content={cartItems?.length}
                isInvisible={cartItems?.length <= 0}
                shape="circle"
              >
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
            {user ? (
              <Dropdown placement="bottom-end">
                {loading ? (
                  <Skeleton className="flex rounded-full w-12 h-12" />
                ) : (
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      src={user?.avatar}
                    />
                  </DropdownTrigger>
                )}
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">{user?.email}</p>
                  </DropdownItem>
                  <DropdownItem
                    as={Link}
                    key="settings"
                    href="/settings"
                    startContent={
                      <Icon icon="solar:settings-outline" fontSize={21} />
                    }
                  >
                    Settings
                  </DropdownItem>
                  <DropdownItem
                    as={Link}
                    key="locations"
                    href="/locations"
                    startContent={
                      <Icon
                        icon="solar:streets-map-point-broken"
                        fontSize={21}
                      />
                    }
                  >
                    My Locations
                  </DropdownItem>
                  <DropdownItem
                    as={Link}
                    key="orders"
                    href="/orders"
                    startContent={
                      <Icon
                        icon="solar:cart-large-minimalistic-linear"
                        fontSize={21}
                      />
                    }
                  >
                    Orders
                  </DropdownItem>
                  {/* <DropdownItem
                  key="wallet"
                  startContent={
                    <Icon icon="solar:wallet-linear" fontSize={21} />
                  }
                >
                  Wallet
                </DropdownItem> */}

                  <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={() => logout()}
                    startContent={
                      <Icon icon="solar:logout-outline" fontSize={21} />
                    }
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button
                as={Link}
                color="primary"
                href={`${process.env.NEXT_PUBLIC_BACKEND}/sso/store`}
                variant="flat"
                radius="full"
                className="px-10 font-semibold"
              >
                Login
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="pt-12">
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item}-${index}`}
              className="my-1 font-semibold"
            >
              <Link className="w-full" href={item?.url}>
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
          <Button
            variant="shadow"
            size="lg"
            isIconOnly
            as={Link}
            href="https://t.me/T_thith"
            target="_blank"
            radius="full"
            color="primary"
            className="absolute bottom-20 right-6"
          >
            <Icon icon="mingcute:telegram-fill" fontSize={27} />
          </Button>
        </NavbarMenu>
      </Navbar>
      <div className="hidden sm:inline">
        <Menubar />
      </div>
    </header>
  );
};
