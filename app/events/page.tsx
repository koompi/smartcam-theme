"use client";

import React from "react";
import { Spacer, Tab, Tabs } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import NewsCard from "./component/NewsCard";
import NewsBanner from "./component/NewsBanner";

export const news = [
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Massa consequat risus eu lobortis turpis arcu elementum. Imperdiet eget purus convallis curabitur aliquam vitae etiam lorem. Id id vehicula",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLoading: false,
    isBanner: false,
    author: "Smartcam",
    createdAt: "09/09/2024",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Massa consequat risus eu lobortis turpis arcu elementum. Imperdiet eget purus convallis curabitur aliquam vitae etiam lorem. Id id vehicula",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLoading: false,
    isBanner: false,
    author: "Smartcam",
    createdAt: "09/09/2024",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Massa consequat risus eu lobortis turpis arcu elementum. Imperdiet eget purus convallis curabitur aliquam vitae etiam lorem. Id id vehicula",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLoading: false,
    isBanner: false,
    author: "Smartcam",
    createdAt: "09/09/2024",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Massa consequat risus eu lobortis turpis arcu elementum. Imperdiet eget purus convallis curabitur aliquam vitae etiam lorem. Id id vehicula",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1610500795224-fb86b02926d7?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLoading: false,
    isBanner: false,
    author: "Smartcam",
    createdAt: "09/09/2024",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Massa consequat risus eu lobortis turpis arcu elementum. Imperdiet eget purus convallis curabitur aliquam vitae etiam lorem. Id id vehicula",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1693031630369-bd429a57f115?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLoading: false,
    isBanner: false,
    author: "Smartcam",
    createdAt: "09/09/2024",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Massa consequat risus eu lobortis turpis arcu elementum. Imperdiet eget purus convallis curabitur aliquam vitae etiam lorem. Id id vehicula",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1693031630146-568e2f72db0e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLoading: false,
    isBanner: false,
    author: "Smartcam",
    createdAt: "09/09/2024",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Massa consequat risus eu lobortis turpis arcu elementum. Imperdiet eget purus convallis curabitur aliquam vitae etiam lorem. Id id vehicula",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1510125964506-dc5a14f3ef4e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLoading: false,
    isBanner: false,
    author: "Smartcam",
    createdAt: "09/09/2024",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Massa consequat risus eu lobortis turpis arcu elementum. Imperdiet eget purus convallis curabitur aliquam vitae etiam lorem. Id id vehicula",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1650094980833-7373de26feb6?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLoading: false,
    isBanner: false,
    author: "Smartcam",
    createdAt: "09/09/2024",
  },
];

const EventsPage = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  return (
    <section className="container py-6">
      <NewsBanner />
      <Spacer y={12} />
      <h1 className="font-bold text-2xl">All Events</h1>
      <Spacer y={3} />
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          defaultSelectedKey={tag ? tag : "all"}
          radius="full"
          variant="light"
          color="primary"
          size="lg"
        >
          <Tab key="all" href="?tag=all" title="All" />
          <Tab key="technology" href="?tag=technology" title="Technology" />
          <Tab key="conferences" href="?tag=conferences" title="Conferences" />
          <Tab key="others" href="?tag=others" title="Others" />
        </Tabs>
      </div>
      <Spacer y={6} />
      <div className="grid grid-cols-4 gap-6">
        {Array.from(news, (res, idx) => {
          return (
            <NewsCard
              key={idx}
              title={res.title}
              imageSrc={res.imageSrc}
              isLoading={res.isLoading}
              isBanner={res.isBanner}
              author={res.author}
              createdAt={res.createdAt}
              href={`/events/${idx}`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default EventsPage;
