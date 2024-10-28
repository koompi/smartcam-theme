"use client";

import {
  Button,
  Card,
  CardBody,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { FC, useState } from "react";
import { Icon } from "@iconify/react";
import Steps from "@uiw/react-steps";
import { OrdersType } from "@/types/checkout";
import dayjs from "dayjs";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { CONFIRM_ORDER } from "@/graphql/mutation/order";
import { BrowserView, MobileView } from "react-device-detect";
import { formatToUSD } from "@/utils/formatUSD";
import { FINISH_PAYMENT_PROCESS } from "@/graphql/mutation/checkout";
import { useBaray } from "@/hooks/baray";
import { useRouter } from "next/navigation";
import { isMobile } from "react-device-detect";

const OrderCard: FC<OrdersType> = (props) => {
  const baray = useBaray();
  const router = useRouter();
  const [payLink, setPayLink] = useState<string>("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [storeConfirmOrder] = useMutation(CONFIRM_ORDER);
  const [customerCheckoutPayment] = useMutation(FINISH_PAYMENT_PROCESS);

  const onConfirm = (id: string) => {
    const variables = {
      orderId: id,
    };

    storeConfirmOrder({ variables: variables })
      .then((_) => {
        toast.success("Thanks for your order! It's on its way.");
        props.refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishPayment = (id: string) => {
    const variables = {
      orderId: id,
    };

    customerCheckoutPayment({
      variables: variables,
    })
      .then((res) => {
        const intentId = res.data.customerCheckoutPayment["intentId"];
        if (intentId) {
          onOpen();
          setPayLink(baray!.getPayLink(intentId));
        }

        setTimeout(() => {
          router.push("/orders");
        }, 500);
      })
      .catch((e) => {
        toast.error(e.message);
        console.log("err", e);
      });
  };

  const isOnlinePaymentFailed =
    props?.checkout?.payment === "ONLINE" &&
    (props?.checkout?.paymentStatus === "UNPAID" ||
      props?.checkout?.paymentStatus === "FAIL");

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Payment
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center justify-center text-center">
                  <Icon
                    icon="solar:question-circle-bold-duotone"
                    fontSize={96}
                    className="text-primary"
                  />
                </div>
                <p className="text-center">
                  Are you sure you want to proceed with the payment? Once
                  confirmed, the payment will be processed, and your order will
                  be completed.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  color="primary"
                  onPress={() => {
                    window.open(payLink, "_blank");
                    props?.refetch();
                    router.push("/orders");
                    onClose();
                  }}
                  radius="lg"
                  variant="shadow"
                  size={isMobile ? "lg" : "md"}
                >
                  PAY NOW
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Card
        className="w-full border-2 border-spacing-1 border-dashed bg-none"
        shadow="none"
      >
        <CardBody>
          <div className="flex justify-between items-center gap-6">
            <div>
              <p className="font-medium text-md uppercase">#{props.code}</p>
              <span className="text-sm font-light">
                Place on{" "}
                {dayjs(props.createdAt.split(" ")[0]).format("DD-MMM-YYYY")}
              </span>
            </div>
            <BrowserView>
              <div className="flex flex-wrap items-center gap-0 sm:gap-0 lg:gap-3">
                {isOnlinePaymentFailed && (
                  <Button
                    color="danger"
                    radius="full"
                    variant="flat"
                    startContent={
                      <Icon icon="fluent:payment-16-regular" fontSize={21} />
                    }
                    onPress={() => {
                      onFinishPayment(props?.id);
                    }}
                  >
                    Finish Payment Process
                  </Button>
                )}
                <Button
                  color="primary"
                  variant="bordered"
                  radius="full"
                  startContent={
                    <Icon icon="solar:eye-line-duotone" fontSize={21} />
                  }
                  as={Link}
                  href={`/orders/${props.id}`}
                >
                  View order details
                </Button>
              </div>
            </BrowserView>
            <MobileView>
              <div className="flex items-center gap-1 sm:gap-1 lg:gap-3">
                {isOnlinePaymentFailed && (
                  <Button
                    color="danger"
                    radius="full"
                    variant="flat"
                    size="sm"
                    startContent={
                      <Icon icon="fluent:payment-16-regular" fontSize={21} />
                    }
                    onPress={() => {
                      onFinishPayment(props?.id);
                    }}
                  >
                    Pay Now
                  </Button>
                )}
                <Button
                  color="primary"
                  variant="bordered"
                  radius="full"
                  size="sm"
                  startContent={
                    <Icon icon="solar:eye-line-duotone" fontSize={21} />
                  }
                  as={Link}
                  href={`/orders/${props.id}`}
                >
                  Details
                </Button>
              </div>
            </MobileView>
          </div>
          <Divider className="my-3" />
          <div className="flex items-center justify-between">
            {props.carts.length <= 1 ? (
              <div className="flex flex-wrap items-center gap-6">
                <Image
                  alt={props.carts[0]?.product?.title}
                  src={`${process.env.NEXT_PUBLIC_S3}/${props?.carts[0]?.product?.thumbnail}`}
                  isBlurred
                  className="border-2 h-16 w-16 sm:h-16 sm:w-16 lg:h-36 lg:w-36 object-contain object-center"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-medium line-clamp-1">
                    {props.carts[0]?.product?.title}
                  </p>
                  <p className="text-sm font-light">
                    Brand: {props.carts[0]?.product?.brand}
                  </p>
                  <p className="text-sm font-light">
                    Qty: {props.carts[0]?.qty}
                  </p>

                  {props.discountUnitPrice?.usd > 0 ||
                  props.carts[0]?.discountPercentage > 0 ? (
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-light line-through text-danger">
                        {formatToUSD(
                          parseFloat(props?.totalUnitPrice.usd.toString())
                        )}
                      </p>
                      <p>
                        {formatToUSD(
                          parseFloat(props?.totalPrice.usd.toString())
                        )}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm font-light">
                      {formatToUSD(
                        parseFloat(props?.totalUnitPrice.usd.toString())
                      )}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {props.carts.map((res, idx: number) => (
                  <Image
                    key={idx}
                    alt={props.carts[0]?.product?.title}
                    src={`${process.env.NEXT_PUBLIC_S3}/${res?.product?.thumbnail}`}
                    isBlurred
                    className="border-2 col-span-1 h-16 w-16 sm:h-16 sm:w-16 lg:h-24 lg:w-24 object-cover bg-white object-center"
                  />
                ))}
              </div>
            )}

            {props?.checkout?.orderStatus !== "CANCELLED" ? (
              <div className="mt-3">
                <Steps
                  current={(() => {
                    switch (props?.checkout?.orderStatus) {
                      case "PENDING":
                        return 0; // Ordered
                      case "CONFIRMED":
                      case "PROCESSING":
                        return 1; // Confirmed
                      case "SHIPPED":
                        return 2; // Out for delivery
                      case "DELIVERED":
                      case "CLOSED":
                        return 3; // Delivered
                      default:
                        return 0; // Default to Delivered
                    }
                  })()}
                  direction="vertical"
                  progressDot
                >
                  <Steps.Step title="Ordered" />
                  <Steps.Step title="Confirmed" />
                  <Steps.Step title="Out for delivery" />
                  <Steps.Step title="Delivered" />
                </Steps>
              </div>
            ) : (
              <div className="flex flex-col justify-center text-center gap-3 items-center max-w-36">
                <Icon
                  icon="solar:bag-cross-bold-duotone"
                  fontSize={45}
                  className="text-danger"
                />
                <div className="flex flex-col gap-1 text-danger">
                  <h1 className="text-md font-semibold">Orders Failed</h1>
                  <p className="text-base font-light">
                    Your order has been canceled! Make a new order!
                  </p>
                </div>
              </div>
            )}
          </div>
          {props?.checkout?.orderStatus === "DELIVERED" && (
            <Button
              size="lg"
              variant="flat"
              color="primary"
              onPress={() => {
                onConfirm(props?.id);
              }}
            >
              Confirm
            </Button>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default OrderCard;
