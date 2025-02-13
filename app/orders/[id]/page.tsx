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
import React, { useState } from "react";
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
import { FINISH_PAYMENT_PROCESS } from "@/graphql/mutation/checkout";
import { useBaray } from "@/hooks/baray";
import { isMobile } from "react-device-detect";

const OrderSinglePage = () => {
  const router = useRouter();
  const params = useParams();
  const baray = useBaray();
  const [payLink, setPayLink] = useState<string>("");

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const finishedPayment = useDisclosure();

  const [storeConfirmOrder] = useMutation(CONFIRM_ORDER);
  const [storeCancelOrder] = useMutation(CANCEL_ORDER);
  const [customerCheckoutPayment] = useMutation(FINISH_PAYMENT_PROCESS);

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
          finishedPayment.onOpen();
          setPayLink(baray!.getPayLink(intentId));
        }
      })
      .catch((e) => {
        toast.error(e.message);
        console.log("err", e);
      });
  };

  // const isCashPaymentPending =
  //   data?.storeOrder?.checkout?.payment === "CASH" &&
  //   data?.storeOrder?.checkout?.orderStatus === "PENDING";

  // const isOnlinePaymentPaid =
  //   data?.storeOrder?.checkout?.payment === "ONLINE" &&
  //   (data?.storeOrder?.checkout?.paymentStatus !== "PAID" ||
  //     data?.storeOrder?.checkout?.paymentStatus !== "REFUNDED");

  const isCashPaymentPending =
    data?.storeOrder?.checkout?.payment === "CASH" &&
    data?.storeOrder?.checkout?.orderStatus === "PENDING";

  const isOnlinePaymentPending =
    data?.storeOrder?.checkout?.payment === "ONLINE" &&
    (data?.storeOrder?.checkout?.paymentStatus === "UNPAID" ||
      data?.storeOrder?.checkout?.paymentStatus === "FAIL") &&
    data?.storeOrder?.checkout?.orderStatus === "PENDING";

  const isOnlinePaymentFailed =
    data?.storeOrder?.checkout?.payment === "ONLINE" &&
    (data?.storeOrder?.checkout?.paymentStatus === "UNPAID" ||
      data?.storeOrder?.checkout?.paymentStatus === "FAIL");

  const hasMembershipId = data?.storeOrder?.checkout?.membershipCard?.id;
  const isMembershipActive =
    data?.storeOrder?.checkout?.membershipCard?.status === "ACTIVE";
  const discountType = data?.storeOrder?.checkout?.membershipCard?.discountType;
  const discountPrice = parseFloat(
    data?.storeOrder?.checkout?.membershipCard?.discountPrice
  );
  const discountPercentage =
    data?.storeOrder?.checkout?.membershipCard?.discountPercentage;

  const discount =
    hasMembershipId && isMembershipActive
      ? data?.storeOrder?.checkout?.membershipCard?.label
      : "N/A";

  if (loading || !data)
    return (
      <section className="container max-w-full grid place-items-center h-screen">
        <Spinner label="Loading..." />
      </section>
    );

  console.log("data", data);

  return (
    <section className="bg-white">
      <div className="container max-w-full sm:max-w-full lg:max-w-5xl py-9 px-3 sm:px-3 lg:px-6 mx-auto">
        {/*  ----modal finish payment ---------- */}
        <Modal
          isOpen={finishedPayment.isOpen}
          onOpenChange={finishedPayment.onOpenChange}
        >
          <ModalContent>
            {(_) => (
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
                    confirmed, the payment will be processed, and your order
                    will be completed.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    fullWidth
                    color="primary"
                    onPress={() => {
                      window.open(payLink, "_blank");
                      refetch();
                      finishedPayment.onClose();
                      router.push(`/orders/${data?.storeOrder?.id}`);
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
                    <p>
                      All orders placed through the website are accepted by
                      Smartcam Electronic Solution. We accept Cash on Delivery
                      or Bank Transfer. after received the confirmation our
                      service team will contact to you for detail required and
                      process your order and delivery. it take 1-2 days or
                      faster if our delivery team available to delivery your
                      order.
                    </p>
                    <Link href="/terms">Read more: Terms & Conditions</Link>
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

          {(isCashPaymentPending ||
            isOnlinePaymentPending ||
            isOnlinePaymentFailed) && (
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
          {/* {data?.storeOrder?.checkout?.orderStatus === "DELIVERED" && (
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
          )} */}
        </div>
        {/*  -------- steps ---------- */}
        {data?.storeOrder?.checkout?.orderStatus !== "CANCELLED" ? (
          <>
            <div className="hidden sm:hidden lg:inline ">
              <Steps
                current={(() => {
                  switch (data?.storeOrder?.checkout?.orderStatus) {
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
                  data?.storeOrder?.checkout?.orderStatus === "PENDING"
                    ? 0
                    : data?.storeOrder?.checkout?.orderStatus === "CONFIRMED"
                      ? 1
                      : data?.storeOrder?.checkout?.orderStatus === "SHIPPED"
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
                    <div className="grid grid-cols-12 items-center">
                      <div className="col-span-9 sm:col-span-9 lg:col-span-10 items-center gap-1">
                        <div className="grid grid-cols-12 gap-1 items-center">
                          <div className="col-span-3 sm:col-span-3 lg:col-span-1">
                            <Image
                              alt={res?.product?.title}
                              src={`${process.env.NEXT_PUBLIC_S3}/${res?.product?.thumbnail}`}
                              isBlurred
                              className=" border-2 h-16 w-16 object-contain object-center"
                            />
                          </div>
                          <div className="col-span-9 sm:col-span-9 lg:col-span-11 flex flex-col gap-1">
                            <Link
                              href={`/products/${res?.product?.slug}`}
                              underline="hover"
                            >
                              <span className="text-sm sm:text-sm lg:text-md">
                                {res?.product?.title}
                              </span>
                            </Link>
                            <p className="text-sm font-light">
                              Brand: {res?.product?.brand}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 sm:col-span-3 lg:col-span-2 flex items-center justify-end gap-3">
                        <p className="text-sm font-light">{res?.qty} x</p>
                        <p className="text-sm font-light">
                          {res?.discountPrice?.usd > 0 ? (
                            <div className="flex flex-col items-center gap-1">
                              <span className="line-through text-danger">
                                {formatToUSD(
                                  parseFloat(res?.unitPrice?.usd.toString())
                                )}
                              </span>
                              <span>
                                {formatToUSD(
                                  parseFloat(res?.totalPrice?.usd.toString())
                                )}
                              </span>
                            </div>
                          ) : (
                            <span>
                              {formatToUSD(
                                parseFloat(res?.unitPrice?.usd.toString())
                              )}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <Divider className="my-3" />
                  </div>
                );
              }
            )}
            <div className="flex flex-col sm:flex-col lg:flex-row justify-between items-start text-sm w-full gap-12">
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between gap-6">
                  <p>Payment Method:</p>
                  <p>{data?.storeOrder?.checkout?.payment}</p>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <p>Payment Status:</p>
                  <p>{data?.storeOrder?.checkout?.paymentStatus}</p>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <p>Delivery By:</p>
                  <p>
                    {data?.storeOrder?.checkout?.shippingType === "PERSONAL"
                      ? "Shop"
                      : data?.storeOrder?.checkout?.shippingType}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <p>Membership Type:</p>
                  <p>{discount}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between gap-6">
                  <p>Price</p>
                  <p>
                    {formatToUSD(
                      parseFloat(
                        data?.storeOrder?.totalUnitPrice?.usd.toString()
                          ? data?.storeOrder?.totalUnitPrice?.usd.toString()
                          : "0"
                      )
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <p>Total Discount</p>
                  <p className="text-danger">
                    {data?.storeOrder?.discountUnitPrice?.usd > 0
                      ? formatToUSD(
                          parseFloat(
                            data?.storeOrder?.discountUnitPrice?.usd.toString()
                          )
                        )
                      : "N/A"}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6">
                  <p>Tax</p>
                  <p>
                    {formatToUSD(
                      parseFloat(
                        data?.storeOrder?.checkout?.tax_fee
                          ? data?.storeOrder?.checkout?.tax_fee
                          : "0"
                      )
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <p>Shipping fee</p>
                  <p>
                    {formatToUSD(
                      parseFloat(
                        data?.storeOrder?.checkout?.shipping_fee
                          ? data?.storeOrder?.checkout?.shipping_fee
                          : "0"
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
            {isOnlinePaymentFailed && (
              <Button
                size="lg"
                variant="flat"
                color="primary"
                radius="lg"
                className="mt-3 hidden sm:hidden lg:inline"
                onPress={() => {
                  onFinishPayment(data?.storeOrder?.id);
                }}
              >
                Finish Payment Process
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {(isCashPaymentPending || isOnlinePaymentPending) && (
            <Button
              size="lg"
              variant="bordered"
              color="danger"
              radius="full"
              fullWidth
              className="mt-3 block sm:block lg:hidden"
              onPress={() => {
                onOpen();
              }}
            >
              Cancel Order
            </Button>
          )}
          {isOnlinePaymentFailed && (
            <Button
              size="lg"
              variant="solid"
              color="primary"
              radius="full"
              fullWidth
              className="mt-3 block sm:block lg:hidden"
              onPress={() => {
                onFinishPayment(data?.storeOrder?.id);
              }}
            >
              Pay Now
            </Button>
          )}
        </div>
        {data?.storeOrder?.checkout?.orderStatus === "DELIVERED" && (
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
