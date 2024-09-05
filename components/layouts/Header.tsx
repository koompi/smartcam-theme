"use client";

import React from "react";
import { Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="hidden sm:hidden lg:flex justify-between w-full items-center gap-x-3 bg-gradient-to-r from-primary to-primary-800 px-3 sm:px-3 lg:px-6 py-1 text-white relative">
      <div className="flex flex-col sm:flex-col lg:flex-row items-start sm:items-start lg:items-center gap-0 sm:gap-0 lg:gap-3 text-xs">
        <div className="flex items-center gap-3 ">
          <Icon
            icon="solar:phone-bold"
            fontSize={21}
            className="hidden sm:hidden lg:flex"
          />
          <p>(+855) 17 819 419</p>
        </div>
        <Divider
          orientation="vertical"
          className="h-6 bg-white hidden sm:hidden lg:flex"
        />
        <p>info@smartcam-group.com</p>
      </div>
      <div className="flex items-center gap-3">
        <p className="hidden sm:hidden lg:flex">Social Media</p>
        <Divider
          orientation="vertical"
          className="h-6 bg-white hidden sm:hidden lg:flex"
        />
        <div className="flex items-center gap-2 sm:gap-2 lg:gap-3">
          <Link
            href="https://www.facebook.com/smartcam168"
            target="_blank"
            rel="noreferer"
            className="text-white"
          >
            <Icon icon="ic:baseline-facebook" fontSize={18} />
          </Link>
          <Link
            href="https://t.me/joinchat/09E4pilK89llNDM1"
            target="_blank"
            rel="noreferer"
            className="text-white"
          >
            <Icon icon="mingcute:telegram-fill" fontSize={18} />
          </Link>
          <Link
            href="https://www.youtube.com/@smartcam123"
            target="_blank"
            rel="noreferer"
            className="text-white"
          >
            <Icon icon="mingcute:youtube-fill" fontSize={18} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
