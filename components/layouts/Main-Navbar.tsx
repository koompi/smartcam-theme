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
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Link as MyLink,
  cn,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Menubar } from "./Menubar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/useAuth";
import { useCart } from "@/context/useCart";
import Link from "next/link";
import { Search } from "./Search";
import { Drawer } from "vaul";
import axios from "axios";
import { Loading } from "../globals/Loading";

export const MainNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, notifications } = useAuth();
  const { cartItems, logout } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [popOpen, setPopOpen] = useState(true);
  const cartIconRef = useRef<HTMLDivElement>(null);

  const [isTelegramAuth, setIsTelegramAuth] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  // const {data, refetch} = useQuery(WISHLIST_NOTIFICATION)

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_BACKEND}/user/sel/callback?code=${code}&scope=default&state=${state}`
          )
          .then((res) => {
            // setCookie("token", res.data.token, { maxAge: 60 * 60 * 24 * 7 });
            localStorage.setItem("access_token", res.data.token);
          })
          .then(() => {
            window.location.href = "/";
            // router.push();
            return;
          })
          .catch((err) => {
            console.log("auth err:", err);
            return;
          })
          .finally(() => {
            setIsTelegramAuth(false);
            return;
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!user && code && state) {
      fetchData();
    }
  }, [code, state, user]);

  if (isTelegramAuth) {
    return <Loading />;
  }

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
    // {
    //   url: "/events",
    //   title: "Events",
    // },

    // {
    //   url: "/careers",
    //   title: "Careers",
    // },

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
          <Drawer.Root
            dismissible={true}
            shouldScaleBackground
            open={open}
            onOpenChange={setOpen}
          >
            <Drawer.Trigger asChild onClick={() => setOpen(!open)}>
              <Button isIconOnly variant="light" color="primary">
                <Icon icon="heroicons-outline:menu-alt-2" fontSize={24} />
              </Button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0" />
              <Drawer.Content className="bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 flex flex-col rounded-t-3xl h-[60dvh] mt-24 fixed z-40 bottom-0 left-0 right-0">
                <div className="p-4 bg-white/30 rounded-t-3xl flex-1">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-500 mb-8" />
                  <div className="max-w-md mx-auto px-3">
                    {menuItems.map((item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="my-3 text-xl font-semibold"
                        onClick={() => {
                          router.push(item.url);
                          setOpen(!open);
                        }}
                      >
                        <p>{item.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Popover
                  isOpen={popOpen}
                  onOpenChange={(popOpen) => setPopOpen(!popOpen)}
                  showArrow
                  placement="left"
                >
                  <PopoverTrigger>
                    <Button
                      variant="shadow"
                      size="lg"
                      isIconOnly
                      as={Link}
                      href="https://t.me/T_thith"
                      target="_blank"
                      radius="full"
                      color="primary"
                      className="absolute bottom-12 right-9"
                    >
                      <Icon icon="mingcute:telegram-fill" fontSize={27} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">Chat to Customer Service</div>
                  </PopoverContent>
                </Popover>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
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
          <NavbarItem
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
          </NavbarItem>

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
                href={`${process.env.NEXT_PUBLIC_BACKEND}/sso/store`}
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
          <NavbarItem isActive={pathname === "/compare"}>
            {/* <Link href="/compare"> */}
            <Badge
              color="danger"
              content={notifications ? notifications.count_compare : 0}
              shape="circle"
            >
              <Button
                as={MyLink}
                color={pathname === "/compare" ? "primary" : "default"}
                variant={pathname === "/compare" ? "flat" : "light"}
                radius="full"
                className={cn("text-black hover:underline hover:text-primary", {
                  "text-primary": pathname === "/compare",
                })}
                href="/compare"
              >
                Compare
              </Button>
            </Badge>
            {/* </Link> */}
          </NavbarItem>
          <NavbarItem>
            <Badge
              color="danger"
              content={notifications ? notifications?.count_favorite : 0}
              shape="circle"
            >
              <Button
                as={MyLink}
                isIconOnly
                radius="full"
                color={pathname === "/wishlist" ? "primary" : "default"}
                variant={pathname === "/wishlist" ? "flat" : "light"}
                href="/wishlist"
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
          </NavbarItem>
          <NavbarItem className="mr-12">
            {/* <Link href="/cart"> */}
            <Badge
              ref={cartIconRef}
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
                onClick={() => router.push("/cart")}
              >
                <Icon
                  icon={
                    pathname === "/cart"
                      ? "solar:cart-large-minimalistic-bold"
                      : "solar:cart-large-minimalistic-bold-duotone"
                  }
                  fontSize={30}
                  className="text-primary"
                />
              </Button>
            </Badge>
            {/* </Link> */}
          </NavbarItem>
          <NavbarItem>
            {loading ? (
              <Skeleton className="flex rounded-full w-12 h-12" />
            ) : user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={user?.avatar}
                  />
                </DropdownTrigger>

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
        {/* <NavbarMenu className="pt-12">
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
        </NavbarMenu> */}
      </Navbar>
      <div className="hidden sm:inline">
        <Menubar />
      </div>
    </header>
  );
};
