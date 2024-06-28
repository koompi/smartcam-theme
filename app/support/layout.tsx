"use client";

import React, { FC, ReactNode } from "react";
import { Divider, Image, Spacer, Tab, Tabs } from "@nextui-org/react";
import { usePathname } from "next/navigation";

interface Props {
  children: ReactNode;
}

const SupportLayout: FC<Props> = ({ children }) => {
  const pathname = usePathname();

  return (
    <section>
      <Image
        alt="support banner"
        src="https://images.unsplash.com/photo-1501959181532-7d2a3c064642?q=80&w=3893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        radius="none"
        className="max-h-[30rem] h-full object-cover object-center w-screen"
      />
      <div className="container max-w-6xl py-12 flex items-stretch space-x-3">
        <div className="p-0 w-52">
          <h1 className="text-xl font-semibold">Help Topics</h1>
          <Spacer y={6} />
          <Tabs
            aria-label="Options"
            isVertical={true}
            size="lg"
            variant="underlined"
            color="primary"
            className="p-0"
            selectedKey={pathname}
          >
            <Tab
              key="/support/video-support"
              title="Video Support"
              href="/support/video-support"
            />
            <Tab
              key="/support/software_support"
              href="/support/software_support"
              title="Software Support"
            />

            <Tab key="/support/others" href="/support/others" title="Others" />
          </Tabs>
        </div>
        <Divider className="my-4 min-h-60" orientation="vertical" />
        <div>{children}</div>
      </div>
    </section>
  );
};

export default SupportLayout;
