"use client";

import React from "react";
import { Link as MyLink, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import MyLocation from "./components/MyLocation";
import { useQuery } from "@apollo/client";
import { LocationType } from "@/types/location";
import { GET_ALL_LOCATIONS } from "@/graphql.bk/location";
import Link from "next/link";

export default function Page() {
  const { data, loading } = useQuery(GET_ALL_LOCATIONS);

  if (loading) {
    return null;
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <h1 className="text-xl font-medium">My Locations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
        {data?.storeLocations?.map((location: LocationType, idx: number) => {
          return <MyLocation key={idx} {...location} />;
        })}
        <MyLink
          as={Link}
          href="/locations/create"
          className="w-full h-40 border border-dashed rounded-xl items-center justify-center hidden sm:hidden lg:flex"
          underline="hover"
        >
          <div className="flex gap-3">
            <Icon icon="solar:map-point-add-linear" fontSize={24} />
            Add Location
          </div>
        </MyLink>
      </div>
      <div className="fixed sm:fixed lg:hidden bottom-0 right-0 z-40 flex items-center justify-center bg-background w-full h-16">
        <div className="container mx-auto px-3 ">
          <Button
            size="lg"
            fullWidth
            color="primary"
            className="text-background"
            as={Link}
            href="/locations/create"
          >
            Add Location
          </Button>
        </div>
      </div>
    </section>
  );
}
