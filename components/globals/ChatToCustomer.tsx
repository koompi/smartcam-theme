"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const ChatToCustomer = () => {
  return (
    <div className="hidden sm:hidden lg:block fixed z-50 bottom-20 right-6 ">
      <div className="btn-effect">
        <Button
          isIconOnly
          size="lg"
          as={Link}
          href="#"
          target="_blank"
          radius="full"
          color="primary"
          variant="flat"
          className="p-3"
        >
          <Icon icon="mdi:facebook-messenger" fontSize={30} />
        </Button>
      </div>
    </div>
  );
};

export default ChatToCustomer;
