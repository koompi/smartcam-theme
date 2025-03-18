"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@apollo/client";
import { BLOG, BLOGS } from "@/graphql/cms";

import {
  FacebookShareButton,
  FacebookIcon,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";
import { Loading } from "@/components/globals/Loading";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { LexicalReader } from "@/editor/LexicalReader";

const EventSinglePage = () => {
  const fullHost = window.location.href;
  const param = useParams();

  const { data, loading } = useQuery(BLOG, {
    variables: {
      storeBlogByIdId: param?.eventId,
    },
  });

  const { data: blogs, loading: blogsLoading } = useQuery(BLOGS);

  if (loading || !data || blogsLoading) {
    return <Loading />;
  }

  function getRandomItems<T extends { id: string }>(
    arr: T[],
    count: number,
    excludeId: string
  ): T[] {
    // Filter out the main blog post
    const filteredArr = arr.filter((item) => item.id !== excludeId);

    // Shuffle & Select
    return filteredArr
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, count)
      .map(({ item }) => item);
  }

  // Inside EventSinglePage component
  const mainBlogId = Array.isArray(param?.eventId)
    ? param?.eventId[0]
    : param?.eventId;

  const randomThreePosts = getRandomItems(
    blogs?.storeBlogs?.blogs,
    3,
    mainBlogId
  );

  const randomBlogs = Object.values(randomThreePosts);

  return (
    <div className="container">
      <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
        <div className="lg:col-span-2">
          <div className="py-8 lg:pe-8">
            <div className="space-y-5 lg:space-y-8">
              <Button
                variant="light"
                as={Link}
                className="decoration-1 hover:underline hover:text-primary"
                href="/events"
                startContent={
                  <Icon icon="solar:arrow-left-linear" fontSize={18} />
                }
              >
                Back to Events
              </Button>

              <h2 className="text-3xl font-semibold lg:text-5xl">
                {data?.storeBlogById?.title}
              </h2>

              <div className="flex items-center gap-x-5">
                <Link
                  className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:text-neutral-200"
                  href="#"
                >
                  Company News
                </Link>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-neutral-200">
                  {dayjs(data?.storeBlogById?.createdAt?.split(" ")[0]).format(
                    "MMMM D, YYYY	"
                  )}
                </p>
              </div>

              <div>
                <Image
                  alt={data?.storeBlogById?.title}
                  className="aspect-video w-screen overflow-hidden object-cover object-center"
                  isLoading={false}
                  isBlurred
                  isZoomed
                  src={
                    data?.storeBlogById?.thumbnail
                      ? `${process.env.NEXT_PUBLIC_S3}/${data?.storeBlogById?.thumbnail}`
                      : "/images/default-thumbnail.png"
                  }
                />
              </div>

              <div className="divide-y divide-dashed mt-3">
                <p className="sr-only">Product desc</p>
                <p className="line-clamp-9 text-medium text-gray-500 whitespace-pre-line pt-3 px-3">
                  <LexicalReader data={data?.storeBlogById?.description} />
                </p>
              </div>

              <div className="flex justify-end items-center gap-x-1.5">
                <div className="hs-dropdown relative inline-flex">
                  <Dropdown placement="top" size="lg" type="listbox">
                    <DropdownTrigger>
                      <Button
                        startContent={
                          <Icon icon="solar:share-bold" fontSize={18} />
                        }
                        variant="light"
                        radius="full"
                      >
                        Share
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="flat"
                      aria-label="Dropdown menu with description"
                    >
                      <DropdownItem
                        showDivider
                        key="new"
                        description="Copy link send to another"
                        startContent={
                          <Icon icon="solar:link-bold" fontSize={21} />
                        }
                      >
                        Copy Link
                      </DropdownItem>
                      <DropdownItem
                        key="telegram"
                        startContent={
                          <TwitterShareButton
                            url={fullHost}
                            title={
                              "next-share is a social share buttons for your next React apps."
                            }
                          >
                            <TwitterIcon size={24} round />
                          </TwitterShareButton>
                        }
                      >
                        <TwitterShareButton
                          url={fullHost}
                          title={
                            "next-share is a social share buttons for your next React apps."
                          }
                        >
                          Share on X
                        </TwitterShareButton>
                      </DropdownItem>
                      <DropdownItem
                        key="new"
                        startContent={
                          <TelegramShareButton
                            url={fullHost}
                            title={
                              "next-share is a social share buttons for your next React apps."
                            }
                          >
                            <TelegramIcon size={24} round />
                          </TelegramShareButton>
                        }
                      >
                        <TelegramShareButton
                          url={fullHost}
                          title={
                            "next-share is a social share buttons for your next React apps."
                          }
                        >
                          Share on Telgram
                        </TelegramShareButton>
                      </DropdownItem>
                      <DropdownItem
                        key="facebook"
                        startContent={
                          <FacebookShareButton
                            url={fullHost}
                            quote={
                              "next-share is a social share buttons for your next React apps."
                            }
                            hashtag={"#nextshare"}
                          >
                            <FacebookIcon size={24} round />
                          </FacebookShareButton>
                        }
                      >
                        <FacebookShareButton
                          url={fullHost}
                          quote={
                            "next-share is a social share buttons for your next React apps."
                          }
                          hashtag={"#nextshare"}
                        >
                          Share on Facebook
                        </FacebookShareButton>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>

        {blogs && randomBlogs.length > 0 && (
          <div className="lg:col-span-1 lg:w-full lg:h-full">
            <div className="sticky top-32 start-0 py-8 lg:ps-8">
              <div className="space-y-6">
                {randomBlogs.map((res: any, idx) => {
                  return (
                    <Link
                      key={idx}
                      className="group flex items-center gap-x-6"
                      href={`/events/${res?.id}`}
                    >
                      <div className="grow flex flex-col gap-1 items-end justify-end">
                        <span className="text-sm text-end line-clamp-3 font-bold text-gray-800 group-hover:underline">
                          {res?.title}
                        </span>
                        <span className="text-xs text-foreground-200">
                          {dayjs(
                            data?.storeBlogById?.createdAt?.split(" ")[0]
                          ).format("MMMM D, YYYY	")}
                        </span>
                      </div>

                      <div className="flex-shrink-0 relative rounded-lg overflow-hidden size-20">
                        <Image
                          isZoomed
                          isBlurred
                          className="h-32 w-32 object-cover object-center"
                          src={
                            res?.thumbnail
                              ? `${process.env.NEXT_PUBLIC_S3}/${res?.thumbnail}`
                              : "/images/default-thumbnail.png"
                          }
                          alt="Image Description"
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSinglePage;
