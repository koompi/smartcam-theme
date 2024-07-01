"use client";

import { Spacer } from "@nextui-org/react";
import React from "react";
import NewsCard from "./NewsCard";

const NewsBanner = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <NewsCard
        classNames="col-span-9"
        title="Lorem ipsum dolor sit amet consectetur. Massa consequat risus eu lobortis turpis arcu elementum. Imperdiet eget purus convallis curabitur aliquam vitae etiam lorem. Id id vehicula"
        href={"#"}
        imageSrc="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        isLoading={false}
        isBanner={true}
        author="Smartcam"
        createdAt="09/09/2024"
      />
      <div className="col-span-3">
        <NewsCard
          title="Lorem ipsum dolor sit amet consectetur. Massa consequat risus eu lobortis turpis arcu elementum. Imperdiet eget purus convallis curabitur aliquam vitae etiam lorem. Id id vehicula"
          href={"#"}
          imageSrc="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          isLoading={false}
          isBanner={false}
          author="Smartcam"
          createdAt="09/09/2024"
        />
        <Spacer y={6} />
        <NewsCard
          title="Lorem ipsum dolor sit amet consectetur. Massa consequat risus eu lobortis turpis arcu elementum. Imperdiet eget purus convallis curabitur aliquam vitae etiam lorem. Id id vehicula"
          href={"#"}
          imageSrc="https://images.unsplash.com/photo-1560523160-754a9e25c68f?q=80&w=3836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          isLoading={false}
          isBanner={false}
          author="Smartcam"
          createdAt="09/09/2024"
        />
      </div>
    </div>
  );
};

export default NewsBanner;
