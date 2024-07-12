"use client";

import { Card, Skeleton, Spinner } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-[85vh] grid place-items-center">
      <Spinner
        size="lg"
        label="Loading ..."
        color="primary"
        labelColor="primary"
      />
    </div>
  );
};

const LoadingNoFrame = () => {
  return (
    <div className="w-full grid place-items-center">
      <Spinner
        size="lg"
        label="Loading ..."
        color="primary"
        labelColor="primary"
      />
    </div>
  );
};

const CardLoading = () => {
  return (
    <div className="px-3 sm:px-3 lg:px-6 w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {[1, 2, 3, 4, 5].map((_, idx: number) => {
        return (
          <Card key={idx} className="w-full space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-60 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export { Loading, LoadingNoFrame, CardLoading };
