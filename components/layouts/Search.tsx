"use client";

import { BRANDS } from "@/graphql/brands";
import { CATEGORIES } from "@/graphql/category";
import { Category } from "@/types/category";
import { BrandsType } from "@/types/product";
import { useQuery } from "@apollo/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ScrollShadow,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
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

  // query brands
  const { data, loading } = useQuery(BRANDS);

  // query categories
  const { data: categories, loading: loadingCategory } = useQuery(CATEGORIES);

  if (loading || !data || loadingCategory || !categories) {
    return;
  }

  const onSubmit: SubmitHandler<FormSearch> = () => {
    router.push(`/products?search=${value ? value : ""}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 items-center w-full"
    >
      <Button
        variant="light"
        radius="lg"
        color="primary"
        isIconOnly
        onPress={onOpen}
      >
        <Icon icon="mingcute:menu-fill" fontSize={26} />
      </Button>
      <Modal
        size="3xl"
        isOpen={isOpen}
        onClose={onClose}
        radius="lg"
        hideCloseButton
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Input
                size="lg"
                type="search"
                {...(register("search"), { required: true })}
                placeholder="Find your product here ..."
                startContent={
                  <Icon
                    icon="mingcute:search-line"
                    fontSize={24}
                    className="text-gray-400"
                  />
                }
                onClear={() => {
                  setValue(""), router.push(`?search=`);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router.push(`/products?search=${value ? value : ""}`);
                    onClose();
                  }
                }}
                isClearable
                isRequired
                autoFocus
                value={value as string}
                onValueChange={(value) => {
                  setValue(value);
                }}
                radius="none"
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-600/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-sm",
                    "bg-white",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-100/60",
                    "dark:hover:bg-default/60",
                    "group-data-[focus=true]:bg-white",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                  ],
                }}
              />
              <kbd className="px-3 h-6 flex items-center bg-background rounded-md absolute z-50 top-3 right-3 text-sm">
                ESC
              </kbd>

              <ModalBody className="p-0">
                <div className="grid grid-cols-6">
                  <div className="col-span-2 bg-background p-3">
                    <p className="text-xs font-semibold px-3 mb-2">
                      Categories
                    </p>
                    <ScrollShadow
                      hideScrollBar
                      className="w-full h-[36dvh] pb-12"
                    >
                      {categories?.storeOwnerCategories.map((res: Category) => {
                        return (
                          <Button
                            onPress={() => {
                              router.push(
                                `/products?search=&category=${res.id}`
                              );
                              onClose();
                            }}
                            fullWidth
                            key={res.id}
                            radius="lg"
                            variant="light"
                            color="primary"
                            className=" flex text-start justify-start"
                          >
                            {res.title?.en}
                          </Button>
                        );
                      })}
                    </ScrollShadow>
                  </div>
                  <div className="col-span-4">
                    <div className="p-3">
                      <p className="text-xs font-semibold px-3 mb-2">Brands</p>
                    </div>
                    <ScrollShadow hideScrollBar className="w-full h-[36dvh]">
                      <div className="flex flex-row flex-wrap gap-4 px-3 pb-12">
                        {data.storeOwnerBrands.map((res: BrandsType) => {
                          return (
                            <div
                              key={res.id}
                              className="flex flex-col gap-2 items-center cursor-pointer"
                              onClick={() => {
                                router.push(
                                  `/products?search=&brands=${res.title ? res.title?.en : ""}`
                                );
                                onClose();
                              }}
                            >
                              <Image
                                alt={res.title.en}
                                src={
                                  res.logo
                                    ? `${process.env.NEXT_PUBLIC_DRIVE}/api/drive?hash=${res.logo}`
                                    : "/images/default-thumbnail.png"
                                }
                                className="h-36 w-36 object-contain bg-background rounded-xl p-3"
                                radius="none"
                              />
                              <p className="text-sm font-semibold line-clamp-1">
                                {res.title.en}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollShadow>
                  </div>
                </div>
              </ModalBody>
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
