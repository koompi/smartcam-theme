"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge, Button } from "@nextui-org/react";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/useCart";
import Link from "next/link";
import { Drawer } from "vaul";

interface MobileNavigator {
  active_icon: string;
  name: string;
  url: string;
  icon: string;
  is_badge: boolean;
}

const MobileNavigator = () => {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navigator = [
    {
      name: "Home",
      url: "/",
      active_icon: "ph:house-simple-fill",
      icon: "ph:house-simple-bold",
      is_badge: false,
    },
    {
      name: "Products",
      url: "/products",
      active_icon: "mingcute:shopping-bag-2-fill",
      icon: "mingcute:shopping-bag-2-line",
      is_badge: false,
    },
    {
      name: "Search",
      url: "/search",
      active_icon: "lucide:search",
      icon: "lucide:search",
      is_badge: false,
    },
    {
      name: "Cart",
      url: "/cart",
      active_icon: "ph:shopping-cart-simple-fill",
      icon: "ph:shopping-cart-simple-bold",
      is_badge: true,
    },
  ];

  const menuItems = [
    {
      url: "/",
      title: "Home",
      icon: "solar:home-2-bold",
    },
    {
      url: "/products",
      title: "Products",
      icon: "solar:bag-3-bold",
    },
    {
      url: "/promotions",
      title: "Special Offer",
      icon: "solar:tag-price-bold",
    },
    {
      url: "/about",
      title: "Who We Are?",
      icon: "solar:question-circle-bold",
    },
    {
      url: "/contact",
      title: "Contact US",
      icon: "mingcute:contacts-3-fill",
    },
    {
      url: "/terms",
      title: "Terms & Conditions",
      icon: "lets-icons:paper-fill",
    },
    // {
    //   url: "/events",
    //   title: "Events",
    // },

    // {
    //   url: "/careers",
    //   title: "Careers",
    // },

    // {
    //   url: "#",
    //   title: "Video Support",
    // },
    // {
    //   url: "#",
    //   title: "Sofware Support",
    // },
    // {
    //   url: "#",
    //   title: "Helps",
    // },
  ];

  return (
    <section>
      <Drawer.Root
        dismissible={true}
        shouldScaleBackground
        open={open}
        onOpenChange={setOpen}
      >
        {/* <Drawer.Trigger asChild onClick={() => setOpen(!open)}>
          <Button isIconOnly variant="light" color="primary">
            <Icon icon="heroicons-outline:menu-alt-2" fontSize={24} />
          </Button>
        </Drawer.Trigger> */}
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-10 bg-black/40 bg-clip-padding backdrop-filter backdrop-blur-md" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-3xl h-[45dvh] mt-24 fixed z-40 bottom-0 left-0 right-0">
            <div className="p-4 bg-white/30 rounded-t-3xl flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-primary-900 mb-8" />
              <div className="max-w-md mx-auto px-3">
                {menuItems.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    onClick={() => {
                      router.push(item.url);
                      setOpen(!open);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        icon={item.icon}
                        className="text-primary"
                        fontSize={27}
                      />
                      <p className="my-3 text-xl font-medium">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
      <div className="border-t-1 grid grid-cols-5 sm:grid lg:hidden fixed bottom-0 z-30 bg-white w-full min-h-14 container mx-auto px-3">
        {navigator.map((nav: MobileNavigator, idx: number) => {
          return (
            <div
              key={idx}
              // href={nav.url}
              className="flex flex-col justify-center items-center"
            >
              {nav.url === pathname ? (
                <>
                  {nav.is_badge ? (
                    <>
                      <Badge
                        content={cartItems?.length > 0 && cartItems?.length}
                        shape="circle"
                        color="danger"
                      >
                        <Button
                          as={Link}
                          href={nav.url}
                          variant="light"
                          isIconOnly
                          color="primary"
                        >
                          <Icon icon={nav.active_icon} fontSize={30} />
                        </Button>
                      </Badge>
                      <span className="text-xs relative -mt-1 text-primary">
                        {nav.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <Button
                        as={Link}
                        href={nav.url}
                        variant="light"
                        isIconOnly
                        color="primary"
                      >
                        <Icon icon={nav.active_icon} fontSize={30} />
                      </Button>
                      <span className="text-xs relative -mt-1 text-primary">
                        {nav.name}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  {nav.is_badge ? (
                    <>
                      <Badge
                        shape="circle"
                        color="danger"
                        content={cartItems?.length > 0 && cartItems?.length}
                      >
                        <Button
                          as={Link}
                          href={nav.url}
                          variant="light"
                          isIconOnly
                        >
                          <Icon
                            icon={nav.icon}
                            fontSize={30}
                            className="text-primary-900"
                          />
                        </Button>
                      </Badge>
                      <span className="text-xs relative -mt-1 text-primary-900">
                        {nav.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <Button
                        as={Link}
                        href={nav.url}
                        variant="light"
                        isIconOnly
                      >
                        <Icon
                          icon={nav.icon}
                          fontSize={30}
                          className="text-primary-900"
                        />
                      </Button>
                      <span className="text-xs relative -mt-1 text-primary-900">
                        {nav.name}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
        <div className="flex flex-col justify-center items-center">
          <Button
            variant="light"
            isIconOnly
            color="primary"
            onPress={() => setOpen(!open)}
          >
            <Icon
              icon="heroicons-solid:menu-alt-3"
              fontSize={30}
              className="text-primary-900"
            />
          </Button>
          <span className="text-xs relative -mt-1 text-primary-900">Menu</span>
        </div>
      </div>
    </section>
  );
};

export default MobileNavigator;
