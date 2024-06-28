"use client";

import React, { FC } from "react";

interface TextType {
  children: React.ReactNode;
  title: string;
}

const TextSupportContent: FC<TextType> = ({ children, title }) => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4">{title}</h2>
      <div className="col-span-1 md:col-span-8">{children}</div>
    </div>
  );
};

export default TextSupportContent;
