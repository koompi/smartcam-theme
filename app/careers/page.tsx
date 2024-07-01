"use client";

import React from "react";
import { Button, Image, Spacer, Tab, Tabs } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";
import JobCard from "./component/JobCard";
import Link from "next/link";

const jobs = [
  {
    title: "Graphic Designer",
    type: "Full Times",
    desc: "Lorem ipsum dolor sit amet consec tetur. Tempor viverra ac non phare tra eu facilisi non eros eget. Quam  laoreet dignissim eu purus sit mole stie. Massa nibh mauris velit ac pre tium iaculis in rhoncus tincidunt.  Velit sagittis amet proin felis nec  iaculis.",
    salary: 600,
    thumbnail:
      "https://images.unsplash.com/photo-1635939412822-8f3ee593d147?q=80&w=3754&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Sale Operator",
    type: "Full Times",
    desc: "Lorem ipsum dolor sit amet consec tetur. Tempor viverra ac non phare tra eu facilisi non eros eget. Quam  laoreet dignissim eu purus sit mole stie. Massa nibh mauris velit ac pre tium iaculis in rhoncus tincidunt.  Velit sagittis amet proin felis nec  iaculis.",
    salary: 800,
    thumbnail:
      "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Delivery",
    type: "Full Times",
    desc: "Lorem ipsum dolor sit amet consec tetur. Tempor viverra ac non phare tra eu facilisi non eros eget. Quam  laoreet dignissim eu purus sit mole stie. Massa nibh mauris velit ac pre tium iaculis in rhoncus tincidunt.  Velit sagittis amet proin felis nec  iaculis.",
    salary: 400,
    thumbnail:
      "https://images.unsplash.com/photo-1695654390723-479197a8c4a3?q=80&w=3608&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Marketing",
    type: "Full Times",
    desc: "Lorem ipsum dolor sit amet consec tetur. Tempor viverra ac non phare tra eu facilisi non eros eget. Quam  laoreet dignissim eu purus sit mole stie. Massa nibh mauris velit ac pre tium iaculis in rhoncus tincidunt.  Velit sagittis amet proin felis nec  iaculis.",
    salary: 600,
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Full Stack Developer",
    type: "Full Times",
    desc: "Lorem ipsum dolor sit amet consec tetur. Tempor viverra ac non phare tra eu facilisi non eros eget. Quam  laoreet dignissim eu purus sit mole stie. Massa nibh mauris velit ac pre tium iaculis in rhoncus tincidunt.  Velit sagittis amet proin felis nec  iaculis.",
    salary: 600,
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Sofware Tester",
    type: "Full Times",
    desc: "Lorem ipsum dolor sit amet consec tetur. Tempor viverra ac non phare tra eu facilisi non eros eget. Quam  laoreet dignissim eu purus sit mole stie. Massa nibh mauris velit ac pre tium iaculis in rhoncus tincidunt.  Velit sagittis amet proin felis nec  iaculis.",
    salary: 600,
    thumbnail:
      "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CareerPage = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  return (
    <section className="py-6 container ">
      <div className="grid grid-cols-6 h-[85vh] place-content-center place-items-center gap-6">
        <div className="col-span-3">
          <h1 className="text-6xl font-bold">
            Explore the jobs opportunities!
          </h1>
          <Spacer y={9} />
          <p className="text-gray-600 text-2xl max-w-[45rem]">
            Lorem ipsum dolor sit amet consectetur. Arcu tortor tincidunt arcu
            molestie nulla ac odio id sed.
          </p>
        </div>
        <div className="col-span-3">
          <Image
            className="w-full h-[80vh] object-cover rounded-[9rem]"
            alt="banner"
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Button
            className="py-9 px-6 absolute bottom-12 z-20 right-[50rem]"
            radius="full"
            variant="shadow"
            size="lg"
            startContent={
              <Icon
                icon="solar:check-circle-bold"
                fontSize={45}
                className="text-primary"
              />
            }
          >
            Get a job now!
          </Button>
        </div>
      </div>
      <Spacer y={9} />
      <div>
        <div className="mx-auto justify-start">
          <h1 className="text-3xl font-bold text-center">New Job Openings</h1>
          <Spacer y={3} />
          <div className="w-full flex items-center justify-center">
            <p className="text-gray-600 text-lg text-center w-[60rem]">
              Lorem ipsum dolor sit amet consectetur. Arcu tortor tincidunt arcu
              molestie nulla ac odio id sed. Lorem ipsum dolor sit amet
              consectetur. Arcu tortor tincidunt arcu molestie nulla ac odio id
              sed.
            </p>
          </div>
        </div>
        <Spacer y={6} />
        <div className="flex w-full flex-col justify-center items-center">
          <Tabs
            aria-label="Options"
            defaultSelectedKey={tag ? tag : "all"}
            radius="full"
            variant="light"
            color="primary"
            size="lg"
          >
            <Tab key="all" href="?tag=all" title="All" />
            <Tab key="sale" href="?tag=sale" title="Sale" />
            <Tab key="marketing" href="?tag=marketing" title="Marketing" />
            <Tab key="designer" href="?tag=designer" title="Designer" />
          </Tabs>
        </div>
        <Spacer y={6} />
        <div className="grid grid-cols-4 gap-3 place-items-stretch">
          {Array.from(jobs, (res, idx) => {
            return (
              <Link href={`/careers/${idx}`} key={idx}>
                <JobCard
                  title={res.title}
                  type={res.type}
                  desc={res.desc}
                  salary={res.salary}
                  thumbnail={res.thumbnail}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerPage;
