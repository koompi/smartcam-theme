"use client";

import { Spacer } from "@nextui-org/react";
import React, { FC } from "react";
import NewsCard, { CardItems } from "./NewsCard";

const NewsBanner: FC<CardItems> = (props) => {
  console.log("prps", props);

  const blogs = Object.values(props); // Convert object to array

  if (blogs.length <= 0) return null;

  const mainBlog: any = blogs[0]; // First blog post for the banner
  const subBlogs = blogs.slice(1); // Remaining blog posts

  return (
    <div className="grid grid-cols-12 gap-6">
      <NewsCard
        classNames="col-span-9"
        title={mainBlog?.title}
        href={`/events/${mainBlog?.id}`}
        thumbnail={mainBlog?.thumbnail}
        isBanner={true}
        isLoading={false}
        owner={mainBlog?.owner}
        createdAt={new Date(mainBlog?.createdAt).toLocaleDateString()}
      />
      <div className="col-span-3 flex flex-col gap-6">
        {subBlogs?.map((blog: any, idx) => {
          return (
            <NewsCard
              key={idx}
              title={blog?.title}
              href={`/events/${blog?.id}`}
              thumbnail={blog?.thumbnail}
              isBanner={false}
              isLoading={false}
              owner={blog?.owner}
              createdAt={new Date(blog?.createdAt).toLocaleDateString()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsBanner;
