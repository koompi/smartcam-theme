"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  Divider,
  Image,
  Spacer,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React from "react";

const SupprtPage = () => {
  return (
    <section className="px-6">
      <h1 className="text-xl font-semibold bg-gradient-to-br from-white-800 to-white-500 bg-clip-text tracking-tight">
        Frequently Asked Questions
      </h1>
      <Spacer y={6} />
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet consectetur. Nisl et mauris tincidunt massa
        adipiscing. Habitasse posuere velit sed vitae tincidunt. Tellus molestie
        commodo nisl commodo euismod turpis. Neque mauris in morbi vel orci
        adipiscing lobortis. Sapien ut fermentum lacinia consectetur phasellus
        nulla neque.
      </p>
      <Spacer y={3} />
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet consectetur. Nisl et mauris tincidunt massa
        adipiscing. Habitasse posuere velit sed vitae tincidunt. Tellus molestie
        commodo nisl commodo euismod turpis. Neque mauris in morbi vel orci
        adipiscing lobortis. Sapien ut fermentum lacinia consectetur phasellus
        nulla neque.
      </p>
      <Spacer y={3} />
      <Accordion
        fullWidth
        keepContentMounted
        className="gap-3"
        itemClasses={{
          base: "px-0 sm:px-6",
          title: "font-medium",
          trigger: "py-6 flex-row-reverse",
          content: "pt-0 pb-6 text-gray-500",
        }}
        items={faqs}
        // selectionMode="multiple"
      >
        {faqs.map((item, i) => (
          <AccordionItem
            key={i}
            indicator={<Icon icon="lucide:plus" width={24} />}
            title={<p className="text-gray-500 text-md">{item.title}</p>}
          >
            {/* {item.content} */}

            {/* <video className="h-full w-full rounded-lg" controls>
              <source
                src="https://docs.material-tailwind.com/demo.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video> */}
            <iframe
              width="560"
              height="315"
              src={item.content}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-xl w-full min-h-[30rem] h-full"
            ></iframe>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default SupprtPage;

const faqs = [
  {
    title: "How to taking care of Macbook Pro M3?",
    content: "https://www.youtube.com/embed/0pg_Y41waaE?si=wvrKW7aLhTPkfLe2",
  },
  {
    title: "Macbook Pro M3",
    content: "https://www.youtube.com/embed/UjmaxCyJBc4?si=ayH-RaXMCGdaHxKn",
  },
  {
    title: "Epson Printer",
    content: "https://www.youtube.com/embed/AeeWy4aUCWc?si=nqF6LRf3_tKUs2FO",
  },
  {
    title: "Others",
    content: "https://www.youtube.com/embed/6nmGaELWdS0?si=sLMByh0ldutWl-nl",
  },
];
