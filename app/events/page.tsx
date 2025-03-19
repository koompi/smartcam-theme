"use client";

import React, { useState } from "react";
import { Button, Spacer } from "@nextui-org/react";
import NewsCard, { CardItems } from "./component/NewsCard";
import NewsBanner from "./component/NewsBanner";
import { useQuery } from "@apollo/client";
import { BLOGS } from "@/graphql/cms";
import { Loading } from "@/components/globals/Loading";

const EventsPage = () => {
  const [limit, setLimit] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, loading, fetchMore } = useQuery(BLOGS, {
    variables: {
      keyword: null,
      filter: {
        limit: limit,
        paginate: true,
        skip: 0,
        sort: -1,
      },
    },
  });

  if (loading && !data) {
    return <Loading />;
  }

  const filterBlogs = data?.storeBlogs?.blogs.slice(0, 3);

  const loadMore = async () => {
    setIsLoadingMore(true);
    await fetchMore({
      variables: {
        filter: {
          limit: limit + 12,
          paginate: true,
          skip: 0,
          sort: -1,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.storeBlogs?.blogs.length) return prev;
        return {
          storeBlogs: {
            ...fetchMoreResult.storeBlogs,
            blogs: [
              ...prev.storeBlogs.blogs,
              ...fetchMoreResult.storeBlogs.blogs,
            ],
          },
        };
      },
    });
    setLimit(limit + 12);
    setIsLoadingMore(false);
  };

  return (
    <section className="container py-6 px-3">
      <NewsBanner {...filterBlogs} />
      <Spacer y={12} />
      <h1 className="font-bold text-2xl">All News</h1>
      <Spacer y={3} />
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-y-12 gap-3 sm:gap-x-3 lg:gap-6">
        {data?.storeBlogs?.blogs.map((res: CardItems, idx: number) => (
          <NewsCard
            key={idx}
            title={res?.title}
            thumbnail={res?.thumbnail}
            isLoading={loading}
            isBanner={false}
            owner={res?.owner}
            createdAt={res?.createdAt}
            href={`/events/${res?.id}`}
          />
        ))}
      </div>
      {data?.storeBlogs?.total > limit && (
        <div className="flex justify-center mt-6">
          <Button
            onPress={loadMore}
            disabled={loading}
            color="primary"
            isLoading={isLoadingMore}
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  );
};

export default EventsPage;
