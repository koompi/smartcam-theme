"use client";

import React from "react";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";

const MainFooter = () => {
  return (
    <section className="relative overflow-hidden">
      <footer className="py-10 bg-white sm:pt-16 lg:pt-24">
        <div className="absolute right-0">
          <Image
            alt="logo"
            src="/images/logo-only-grayscale.png"
            className="h-[45rem]"
            radius="none"
          />
        </div>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-full relative">
          <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
            {/* main */}
            <div className="col-span-2 md:col-span-3 lg:col-span-3 lg:pr-8">
              <Image
                alt="logo"
                src="/images/smartcam-logo.png"
                className="h-24"
                radius="none"
              />

              <p className="text-base leading-relaxed text-gray-600 mt-7 max-w-xl">
                SMARTCAM is the leading company focus on electronics ( computer
                , Printer ( EPSON, HP, CANON) and parts). we will our best to
                offer best services and products.
              </p>

              <ul className="flex items-center space-x-3 mt-9">
                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-center text-primary transition-all duration-200 bg-content2 rounded-full w-7 h-7 hover:bg-primary focus:bg-primary hover:text-white"
                  >
                    <Icon icon="ic:baseline-facebook" fontSize={21} />
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-center text-primary transition-all duration-200 bg-content2 rounded-full w-7 h-7 hover:bg-primary focus:bg-primary hover:text-white"
                  >
                    <Icon icon="mingcute:telegram-fill" fontSize={18} />
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-center text-primary transition-all duration-200 bg-content2 rounded-full w-7 h-7 hover:bg-primary focus:bg-primary hover:text-white"
                  >
                    <Icon icon="hugeicons:instagram" fontSize={18} />
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-center text-primary transition-all duration-200 bg-content2 rounded-full w-7 h-7 hover:bg-primary focus:bg-primary hover:text-white"
                  >
                    <Icon icon="ri:twitter-x-fill" />
                  </Link>
                </li>
              </ul>
            </div>
            {/* Terms */}
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase">
                Terms
              </p>

              <ul className="mt-6 space-y-4">
                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Terms & Conditions
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            {/* Company */}
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase">
                Company
              </p>

              <ul className="mt-6 space-y-4">
                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    About US
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Contact US
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Events
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Our Customers
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            {/* Account */}
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase">
                Account
              </p>

              <ul className="mt-6 space-y-4">
                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    My Locations
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Cart
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    My Wishlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <hr className="mt-16 mb-10 border-gray-200" />
          <p className="text-sm text-center text-gray-600">
            © Copyright 2024, All Rights Reserved by Smartcam Eletronics
          </p>
        </div>
      </footer>
    </section>
  );
};

export default MainFooter;
