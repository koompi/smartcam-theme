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

import {
  FacebookShareButton,
  FacebookIcon,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";

const EventSinglePage = () => {
  const fullHost = window.location.href;

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

              <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">
                Announcing a free plan for small teams
              </h2>

              <div className="flex items-center gap-x-5">
                <Link
                  className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:text-neutral-200"
                  href="#"
                >
                  Company News
                </Link>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-neutral-200">
                  January 18, 2023
                </p>
              </div>

              <p className="text-lg text-gray-800 dark:text-neutral-200">
                At preline, our mission has always been focused on bringing
                openness and transparency to the design process. We've always
                believed that by providing a space where designers can share
                ongoing work not only empowers them to make better products, it
                also helps them grow.
              </p>

              <p className="text-lg text-gray-800 dark:text-neutral-200">
                We're proud to be a part of creating a more open culture and to
                continue building a product that supports this vision.
              </p>

              <div className="text-center">
                <div className="grid lg:grid-cols-2 gap-3">
                  <div className="grid grid-cols-2 lg:grid-cols-1 place-items-stretch gap-3">
                    <Image
                      className="h-full"
                      src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                      alt="Image Description"
                      radius="lg"
                    />
                    <Image
                      className="h-full"
                      src="https://images.unsplash.com/photo-1671726203638-83742a2721a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                      alt="Image Description"
                    />
                  </div>
                  <Image
                    className="h-full"
                    src="https://images.unsplash.com/photo-1671726203394-491c8b574a0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                    alt="Image Description"
                  />
                </div>

                <span className="mt-3 block text-sm text-center text-gray-500 dark:text-neutral-500">
                  Working process
                </span>
              </div>

              <p className="text-lg text-gray-800 dark:text-neutral-200">
                As we've grown, we've seen how Preline has helped companies such
                as Spotify, Microsoft, Airbnb, Facebook, and Intercom bring
                their designers closer together to create amazing things. We've
                also learned that when the culture of sharing is brought in
                earlier, the better teams adapt and communicate with one
                another.
              </p>

              <p className="text-lg text-gray-800 dark:text-neutral-200">
                That's why we are excited to share that we now have a{" "}
                <Link
                  className="text-primary decoration-2 hover:underline font-medium dark:text-primary"
                  href="#"
                >
                  free version of Preline
                </Link>
                , which will allow individual designers, startups and other
                small teams a chance to create a culture of openness early on.
              </p>

              <blockquote className="text-center p-4 sm:px-7">
                <p className="text-xl font-medium text-gray-800 lg:text-2xl lg:leading-normal xl:text-2xl xl:leading-normal dark:text-neutral-200">
                  To say that switching to Preline has been life-changing is an
                  understatement. My business has tripled and I got my life
                  back.
                </p>
                <p className="mt-5 text-gray-800 dark:text-neutral-200">
                  Nicole Grazioso
                </p>
              </blockquote>

              <figure>
                <Image
                  radius="lg"
                  src="https://images.unsplash.com/photo-1671726203454-488ab18f7eda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Image Description"
                />
                <figcaption className="mt-3 text-sm text-center text-gray-500 dark:text-neutral-500">
                  A man and a woman looking at a cell phone.
                </figcaption>
              </figure>

              <div className="space-y-3">
                <h3 className="text-2xl font-semibold dark:text-white">
                  Bringing the culture of sharing to everyone
                </h3>

                <p className="text-lg text-gray-800 dark:text-neutral-200">
                  We know the power of sharing is real, and we want to create an
                  opportunity for everyone to try Preline and explore how
                  transformative open communication can be. Now you can have a
                  team of one or two designers and unlimited spectators (think
                  PMs, management, marketing, etc.) share work and explore the
                  design process earlier.
                </p>
              </div>

              <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                <li className="ps-2">
                  Preline allows us to collaborate in real time and is a really
                  great way for leadership on the team to stay up-to-date with
                  what everybody is working on,"{" "}
                  <Link
                    className="text-primary decoration-2 hover:underline font-medium dark:text-primary"
                    href="#"
                  >
                    said
                  </Link>{" "}
                  Stewart Scott-Curran, Intercom's Director of Brand Design.
                </li>
                <li className="ps-2">
                  Preline opened a new way of sharing. It's a persistent way for
                  everyone to see and absorb each other's work," said David
                  Scott, Creative Director at{" "}
                  <Link
                    className="text-primary decoration-2 hover:underline font-medium dark:text-primary"
                    href="#"
                  >
                    Eventbrite
                  </Link>
                  .
                </li>
              </ul>

              <p className="text-lg text-gray-800 dark:text-neutral-200">
                Small teams and individual designers need a space where they can
                watch the design process unfold, both for themselves and for the
                people they work with – no matter if it's a fellow designer,
                product manager, developer or client. Preline allows you to
                invite more people into the process, creating a central place
                for conversation around design. As those teams grow,
                transparency and collaboration becomes integrated in how they
                communicate and work together.
              </p>

              <div className="grid lg:flex lg:justify-between lg:items-center gap-y-5 lg:gap-y-0">
                <div>
                  <Link
                    className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                    href="#"
                  >
                    Plan
                  </Link>
                  <Link
                    className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                    href="#"
                  >
                    Web development
                  </Link>
                  <Link
                    className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                    href="#"
                  >
                    Free
                  </Link>
                  <Link
                    className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                    href="#"
                  >
                    Team
                  </Link>
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
        </div>

        <div className="lg:col-span-1 lg:w-full lg:h-full">
          <div className="sticky top-32 start-0 py-8 lg:ps-8">
            <div className="space-y-6">
              <Link className="group flex items-center gap-x-6" href="#">
                <div className="grow">
                  <span className="text-sm font-bold text-gray-800 group-hover:text-primary dark:text-neutral-200 dark:group-hover:text-primary">
                    5 Reasons to Not start a UX Designer Career in 2022/2023
                  </span>
                </div>

                <div className="flex-shrink-0 relative rounded-lg overflow-hidden size-20">
                  <Image
                    isZoomed
                    className="h-32 object-cover"
                    src="https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    alt="Image Description"
                  />
                </div>
              </Link>

              <Link className="group flex items-center gap-x-6" href="#">
                <div className="grow">
                  <span className="text-sm font-bold text-gray-800 group-hover:text-primary dark:text-neutral-200 dark:group-hover:text-primary">
                    If your UX Portfolio has this 20% Well Done, it Will Give
                    You an 80% Result
                  </span>
                </div>

                <div className="flex-shrink-0 relative rounded-lg overflow-hidden size-20">
                  <Image
                    className="h-32 object-cover"
                    isZoomed
                    src="https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    alt="Image Description"
                  />
                </div>
              </Link>

              <Link className="group flex items-center gap-x-6" href="#">
                <div className="grow">
                  <span className="text-sm font-bold text-gray-800 group-hover:text-primary dark:text-neutral-200 dark:group-hover:text-primary">
                    7 Principles of Icon Design
                  </span>
                </div>

                <div className="flex-shrink-0 relative rounded-lg overflow-hidden size-20">
                  <Image
                    isZoomed
                    className="h-32 object-cover"
                    src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    alt="Image Description"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSinglePage;
