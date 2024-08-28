"use client";

import {
  Button,
  Spinner,
  Image,
  Link,
  Divider,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { ORDER_BY_ID } from "@/graphql/order";
import { useParams } from "next/navigation";
import Steps from "@uiw/react-steps";
import dayjs from "dayjs";
import { formatToUSD } from "@/utils/formatUSD";
import { CheckoutCartType } from "@/types/checkout";
import { CONFIRM_ORDER, CANCEL_ORDER } from "@/graphql/mutation/order";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";

const OrderSinglePage = () => {
  const router = useRouter();
  const params = useParams();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [storeConfirmOrder] = useMutation(CONFIRM_ORDER);
  const [storeCancelOrder] = useMutation(CANCEL_ORDER);

  const { data, loading, refetch } = useQuery(ORDER_BY_ID, {
    variables: {
      filter: {
        limit: 100,
        skip: 0,
        sort: -1,
      },
      storeOrderId: params.id,
    },
  });

  const onCancelOrder = (id: string) => {
    const variables = {
      orderId: id,
    };

    storeCancelOrder({ variables: variables })
      .then((_) => {
        toast.success("Your order has been canceled!");
        refetch();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onConfirm = (id: string) => {
    const variables = {
      orderId: id,
    };

    storeConfirmOrder({ variables: variables })
      .then((_) => {
        toast.success("Thanks for your order! It's on its way.");
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading || !data)
    return (
      <section className="container max-w-full grid place-items-center h-screen">
        <Spinner label="Loading..." />
      </section>
    );

  return (
    <section className="bg-white">
      <div className="container max-w-full sm:max-w-full lg:max-w-5xl py-9 px-3 sm:px-3 lg:px-6 mx-auto">
        {/* ------ modal cancel order ------- */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Are you sure to cancel this order?
                </ModalHeader>
                <ModalBody>
                  <p>
                    Canceling your order will prevent it from being successful.
                    Please double-check your order before submitting.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    variant="shadow"
                    className="text-background"
                    onPress={() => {
                      onCancelOrder(data?.storeOrder?.id);
                    }}
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Button
          size="lg"
          variant="flat"
          radius="full"
          startContent={<Icon icon="solar:arrow-left-linear" fontSize={24} />}
          onPress={() => router.back()}
        >
          Order
        </Button>
        <div className="my-3 flex items-center justify-between mb-9">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">
              Orders Details #{data?.storeOrder.code}
            </h1>
            <p className="text-base font-light">
              View your order history and check the delivery status for items.
            </p>
          </div>
          {data?.storeOrder?.checkout?.payment === "CASH" &&
            data?.storeOrder?.checkout?.order_status === "PENDING" && (
              <Button
                size="lg"
                variant="flat"
                color="danger"
                radius="full"
                className="mt-3 hidden sm:hidden lg:inline"
                onPress={() => {
                  onOpen();
                }}
              >
                Cancel Order
              </Button>
            )}
        </div>
        {/*  -------- steps ---------- */}
        {data?.storeOrder?.checkout?.order_status !== "CANCEL" ? (
          <>
            <div className="hidden sm:hidden lg:inline ">
              <Steps
                current={(() => {
                  switch (data?.storeOrder?.checkout?.order_status) {
                    case "PENDING":
                      return 0; // Ordered
                    case "CONFIRMED":
                    case "PROCESSING":
                      return 1; // Confirmed
                    case "SHIPPED":
                      return 2; // Out for delivery
                    case "DELIVERED":
                      return 3; // Delivered
                    default:
                      return 0; // Default to Delivered
                  }
                })()}
                direction="horizontal"
              >
                <Steps.Step
                  title="Ordered"
                  description={`Place on ${dayjs(
                    data?.storeOrder.createdAt.split(" ")[0]
                  ).format("DD-MMM-YYYY")}`}
                  icon={<Icon icon="solar:box-bold-duotone" fontSize={36} />}
                />
                <Steps.Step
                  title="Confirmed"
                  description="The store confirmed your order"
                  icon={
                    <Icon
                      icon="solar:verified-check-bold-duotone"
                      fontSize={36}
                    />
                  }
                />
                <Steps.Step
                  title="Out for delivery"
                  description="Shipping"
                  icon={
                    <Icon icon="ic:twotone-delivery-dining" fontSize={36} />
                  }
                />
                <Steps.Step
                  title="Delivered"
                  description="Items are delivered"
                  icon={<Icon icon="solar:bag-3-bold-duotone" fontSize={36} />}
                />
              </Steps>
            </div>
            <div className="inline sm:inline lg:hidden">
              <Steps
                current={
                  data?.storeOrder?.checkout?.order_status === "PENDING"
                    ? 0
                    : data?.storeOrder?.checkout?.order_status === "CONFIRMED"
                      ? 1
                      : data?.storeOrder?.checkout?.order_status === "SHIPPED"
                        ? 2
                        : 3
                }
                direction="horizontal"
                progressDot
              >
                <Steps.Step
                  title="Ordered"
                  description={`Place on ${dayjs(
                    data?.storeOrder.createdAt.split(" ")[0]
                  ).format("DD-MMM-YYYY")}`}
                />
                <Steps.Step
                  title="Confirmed"
                  description="The store confirmed your order"
                />
                <Steps.Step title="Out for delivery" description="Shipping" />
                <Steps.Step
                  title="Delivered"
                  description="Items are delivered"
                />
              </Steps>
            </div>
          </>
        ) : (
          <div className="flex gap-3 items-center">
            <Icon
              icon="solar:bag-cross-bold-duotone"
              fontSize={45}
              className="text-danger"
            />
            <div className="flex flex-col gap-1 text-danger">
              <h1 className="text-xl font-semibold">Orders Failed</h1>
              <p className="text-base font-light">
                Your order has been canceled! Make a new order!
              </p>
            </div>
          </div>
        )}

        <div className="rounded-xl bg-gradient-to-r from-primary/10 px-6 py-3 mt-9">
          <h1 className="text-md font-medium">Order Items</h1>
          <div className="my-3 flex flex-col gap-3">
            {data?.storeOrder?.carts?.map(
              (res: CheckoutCartType, idx: number) => {
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-center gap-x-6">
                      <div className="flex items-center gap-3">
                        <Image
                          alt={res?.product?.title}
                          src={`${
                            process.env.NEXT_PUBLIC_DRIVE ??
                            "https://drive.backend.riverbase.org"
                          }/api/drive?hash=${res?.product?.thumbnail}`}
                          isBlurred
                          className=" border-2 h-16 w-16 object-contain object-center"
                        />
                        <div className="flex flex-col gap-1">
                          <Link
                            href={`/products/${res?.product?.slug}`}
                            underline="hover"
                            className=" text-medium line-clamp-1 text-content1-white"
                          >
                            {res?.product?.title}
                          </Link>
                          <p className="text-sm font-light">
                            Brand: {res?.product?.brand}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-12">
                        <p className="text-sm font-light">{res?.qty} x</p>
                        <p className="text-sm font-light">
                          {formatToUSD(
                            parseFloat(
                              res?.unitPrice?.usd.toString()
                                ? res?.unitPrice?.usd.toString()
                                : "0"
                            )
                          )}
                        </p>
                      </div>
                    </div>
                    <Divider className="my-3" />
                  </div>
                );
              }
            )}
            <div className="flex justify-end">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-6">
                  <p>Price</p>
                  <p>
                    {formatToUSD(
                      parseFloat(
                        data?.storeOrder?.totalPrice?.usd.toString()
                          ? data?.storeOrder?.totalPrice?.usd.toString()
                          : "0"
                      )
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <p>Tax</p>
                  <p>
                    {formatToUSD(
                      parseFloat(
                        data?.storeOrder?.tax ? data?.storeOrder?.tax : "0"
                      )
                    )}
                  </p>
                </div>
                <Divider className="my-3" />
                <div className="flex items-center justify-between gap-6 font-bold text-lg text-primary">
                  <p>Total Price</p>
                  <p>
                    {formatToUSD(
                      parseFloat(
                        data?.storeOrder?.totalPrice?.usd.toString()
                          ? data?.storeOrder?.totalPrice?.usd.toString()
                          : "0"
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>
            {data?.storeOrder?.checkout?.payment === "ONLINE" &&
              data?.storeOrder?.checkout?.payment_status === "UNPAID" && (
                <Button
                  size="lg"
                  variant="flat"
                  color="danger"
                  radius="lg"
                  className="mt-3 hidden sm:hidden lg:inline"
                  // onPress={() => {
                  //   onOpen();
                  // }}
                >
                  Finish Payment Process
                </Button>
              )}
          </div>
        </div>
        {data?.storeOrder?.checkout?.payment === "ONLINE" &&
          data?.storeOrder?.checkout?.payment_status === "UNPAID" && (
            <Button
              size="lg"
              variant="flat"
              color="danger"
              radius="full"
              fullWidth
              className="mt-3 block sm:block lg:hidden"
              // onPress={() => {
              //   onOpen();
              // }}
            >
              Finish Payment Process
            </Button>
          )}
        {data?.storeOrder?.checkout?.order_status === "START" && (
          <Button
            size="lg"
            variant="flat"
            color="danger"
            fullWidth
            className="mt-3 block sm:block lg:hidden"
            onPress={() => {
              onOpen();
            }}
          >
            Cancel Order
          </Button>
        )}
        {data?.storeOrder?.checkout?.order_status === "DELIVERY" && (
          <Button
            size="lg"
            variant="flat"
            color="primary"
            fullWidth
            className="mt-3"
            onPress={() => {
              onConfirm(data?.storeOrder?.id);
            }}
          >
            Confirm
          </Button>
        )}
      </div>
    </section>
  );
};

export default OrderSinglePage;
