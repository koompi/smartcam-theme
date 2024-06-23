"use client";

import React from "react";
import { Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between w-full items-center gap-x-3 bg-gradient-to-r from-primary to-primary-800 px-6 py-1">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <Icon icon="solar:phone-bold" fontSize={21} />
          <p>(+855) 17 819 419</p>
        </div>
        <Divider orientation="vertical" className="h-6 bg-foreground" />
        <p>info@smartcam-group.com</p>
      </div>
      <div className="flex items-center gap-3">
        <p>Social Media</p>
        <Divider orientation="vertical" className="h-6 bg-foreground" />
        <div className="flex items-center gap-3">
          <Link href="#" className="text-foreground">
            <Icon icon="ic:baseline-facebook" fontSize={18} />
          </Link>
          <Link href="#" className="text-foreground">
            <Icon icon="mingcute:telegram-fill" fontSize={18} />
          </Link>
          <Link href="#" className="text-foreground">
            <Icon icon="hugeicons:instagram" fontSize={18} />
          </Link>
          <Link href="#" className="text-foreground">
            <Icon icon="ri:twitter-x-fill" fontSize={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
