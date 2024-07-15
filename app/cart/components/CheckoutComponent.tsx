"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link,
  Progress,
  RadioGroup,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

import ShippingForm from "./ShippingForm";
import OrderSummary from "./OrderSummary";
import PaymentMethodRadio from "./PaymentMethodRadio";
import { useCart } from "@/context/useCart";
import { useAuth } from "@/context/useAuth";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { CHECKOUT } from "@/graphql/mutation/checkout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { PromotionType } from "@/types/promotion";
import { ESTIMATION_PRICE } from "@/graphql.bk/order";
import { ProductType } from "@/types/product";
import { ESTIMATE_PRICE } from "@/graphql.bk/delivery";
import RecommendProducts from "./RecommendProducts";
import { GET_ALL_PRODUCTS } from "@/graphql.bk/product";
import { useBaray } from "@/hooks/baray";

interface OrderCart {
  product: ProductType;
  promotion: PromotionType;
  qty: number;
}

const CheckoutComponent = () => {
  const { user } = useAuth();
  const router = useRouter();
  const baray = useBaray();

  const { cartItems, cleanCartItems, membershipId } = useCart();
  const [loading, setLoading] = useState(false);
  const [ship, setShip] = useState<number>(0.0);
  const [paymentOption, setPaymentOption] = useState("ONLINE");

  const [delivery, setDelivery] = useState<"PERSONAL" | "L192" | "CP">(
    "PERSONAL"
  );
  const [location, setLocation] = useState<string>("");
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  }>();

  const [customerCheckout] = useMutation(CHECKOUT);

  // estimate price
  const { data: es_delivery_price } = useQuery(ESTIMATE_PRICE, {
    variables: {
      items: cartItems,
      lat: position?.lat,
      lng: position?.lng,
      deliveryType: delivery,
      mainObjectId: "454",
    },
  });

  const { data: orders, loading: loadingOrder } = useQuery(ESTIMATION_PRICE, {
    variables: {
      input: [...cartItems],
      membershipId: membershipId,
    },
  });

  const { data: products } = useQuery(GET_ALL_PRODUCTS, {
    variables: {
      filter: {
        limit: 10,
        skip: 0,
        sort: -1,
      },
    },
  });

  // checkout orders product
  const onSubmitCheckout = async () => {
    const variables = {
      body: {
        carts: [...cartItems],
        deliveryFee: ship,
      },
      membershipId: membershipId,
      deliveryType: delivery,
      locationId: location,
      payment: paymentOption,
    };

    setLoading(true);

    const res = await customerCheckout({ variables: variables });

    if (paymentOption === "ONLINE") {
      const intentId = res.data.storeCreateCheckout["intentId"];
      baray!.confirmPayment(intentId, () => {
        cleanCartItems();
      });
      setLoading(false);
    } else {
      toast.success(
        "Congratulation! you've been order the product(s) successfully!"
      );
      cleanCartItems();
      setTimeout(() => {
        setLoading(false);
        router.push("/orders");
      }, 500);
    }
  };

  const [[page, direction], setPage] = React.useState([0, 0]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  useEffect(() => {
    if (!es_delivery_price) {
      return;
    }
    setLoading(true);
    setShip(es_delivery_price?.estimatePriceDelivery?.data.price);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [es_delivery_price]);

  const paginate = (newDirection: number) => {
    if (page + newDirection < 0 || page + newDirection > 2) return;

    setPage([page + newDirection, newDirection]);
  };

  const ctaLabel = React.useMemo(() => {
    switch (page) {
      case 0:
        return `Delivery ($${orders?.estimationOrders
          ?.reduce((accumulator: number, currentObject: OrderCart) => {
            return (
              accumulator +
              (currentObject?.promotion?.discount
                ? currentObject?.promotion?.discount?.totalDiscount
                : currentObject?.product.price) *
                currentObject?.qty
            );
          }, 0)
          .toFixed(2)})`;
      case 1:
        return "Continue to payment";
      case 2:
        return "Place order";
      default:
        return `Delivery ()`;
    }
  }, [page, orders]);

  const stepTitle = React.useMemo(() => {
    switch (page) {
      case 0:
        return "Review your order";
      case 1:
        return "Where should we send your order?";
      case 2:
        return "How would you like to pay?";
      default:
        return "Review your order";
    }
  }, [page]);

  const stepsContent = React.useMemo(() => {
    const paymentRadioClasses = {
      wrapper: "group-data-[selected=true]:border-primary",
      base: "data-[selected=true]:border-primary",
      control: "bg-primary",
    };

    switch (page) {
      case 0:
        return (
          <OrderSummary
            hideTitle
            loading={loadingOrder}
            orders={orders?.estimationOrders}
          />
        );
      case 1:
        return (
          <div className="mt-0 sm:mt-0 lg:mt-4 flex flex-col gap-6">
            <ShippingForm
              hideTitle
              delivery={delivery}
              setDelivery={setDelivery}
              location={location}
              setLocation={setLocation}
              setPosition={setPosition}
              ship={ship}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Accordion
                keepContentMounted
                aria-label="Select or add payment method"
                defaultExpandedKeys={["select_existing_payment"]}
                itemClasses={{
                  title: "text-medium text-white-500",
                  indicator: "text-white",
                }}
                selectionMode="multiple"
                showDivider={false}
              >
                <AccordionItem
                  key="select_existing_payment"
                  title="Select existing payment method"
                >
                  <RadioGroup
                    aria-label="Select existing payment method"
                    classNames={{ wrapper: "gap-3" }}
                    defaultValue="ONLINE"
                    onValueChange={setPaymentOption}
                  >
                    <PaymentMethodRadio
                      isRecommended
                      classNames={paymentRadioClasses}
                      description="coming soon"
                      icon={
                        <Icon
                          icon="solar:filters-bold-duotone"
                          className="text-danger"
                          fontSize={32}
                        />
                      }
                      label="Online Payment"
                      value="ONLINE"
                    />
                    <PaymentMethodRadio
                      classNames={paymentRadioClasses}
                      description="Paid by cash"
                      icon={
                        <Icon
                          icon="solar:wallet-money-bold"
                          className="text-danger"
                          fontSize={32}
                        />
                      }
                      label="Cash on Delivery"
                      value="CASH"
                    />
                  </RadioGroup>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [page, orders, delivery, location, ship]);

  // if (!orders || orders.estimationOrders.length <= 0) {
  //   return (
  // <section className="grid min-h-dvh place-items-center px-6 py-24 sm:py-32 lg:px-8">
  //   <div className="text-center">
  //     <div className="flex justify-center items-center">
  //       <Image
  //         isBlurred
  //         radius="none"
  //         alt="Empty"
  //         src="/images/empty-cart.svg"
  //         className="h-32 sm:h-32 lg:h-60"
  //       />
  //     </div>
  //     <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
  //       Whoops! Your cart is currently empty.
  //     </h1>
  //     <p className="mt-6 text-base leading-7 text-gray-600">
  //       Browse our amazing selection of products and fill your cart with
  //       goodies!
  //     </p>
  //     <div className="mt-10 flex items-center justify-center gap-x-6">
  //       <Button
  //         variant="shadow"
  //         color="primary"
  //         as={Link}
  //         href="/"
  //         className="text-background"
  //       >
  //         Go back home
  //       </Button>

  //       <Button
  //         variant="light"
  //         color="primary"
  //         as={Link}
  //         href="/products"
  //         endContent={<span aria-hidden="true">&rarr;</span>}
  //       >
  //         Products
  //       </Button>
  //     </div>
  //   </div>
  // </section>
  //   );
  // }

  return (
    <section className="container mx-auto px-3 sm:px-3 lg:px-6 py-4 sm:py-4 lg:py-9 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 w-full gap-8">
      {/* Left */}
      <div className="col-span-3 w-full flex-none">
        <div className="flex h-full flex-1 flex-col p-0">
          <div>
            <Button
              className="text-default-700 flex"
              isDisabled={page === 0}
              radius="full"
              variant="flat"
              onPress={() => {
                paginate(-1);
              }}
            >
              <Icon icon="solar:arrow-left-outline" width={20} />
              Go back
            </Button>
          </div>

          <div className="py-6 flex w-full justify-between gap-8">
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-small font-medium">Review</p>
              <Progress
                classNames={{
                  indicator: "!bg-primary",
                }}
                value={page >= 0 ? 100 : 0}
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-small font-medium">Delivery</p>
              <Progress
                classNames={{
                  indicator: "!bg-primary",
                }}
                value={page >= 1 ? 100 : 0}
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-small font-medium">Payment</p>
              <Progress
                classNames={{
                  indicator: "!bg-primary",
                }}
                value={page >= 2 ? 100 : 0}
              />
            </div>
          </div>

          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.form
              key={page}
              animate="center"
              className="mt-3 sm:mt-3 lg:mt-8 flex flex-col gap-3"
              custom={direction}
              exit="exit"
              initial="enter"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              variants={variants}
              onSubmit={(e) => e.preventDefault()}
            >
              <h1 className="text-2xl font-medium">{stepTitle}</h1>
              {stepsContent}
              {user ? (
                <Button
                  fullWidth
                  color="primary"
                  className="mt-8 text-background"
                  size="lg"
                  radius="full"
                  onPress={() => {
                    if (page === 2) {
                      onSubmitCheckout();
                    }
                    router.push("?query=delivery");
                    paginate(1);
                  }}
                  isDisabled={
                    orders?.estimationOrders?.length <= 0 ||
                    (page === 1 && !(delivery && location))
                  }
                  isLoading={loading}
                >
                  {ctaLabel}
                </Button>
              ) : (
                <Button
                  as={Link}
                  href="https://backend.riverbase.org/sso/store"
                  fullWidth
                  color="primary"
                  className="mt-8 text-background"
                  size="lg"
                  radius="full"
                >
                  Login
                </Button>
              )}
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
      <div className="col-span-2">
        {page <= 0 ? (
          <RecommendProducts products={products?.storeProducts?.products} />
        ) : (
          <div className="sticky top-28 hidden sm:hidden lg:block">
            <Card shadow="sm" isBlurred>
              <CardHeader>Summary</CardHeader>
              <CardBody>
                <dl className="flex flex-col gap-4 py-4">
                  <div className="flex justify-between">
                    <dt className="text-small text-default-500">Subtotal</dt>
                    <dd className="text-small font-semibold text-default-700">
                      $
                      {orders?.estimationOrders
                        ?.reduce(
                          (accumulator: number, currentObject: OrderCart) => {
                            return (
                              accumulator +
                              (currentObject?.promotion?.discount
                                ? currentObject?.promotion?.discount
                                    ?.originalPrice
                                : currentObject?.product?.price) *
                                currentObject?.qty
                            );
                          },
                          0
                        )
                        .toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-small text-default-500">Discount</dt>
                    <dd className="text-small font-semibold text-default-700">
                      {/* ${(price - priceDiscount).toFixed(2)} */}$
                      {orders?.estimationOrders
                        ?.reduce(
                          (accumulator: number, currentObject: OrderCart) => {
                            return (
                              accumulator +
                              ((currentObject?.promotion?.discount
                                ? currentObject?.promotion?.discount
                                    ?.originalPrice
                                : currentObject.product.price) *
                                currentObject?.qty -
                                (currentObject?.promotion?.discount
                                  ? currentObject?.promotion?.discount
                                      ?.totalDiscount
                                  : currentObject.product.price) *
                                  currentObject?.qty)
                            );
                          },
                          0
                        )
                        .toFixed(2)}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="text-small text-default-500 flex items-center gap-3">
                      Delivery
                      <Icon
                        icon="streamline:transfer-motorcycle-solid"
                        fontSize={16}
                      />
                    </dt>

                    {delivery === "PERSONAL" ? (
                      <dd className="text-small font-semibold text-default-700">
                        Free
                      </dd>
                    ) : (
                      <dd className="text-small font-semibold text-default-700">
                        {loading ? "...." : ship?.toFixed(2)}
                      </dd>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-small text-default-500">Tax</dt>
                    <dd className="text-small font-semibold text-default-700">
                      $0.00
                    </dd>
                  </div>

                  <Divider />
                  <div className="flex justify-between">
                    <dt className="text-small font-semibold text-default-500">
                      Total
                    </dt>
                    {delivery === "PERSONAL" ? (
                      <dd className="font-semibold text-primary text-xl">
                        $
                        {orders?.estimationOrders
                          ?.reduce(
                            (accumulator: number, currentObject: OrderCart) => {
                              return (
                                accumulator +
                                (currentObject?.promotion?.discount
                                  ? currentObject?.promotion?.discount
                                      ?.totalDiscount
                                  : currentObject.product.price) *
                                  currentObject?.qty
                              );
                            },
                            0
                          )
                          .toFixed(2)}
                      </dd>
                    ) : (
                      <dd className="font-semibold text-primary text-xl">
                        $
                        {(
                          orders?.estimationOrders?.reduce(
                            (accumulator: number, currentObject: OrderCart) => {
                              return (
                                accumulator +
                                (currentObject?.promotion?.discount
                                  ? currentObject?.promotion?.discount
                                      ?.totalDiscount
                                  : currentObject.product.price) *
                                  currentObject?.qty
                              );
                            },
                            0
                          ) + ship
                        ).toFixed(2)}
                      </dd>
                    )}
                  </div>
                </dl>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckoutComponent;
