"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormSearch {
  search: string;
}

export const Search = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormSearch>();
  const [value, setValue] = useState("");

  const onSubmit: SubmitHandler<FormSearch> = () => {
    router.push(`/products?search=${value ? value : ""}&category=`);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 items-center w-full"
    >
      <Input
        color="primary"
        {...(register("search"), { required: true })}
        radius="lg"
        size="lg"
        type="search"
        variant="bordered"
        placeholder="Find your product here ..."
        className="max-w-xl w-full"
        startContent={<Icon icon="fe:search" fontSize={21} />}
        onClear={() => {
          setValue(""), router.push(`?search=&category=`);
        }}
        isClearable
        isRequired
        value={value as string}
        onValueChange={(value) => {
          setValue(value);
        }}
      />
      <Button
        variant="shadow"
        type="submit"
        size="lg"
        color="primary"
        className="text-background"
        isIconOnly
      >
        <Icon icon="lucide:search" />
      </Button>
    </form>
  );
};
