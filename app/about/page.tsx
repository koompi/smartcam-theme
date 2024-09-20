"use client";

import React from "react";
import TextParallaxContent from "./components/TextParallaxContent";
import TextSupportContent from "./components/TextSupportContent";
import { ClientGridCard } from "./components/ClientGridCard";

const AboutPage = () => {
  return (
    <div className="bg-background py-3">
      <TextParallaxContent
        imgUrl="/images/behind.jpg"
        subheading="Behind"
        heading="Smartcam"
      >
        <TextSupportContent title="We are Smartcam">
          <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
            Smartcam is the leading company focus on electronics ( computer ,
            Printer ( EPSON, HP, CANON) and parts). we will our best to offer
            best services and products.
          </p>
        </TextSupportContent>
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/images/becam.jpg"
        subheading=""
        heading="Be Cambodia's trusted source"
      >
        <TextSupportContent title="Vision">
          <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
            To be the leading one-stop IT hardware solution provider in
            Cambodia.
          </p>
        </TextSupportContent>
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/images/vm.jpg"
        subheading=""
        heading="Top hardware, best value"
      >
        <TextSupportContent title="Mission">
          <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
            Offer high quality products - competitive price and delivering
            excellence customer service
          </p>
        </TextSupportContent>
      </TextParallaxContent>
      <ClientGridCard />
    </div>
  );
};

export default AboutPage;
