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
    router.push(`/products?search=${value ? value : ""}`);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 items-center w-full"
    >
      <Input
        color="primary"
        size="lg"
        type="search"
        {...(register("search"), { required: true })}
        variant="bordered"
        placeholder="Find your product here ..."
        startContent={<Icon icon="mingcute:search-line" fontSize={24} />}
        onClear={() => {
          setValue(""), router.push(`?search=`);
        }}
        isClearable
        isRequired
        value={value as string}
        onValueChange={(value) => {
          setValue(value);
        }}
        className="w-[33rem]"
        radius="full"
      />
      <Button
        variant="shadow"
        type="submit"
        radius="full"
        color="primary"
        className="text-background"
        isIconOnly
      >
        <Icon icon="lucide:search" fontSize={21} />
      </Button>
    </form>
  );
};
