"use client";

import { useEffect } from "react";
import { Image, Button } from "@nextui-org/react";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="grid min-h-dvh place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center items-center">
          <Image
            isBlurred
            radius="none"
            alt="Empty"
            src="/images/404.png"
            className="h-32 sm:h-32 lg:h-60"
          />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Whoops! Page is error.
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Browse our amazing selection of products and fill your cart with
          goodies!
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            variant="shadow"
            color="primary"
            as={Link}
            href="/"
            className="text-background"
          >
            Go back home
          </Button>

          <Button
            variant="light"
            color="primary"
            as={Link}
            href="/products"
            endContent={<span aria-hidden="true">&rarr;</span>}
          >
            Products
          </Button>
        </div>
      </div>
    </section>
  );
}
