"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge, Button } from "@nextui-org/react";
import React from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/useCart";
import Link from "next/link";

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

  return (
    <section className="border-t-1 grid grid-cols-4 sm:grid lg:hidden fixed bottom-0 z-30 bg-white w-full min-h-14 container mx-auto px-3">
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
                      content={cartItems?.length}
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
                      content={cartItems?.length}
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
                          className="text-gray-600"
                        />
                      </Button>
                    </Badge>
                    <span className="text-xs relative -mt-1 text-gray-600">
                      {nav.name}
                    </span>
                  </>
                ) : (
                  <>
                    <Button as={Link} href={nav.url} variant="light" isIconOnly>
                      <Icon
                        icon={nav.icon}
                        fontSize={30}
                        className="text-gray-600"
                      />
                    </Button>
                    <span className="text-xs relative -mt-1 text-gray-600">
                      {nav.name}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default MobileNavigator;
