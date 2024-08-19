"use client";

import React from "react";
import TextParallaxContent from "./components/TextParallaxContent";
import TextSupportContent from "./components/TextSupportContent";
import { ClientGridCard } from "./components/ClientGridCard";

const AboutPage = () => {
  return (
    <div className="bg-background py-3">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
        imgUrl="https://images.unsplash.com/photo-1488155436641-58ef42fcc44e?q=80&w=2722&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
        imgUrl="https://images.unsplash.com/photo-1501523460185-2aa5d2a0f981?q=80&w=3662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
