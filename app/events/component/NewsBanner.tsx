"use client";

import React, { FC } from "react";
import NewsCard, { CardItems } from "./NewsCard";

const NewsBanner: FC<CardItems> = (props) => {
  const blogs = Object.values(props); // Convert object to array

  if (blogs.length <= 0) return null;

  const mainBlog: any = blogs[0]; // First blog post for the banner
  const subBlogs = blogs.slice(1); // Remaining blog posts

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-12 gap-y-12 gap-0 sm:gap-0 lg:gap-6">
      <NewsCard
        classNames="col-span-1 sm:col-span-1 lg:col-span-9"
        title={mainBlog?.title}
        href={`/events/${mainBlog?.id}`}
        thumbnail={mainBlog?.thumbnail}
        isBanner={true}
        isLoading={false}
        owner={mainBlog?.owner}
        createdAt={mainBlog?.createdAt}
      />
      <div className="col-span-3 flex flex-row sm:flex-row lg:flex-col gap-1 sm:gap-1 lg:gap-6 ">
        {subBlogs?.map((blog: any, idx) => {
          return (
            <NewsCard
              classNames="w-1/2 sm:w-1/2 lg:w-full"
              key={idx}
              title={blog?.title}
              href={`/events/${blog?.id}`}
              thumbnail={blog?.thumbnail}
              isBanner={false}
              isLoading={false}
              owner={blog?.owner}
              createdAt={mainBlog?.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsBanner;
