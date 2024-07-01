"use client";

import {
  Card,
  CardHeader,
  User,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import React, { FC } from "react";

interface JobCardProp {
  title: string;
  type: string;
  desc: string;
  salary: number;
  thumbnail: string;
}

const JobCard: FC<JobCardProp> = (props) => {
  return (
    <Card shadow="sm" radius="lg" isHoverable className="p-3 rounded-2xl">
      <CardHeader className="text-black">
        <User
          name={<h2 className="text-xl font-semibold">{props.title}</h2>}
          description={props.type}
          avatarProps={{
            src: props.thumbnail,
            size: "lg",
            className: "h-20 w-20",
          }}
        />
      </CardHeader>
      <CardBody className="text-black">
        <p>{props.desc}</p>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-xl font-bold text-black">$ {props.salary}</p>
          <p className="text-sm text-gray-600">Per month</p>
        </div>
        <Button variant="shadow" color="primary" radius="full">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
