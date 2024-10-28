"use client";

import { Badge, cn, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/useCart";

const CompareBottun = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { notifications } = useCart();

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="hidden sm:hidden lg:block fixed z-50 bottom-52 right-6">
      <Badge
        color="danger"
        content={notifications?.count_compare}
        isInvisible={notifications?.count_compare <= 0}
        shape="circle"
        className={cn("flex", isVisible ? "flex" : "hidden")}
      >
        <Button
          isIconOnly
          color="primary"
          size="lg"
          radius="full"
          as={Link}
          href="/compare"
          className={cn(
            "inline-flex items-center rounded-full p-3 shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <Icon
            icon="fluent-mdl2:compare-uneven"
            fontSize={21}
            aria-hidden="true"
          />
        </Button>
      </Badge>
    </div>
  );
};

export default CompareBottun;
