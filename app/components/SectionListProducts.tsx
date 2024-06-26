"use client";

import Link from "next/link";
import React, { FC, ReactNode } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Spacer } from "@nextui-org/react";

interface Props {
  children: ReactNode;
  title: string;
}

const SectionListProducts: FC<Props> = ({ children, title }) => {
  return (
    <section className="px-6 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link
          href="#"
          className="text-primary flex items-center gap-1 hover:underline"
        >
          See more
          <Icon icon="solar:arrow-right-linear" fontSize={15} />
        </Link>
      </div>
      <Spacer y={3} />
      {children}
    </section>
  );
};

export default SectionListProducts;
