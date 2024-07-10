"use client";

import { Button, Card, CardBody, Chip, Divider, Image } from "@nextui-org/react";
import React, { FC } from "react";
import { Icon } from "@iconify/react";
import Steps from "@uiw/react-steps";
import { OrdersType } from "@/types/checkout";
import dayjs from "dayjs";
import { formatToUSD } from "@/utils/usd";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { CONFIRM_ORDER } from "@/graphql/mutation/order";

const OrderCard: FC<OrdersType> = (props) => {
  const [storeConfirmOrder] = useMutation(CONFIRM_ORDER);

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

  console.log("order", props);
  

  return (
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
          <div className="flex flex-wrap items-center gap-0 sm:gap-0 lg:gap-3">
            <Button
              color="primary"
              variant="light"
              startContent={
                <Icon icon="solar:eye-line-duotone" fontSize={21} />
              }
              as={Link}
              href={`/orders/${props.id}`}
            >
              View order details
            </Button>
            {/* <Button
              color="primary"
              variant="light"
              startContent={
                <Icon
                  icon="solar:archive-down-minimlistic-line-duotone"
                  fontSize={21}
                />
              }
            >
              Save your invoice
            </Button> */}
          </div>
        </div>
        <Divider className="my-3" />
        <div className="flex items-center justify-between">
          {props.carts.length <= 1 ? (
            <div className="flex flex-wrap items-center gap-6">
              <Image
                alt={props.carts[0]?.product?.title}
                src={`${process.env.NEXT_PUBLIC_DRIVE ?? "https://drive.backend.riverbase.org"}/api/drive?hash=${props?.carts[0]?.product?.thumbnail}`}
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
                <p className="text-sm font-light">Qty: {props.carts[0]?.qty}</p>
                <p className="text-sm font-light">
                  {props?.totalUnitPrice.usd.toFixed(2)}
                </p>
                <div>
                  <Chip>
                    {/* {props.} */}
                  </Chip>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {props.carts.map((res, idx: number) => (
                <Image
                  key={idx}
                  alt={props.carts[0]?.product?.title}
                  src={`${process.env.NEXT_PUBLIC_DRIVE ?? "https://drive.backend.riverbase.org"}/api/drive?hash=${res?.product?.thumbnail}`}
                  isBlurred
                  className="border-2 col-span-1 h-16 w-16 sm:h-16 sm:w-16 lg:h-24 lg:w-24 object-cover bg-white object-center"
                />
              ))}
            </div>
          )}
          {props?.status !== "CANCEL" ? (
            <div className="mt-3">
              <Steps
                current={
                  props?.status === "START"
                    ? 0
                    : props?.status === "CONFIRM"
                      ? 1
                      : props?.status === "PROCESS"
                        ? 2
                        : 3
                }
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
        {props.status === "DELIVERY" && (
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
  );
};

export default OrderCard;
