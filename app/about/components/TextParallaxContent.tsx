"use client";

import React, { ReactNode } from "react";
import StickyImage from "./StickyImage";
import OverlayCopy from "./OverlayCopy";

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
}) => {
  return (
    <div className="px-0 sm:px-0 lg:px-3">
      <div className="relative h-[150dvh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

export default TextParallaxContent;
