"use client";

import React from "react";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "@/context/useAuth";
import { BRANDS } from "@/graphql/brands";
import { BrandsType } from "@/types/product";
import { useQuery } from "@apollo/client";

const MainFooter = () => {
  const { user } = useAuth();

  const { data, loading } = useQuery(BRANDS);

  if (loading || !data) {
    return;
  }

  return (
    <section className="relative overflow-hidden">
      <footer className="py-10 bg-white sm:pt-16 lg:pt-24">
        <div className="absolute top-0 right-6 z-0">
          <Image
            alt="logo"
            isBlurred
            src="/images/logo-only-grayscale.png"
            className="h-[36rem]"
            radius="none"
          />
        </div>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-full relative">
          <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-12 gap-y-16 gap-x-3">
            {/* main */}
            <div className="col-span-2 md:col-span-3 lg:col-span-5 lg:pr-8">
              <Image
                alt="logo"
                src="/images/smartcam-logo.png"
                className="h-24"
                radius="none"
              />

              <p className="text-2xl font-semibold leading-relaxed text-primary mt-3 max-w-xl">
                Make your IT Business Growth
              </p>
              <ul className="flex items-center space-x-3 mt-9">
                <li>
                  <Link
                    href="https://www.facebook.com/smartcam168"
                    target="_blank"
                    rel="noreferer"
                    className="flex items-center justify-center text-primary transition-all duration-200 bg-content2 rounded-full w-7 h-7 hover:bg-primary focus:bg-primary hover:text-white"
                  >
                    <Icon icon="ic:baseline-facebook" fontSize={21} />
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://t.me/joinchat/09E4pilK89llNDM1"
                    target="_blank"
                    rel="noreferer"
                    className="flex items-center justify-center text-primary transition-all duration-200 bg-content2 rounded-full w-7 h-7 hover:bg-primary focus:bg-primary hover:text-white"
                  >
                    <Icon icon="mingcute:telegram-fill" fontSize={18} />
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://www.youtube.com/@smartcam123"
                    target="_blank"
                    rel="noreferer"
                    className="flex items-center justify-center text-primary transition-all duration-200 bg-content2 rounded-full w-7 h-7 hover:bg-primary focus:bg-primary hover:text-white"
                  >
                    <Icon icon="mingcute:youtube-fill" fontSize={18} />
                  </Link>
                </li>
              </ul>
            </div>
            {/* Products */}
            <div className="col-span-4">
              <p className="text-md underline font-semibold tracking-widest uppercase">
                Products
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {data.storeOwnerBrands.map((b: BrandsType, idx: number) => (
                  <Link
                    href={`/products?search=&brands=${b.title ? b.title?.en : ""}`}
                    key={idx}
                    className="hover:text-primary hover:underline"
                  >
                    {b?.title?.en}
                  </Link>
                ))}
              </div>
            </div>
            {/* Terms */}
            <div className="col-span-1">
              <p className="text-md underline font-semibold tracking-widest uppercase">
                Terms
              </p>

              <ul className="mt-6 space-y-4">
                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 hover:underline"
                  >
                    Terms & Conditions
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            {/* Company */}
            <div className="col-span-1">
              <p className="text-md underline font-semibold tracking-widest uppercase">
                Company
              </p>

              <ul className="mt-6 space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 hover:underline"
                  >
                    About US
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 hover:underline"
                  >
                    Contact US
                  </Link>
                </li>

                {/* <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Events
                  </Link>
                </li> */}

                <li>
                  <Link
                    href="/about#customers"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 hover:underline"
                  >
                    Our Customers
                  </Link>
                </li>

                {/* <li>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Careers
                  </Link>
                </li> */}
              </ul>
            </div>
            {/* Account */}
            <div className="col-span-1">
              <p className="text-md underline font-semibold tracking-widest uppercase">
                Account
              </p>

              <ul className="mt-6 space-y-4">
                <li>
                  {!user && (
                    <Link
<<<<<<< HEAD
                      href={`${process.env.NEXT_PUBLIC_BACKEND}/sso/store?store_id=${process.env.NEXT_PUBLIC_ID_STORE}&redirect_url=${window.location.origin}&domain=${window.location.origin}`}
                      className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
=======
                      href={`${process.env.NEXT_PUBLIC_BACKEND}/sso/store`}
                      className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 hover:underline"
>>>>>>> origin/thith
                    >
                      Login
                    </Link>
                  )}
                </li>

                <li>
                  <Link
                    href="/locations"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 hover:underline"
                  >
                    My Locations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/compare"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 hover:underline"
                  >
                    Compare
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 hover:underline"
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 hover:underline"
                  >
                    Order
                  </Link>
                </li>

                <li>
                  <Link
                    href="/wishlist"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 hover:underline"
                  >
                    My Wishlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <hr className="mt-16 mb-10 border-gray-200" /> */}
        </div>
      </footer>
      <div className="bg-gradient-to-r from-primary to-primary-800 py-3">
        <p className="text-sm text-center text-white">
          © Copyright 2024, All Rights Reserved by Smartcam Eletronics
        </p>
      </div>
    </section>
  );
};

export default MainFooter;
