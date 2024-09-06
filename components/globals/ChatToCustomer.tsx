"use client";

import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const ChatToCustomer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="hidden sm:hidden lg:block fixed z-50 bottom-20 right-6 ">
        <Popover placement="top-end" offset={20} showArrow>
          <div className="btn-effect">
            <PopoverTrigger>
              <Button
                isIconOnly
                size="lg"
                radius="full"
                color="primary"
                variant="flat"
                className="p-3"
              >
                <Icon icon="mdi:facebook-messenger" fontSize={30} />
              </Button>
            </PopoverTrigger>
          </div>
          <PopoverContent>
            <div className="p-3 w-96">
              <div className="text-lg font-bold">Helps</div>
              <div className="flex flex-col gap-3 mt-3">
                <Link
                  href="https://t.me/smartcam_printer"
                  target="_blank"
                  rel="noreferer"
                  className="col-span-1 min-h-[5rem] flex items-center text-start justify-between rounded-md border-2 border-background transition-all hover:border-primary hover:bg-background p-3"
                >
                  <div>
                    <h1 className="text-md font-medium">Customer Support</h1>
                    <p className="font-light text-xs">(+855) 17 819 419</p>
                  </div>
                  <Icon
                    icon="ic:baseline-telegram"
                    className="text-primary"
                    fontSize={30}
                  />
                </Link>
                <Link
                  href="https://t.me/ProfessionalIT1"
                  target="_blank"
                  rel="noreferer"
                  className="col-span-1 min-h-[5rem] flex items-center text-start justify-between rounded-md border-2 border-background transition-all hover:border-primary hover:bg-background p-3"
                >
                  <div>
                    <h1 className="text-md font-medium">Technical Support</h1>
                    <p className="font-light text-xs">(+855) 17 819 419</p>
                  </div>
                  <Icon
                    icon="ic:baseline-telegram"
                    className="text-primary"
                    fontSize={30}
                  />
                </Link>
                <Link
                  href="https://www.facebook.com/smartcam168"
                  target="_blank"
                  rel="noreferer"
                  className="col-span-1 min-h-[5rem] flex items-center text-start justify-between rounded-md border-2 border-background transition-all hover:border-primary hover:bg-background p-3"
                >
                  <div>
                    <h1 className="text-md font-medium">Customer Support</h1>
                    <p className="font-light text-xs">vai Facebook</p>
                  </div>
                  <Icon
                    icon="ic:baseline-facebook"
                    className="text-primary"
                    fontSize={30}
                  />
                </Link>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="block sm:block lg:hidden fixed z-10 bottom-20 right-6 ">
        <Modal
          isOpen={isOpen}
          placement="bottom"
          onOpenChange={onOpenChange}
          backdrop="blur"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex gap-1 items-center">
                  Helps
                  <Icon icon="material-symbols:help" />
                </ModalHeader>
                <ModalBody>
                  <Link
                    href="https://t.me/smartcam_printer"
                    target="_blank"
                    rel="noreferer"
                    className="col-span-1 min-h-[6rem] flex items-center text-start justify-between rounded-md border-2 border-background transition-all hover:border-primary hover:bg-background p-3"
                  >
                    <div>
                      <h1 className="text-md font-medium">Customer Support</h1>
                      <p className="font-light text-xs">(+855) 17 819 419</p>
                    </div>
                    <Icon
                      icon="ic:baseline-telegram"
                      className="text-primary"
                      fontSize={30}
                    />
                  </Link>
                  <Link
                    href="https://t.me/ProfessionalIT1"
                    target="_blank"
                    rel="noreferer"
                    className="col-span-1 min-h-[6rem] flex items-center text-start justify-between rounded-md border-2 border-background transition-all hover:border-primary hover:bg-background p-3"
                  >
                    <div>
                      <h1 className="text-md font-medium">Technical Support</h1>
                      <p className="font-light text-xs">(+855) 17 819 419</p>
                    </div>
                    <Icon
                      icon="ic:baseline-telegram"
                      className="text-primary"
                      fontSize={30}
                    />
                  </Link>
                  <Link
                    href="https://www.facebook.com/smartcam168"
                    target="_blank"
                    rel="noreferer"
                    className="col-span-1 min-h-[6rem] flex items-center text-start justify-between rounded-md border-2 border-background transition-all hover:border-primary hover:bg-background p-3"
                  >
                    <div>
                      <h1 className="text-md font-medium">Customer Support</h1>
                      <p className="font-light text-xs">vai Facebook</p>
                    </div>
                    <Icon
                      icon="ic:baseline-facebook"
                      className="text-primary"
                      fontSize={30}
                    />
                  </Link>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="shadow"
                    onPress={onClose}
                    fullWidth
                    radius="lg"
                    size="lg"
                  >
                    CLOSE
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className="btn-effect">
          <Button
            onClick={(e) => {
              e.preventDefault();
              onOpen();
            }}
            isIconOnly
            radius="full"
            size="lg"
            color="primary"
            variant="flat"
            className="p-3"
          >
            <Icon icon="mdi:facebook-messenger" fontSize={30} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatToCustomer;
