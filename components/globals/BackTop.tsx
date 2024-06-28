"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { cn } from "@/utils/cn";
import { Button } from "@nextui-org/react";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed z-50 bottom-6 right-6">
      <Button
        isIconOnly
        onPress={scrollToTop}
        color="primary"
        size="lg"
        radius="full"
        className={cn(
          "inline-flex items-center rounded-full p-3 shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <Icon icon="solar:arrow-up-bold" fontSize={21} aria-hidden="true" />
      </Button>
    </div>
  );
};
