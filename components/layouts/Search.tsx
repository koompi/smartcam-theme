"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit: SubmitHandler<FormSearch> = () => {
    router.push(`/products?search=${value ? value : ""}`);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 items-center w-full"
    >
      <Button variant="light" radius="lg" color="primary" isIconOnly>
        <Icon icon="mingcute:menu-fill" fontSize={26} />
      </Button>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
