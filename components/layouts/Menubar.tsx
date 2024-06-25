"use client";

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Select,
  SelectItem,
  Spacer,
  Image,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import React, { FC } from "react";
import PopoverFilterWrapper from "../CustomComponent/PopoverFilterWrapper";
import PriceSlider from "../CustomComponent/PriceSlider";
import { Icon } from "@iconify/react/dist/iconify.js";

interface SubMenuType {
  url: string;
  title: string;
  desc: string;
  key: number;
}

export const SubMenu: FC<SubMenuType> = (props) => {
  return (
    <Link
      href={props.url}
      className="col-span-1 min-h-[6rem] flex flex-col items-start text-start justify-center rounded-md border-2 border-background transition-all hover:border-primary hover:bg-background p-3"
    >
      <h1 className="text-md font-medium">{props.title}</h1>
      <Spacer y={2} />
      <p className="font-light text-xs text-default-600">{props.desc}</p>
    </Link>
  );
};

export const Menubar = () => {
  const aboutus_menu = [
    {
      url: "#",
      title: "Who We Are?",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?",
    },
    {
      url: "#",
      title: "Contact US",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?",
    },
    {
      url: "#",
      title: "Events",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?",
    },
    {
      url: "#",
      title: "Our Customers",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?",
    },
    {
      url: "#",
      title: "Careers",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?",
    },
  ];
  const support_menu = [
    {
      url: "#",
      title: "Chat to Technical",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?",
    },
    {
      url: "#",
      title: "Vidoe Support",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?",
    },
    {
      url: "#",
      title: "Sofware Support",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?",
    },
    {
      url: "#",
      title: "Helps",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?",
    },
  ];

  const logo = [
    {
      title: "Accer",
      src: "acer.png",
    },
    {
      title: "Adata",
      src: "adata.png",
    },
    {
      title: "Apc",
      src: "apc.png",
    },
    {
      title: "Apple",
      src: "apple.png",
    },
    {
      title: "Asus",
      src: "asus.png",
    },
    {
      title: "Canon",
      src: "canon.png",
    },
    {
      title: "Dahua",
      src: "dahua.png",
    },
    {
      title: "Dell",
      src: "dell.png",
    },
    {
      title: "Epson",
      src: "epson.png",
    },
    {
      title: "Hikvision",
      src: "hikvision.png",
    },
    {
      title: "Hp",
      src: "hp.png",
    },
    {
      title: "Ion",
      src: "ion.png",
    },
    {
      title: "Lelnovo",
      src: "lenovo.png",
    },
    {
      title: "Meki",
      src: "meki.png",
    },
    {
      title: "Microsoft",
      src: "microsoft.png",
    },
    {
      title: "Prolink",
      src: "prolink.png",
    },
  ];

  return (
    <Navbar shouldHideOnScroll maxWidth="full" className="bg-foreground h-12">
      <NavbarContent
        className="hidden sm:flex gap-4 text-primary"
        justify="center"
      >
        <NavbarItem isActive>
          <Link href="#">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          {/* <Link href="#">Special Offer</Link> */}
          {/* <Button
            as={Link}
            href="#"
            radius="lg"
            variant="light"
            className="bg-transparent "
          >
            Special Offer
          </Button> */}
          <a
            href="#_"
            className="relative px-5 py-2 font-medium text-white group"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-primary group-hover:bg-danger group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-danger group-hover:bg-primary group-hover:-skew-x-12"></span>
            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-primary/60 -rotate-12"></span>
            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-primary/60 -rotate-12"></span>
            <span className="relative"> Special Offer</span>
          </a>
        </NavbarItem>
        <NavbarItem>
          <Popover placement="bottom" showArrow offset={12}>
            <PopoverTrigger>
              <Button variant="light" color="primary" className="text-md">
                Support
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <div className="max-w-2xl grid grid-cols-6">
                <div className="bg-background rounded-tl-lg rounded-bl-lg col-span-2 p-6 ">
                  <h1 className="text-xl font-semibold">Support</h1>
                  <Spacer y={2} />
                  <p className="font-light text-xs text-default-600">
                    SMARTCAM is the leading company focus on electronics (
                    computer , Printer ( EPSON, HP, CANON) and parts). we will
                    our best to offer best services and products.
                  </p>
                  <Link
                    href="#"
                    className="text-primary flex items-center gap-1 hover:underline absolute bottom-6"
                  >
                    See more
                    <Icon icon="solar:arrow-right-linear" fontSize={15} />
                  </Link>
                </div>
                <div className="col-span-4 grid grid-cols-2 p-3 gap-2">
                  {support_menu.map((res, idx) => (
                    <SubMenu
                      key={idx}
                      url={res.url}
                      title={res.title}
                      desc={res.desc}
                    />
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
        <NavbarItem>
          <Popover placement="bottom" showArrow offset={12}>
            <PopoverTrigger>
              <Button variant="light" color="primary" className="text-md">
                About US
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <div className="max-w-3xl grid grid-cols-6">
                <div className="bg-background rounded-tl-lg rounded-bl-lg col-span-2 p-6 ">
                  <h1 className="text-xl font-semibold">About US</h1>
                  <Spacer y={2} />
                  <p className="font-light text-xs text-default-600">
                    SMARTCAM is the leading company focus on electronics (
                    computer , Printer ( EPSON, HP, CANON) and parts). we will
                    our best to offer best services and products.
                  </p>
                  <Link
                    href="#"
                    className="text-primary flex items-center gap-1 hover:underline absolute bottom-6"
                  >
                    See more
                    <Icon icon="solar:arrow-right-linear" fontSize={15} />
                  </Link>
                </div>
                <div className="col-span-4 grid grid-cols-2 p-3 gap-2">
                  {aboutus_menu.map((res, idx) => (
                    <SubMenu
                      key={idx}
                      url={res.url}
                      title={res.title}
                      desc={res.desc}
                    />
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="flex items-center gap-0">
        <PopoverFilterWrapper title="Pricing Range">
          <PriceSlider
            aria-label="Pricing Filter"
            range={{
              min: 0,
              defaultValue: [100, 500],
              max: 2000,
              step: 1,
            }}
          />
        </PopoverFilterWrapper>
        <Spacer x={1} />
        {/* ========brands ======== */}
        <Select
          aria-label="Sort by"
          classNames={{
            base: "items-center justify-end max-w-fit",
            value: "w-[9rem]",
          }}
          radius="full"
          labelPlacement="outside-left"
          placeholder="Brands"
          variant="bordered"
        >
          {logo.map((res, idx) => {
            return (
              <SelectItem
                key={idx}
                value={res.title}
                startContent={
                  <Image
                    alt={res.title}
                    src={`/images/brands/${res.src}`}
                    className="h-9 w-9 object-contain bg-background rounded-full p-1"
                    radius="none"
                  />
                }
              >
                {res.title}
              </SelectItem>
            );
          })}
        </Select>
        <Spacer x={1} />
        {/* ========categories ======== */}
        <Select
          aria-label="Sort by"
          classNames={{
            base: "items-center justify-end max-w-fit",
            value: "w-[9rem]",
          }}
          radius="full"
          // defaultSelectedKeys={["most_popular"]}
          labelPlacement="outside-left"
          placeholder="Category"
          variant="bordered"
        >
          <SelectItem key="computer" value="computer">
            Computer
          </SelectItem>
          <SelectItem key="printers" value="printers">
            Printers
          </SelectItem>
          <SelectItem key="accessories" value="accessories">
            Accessories
          </SelectItem>
          <SelectItem key="projectors" value="projectors">
            Projectors
          </SelectItem>
        </Select>
        <Spacer x={1} />
        {/* ======= short ======= */}
        <Select
          aria-label="Sort by"
          classNames={{
            base: "items-center justify-end max-w-fit",
            value: "w-[9rem]",
          }}
          radius="full"
          defaultSelectedKeys={["most_popular"]}
          labelPlacement="outside-left"
          placeholder="Select an option"
          variant="bordered"
          disallowEmptySelection
        >
          <SelectItem key="newest" value="newest">
            Newest
          </SelectItem>
          <SelectItem key="price_low_to_high" value="price_low_to_high">
            Price: Low to High
          </SelectItem>
          <SelectItem key="price_high_to_low" value="price_high_to_low">
            Price: High to Low
          </SelectItem>
          <SelectItem key="top_rated" value="top_rated">
            Top Rated
          </SelectItem>
          <SelectItem key="most_popular" value="most_popular">
            Most Popular
          </SelectItem>
        </Select>
      </NavbarContent>
    </Navbar>
  );
};
