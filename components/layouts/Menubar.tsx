"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export const Menubar = () => {
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
          <Button
            as={Link}
            href="#"
            radius="lg"
            variant="light"
            className="bg-transparent"
          >
            Special Offer
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Support</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">About US</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
};
