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
  Image,
  Link,
  Progress,
  RadioGroup,
  Spinner,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import RecommendProducts from "./RecommendProducts";
import { VisaIcon, MasterCardIcon, PayPalIcon } from "./Providers";

import ShippingForm from "./ShippingForm";
import OrderSummary from "./OrderSummary";
// import PaymentForm from "./PaymentForm";
import PaymentMethodRadio from "./PaymentMethodRadio";
// import { useCart } from "@/context/useCart";
// import { useAuth } from "@/context/useAuth";
// import { ProductType } from "@/types/product";
// import { formatToUSD } from "@/utils/usd";
// import { CustomerAddressType } from "@/types/checkout";
// import { useQuery } from "@apollo/client";
// import { ESTIMATE_PRICE } from "@/graphql/delivery";
// import { useMutation } from "@apollo/client";
// import { CHECKOUT } from "@/graphql/mutation/checkout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatToUSD } from "@/utils/formatUSD";
import router from "next/router";

// ProductType[]
const CheckoutComponent = ({ products }: { products: any }) => {
  // const { user } = useAuth();
  // const router = useRouter();

  // const { cartItems, cleanCartItems, loading } = useCart();
  // const [price, setPrice] = useState(0);
  const [ship, setShip] = useState<string>("");
  // CustomerAddressType
  const [toDelivery, setToDelivery] = useState<any | null>();

  // const [storeCreateCheckouts] = useMutation(CHECKOUT);

  // estimate price
  // const { data: es_price, refetch } = useQuery(ESTIMATE_PRICE, {
  //   variables: {
  //     adr: {
  //       lat: toDelivery?.lat,
  //       lng: toDelivery?.lng,
  //     },
  //   },
  // });

  //  function checkout

  // const onSubmitCheckout = () => {
  //   const totalPrice = (price + es_price?.estimatePrice?.data?.price).toFixed(
  //     2
  //   );

  //   const newCart = cartItems?.map((item) => {
  //     return {
  //       productId: item?.product.productId,
  //       qty: item?.quantity,
  //       unitPrice: parseFloat(item?.product?.price.toString()),
  //       variantId: item?.product?.variant?.id,
  //     };
  //   });

  //   const variables = {
  //     input: {
  //       carts: newCart,
  //       currency: "USD",
  //       totalPrice: parseFloat(totalPrice.toString()),
  //     },
  //     deliveryId: ship == "PERSONAL" ? null : ship,
  //     addressId: toDelivery?.id,
  //     express: ship == "PERSONAL" ? "PERSONAL" : "L192",
  //     payment: "CASH",
  //   };

  //   storeCreateCheckouts({ variables: variables })
  //     .then((_) => {
  //       toast.success(
  //         "Congratulation! you've been order the product(s) successfully!"
  //       );
  //       router.push("/orders");
  //     })
  //     .then(() => {
  //       cleanCartItems();
  //     })
  //     .catch((err) => {
  //       toast.error("Your transaction order is failed!");
  //       console.log(err);
  //     });
  // };

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

  // useEffect(() => {
  //   const subtotal: number[] = [];
  //   cartItems.map((product: any) =>
  //     subtotal.push(product.quantity * product.product.price)
  //   );
  //   const Subtotal: any = subtotal.reduce((accumulator, value) => {
  //     return accumulator + value;
  //   }, 0);
  //   setPrice(Subtotal);
  // }, [cartItems]);

  const paginate = (newDirection: number) => {
    if (page + newDirection < 0 || page + newDirection > 2) return;

    setPage([page + newDirection, newDirection]);
  };

  // const ctaLabel = React.useMemo(() => {
  //   switch (page) {
  //     case 0:
  //       return `Delivery (${formatToUSD(
  //         price +
  //           (es_price?.estimatePrice?.data?.price
  //             ? es_price?.estimatePrice?.data?.price
  //             : 0)
  //       )})`;
  //     case 1:
  //       return "Continue to payment";
  //     case 2:
  //       return "Place order";
  //     default:
  //       return `Delivery (${formatToUSD(
  //         price +
  //           (es_price?.estimatePrice?.data?.price
  //             ? es_price?.estimatePrice?.data?.price
  //             : 0)
  //       )})`;
  //   }
  // }, [es_price?.estimatePrice?.data?.price, page, price]);

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
      wrapper: "group-data-[selected=true]:border-foreground",
      base: "data-[selected=true]:border-foreground",
      control: "bg-primary",
    };

    switch (page) {
      case 0:
        return <OrderSummary hideTitle />;
      case 1:
        return (
          <div className="mt-0 sm:mt-0 lg:mt-4 flex flex-col gap-6">
            <ShippingForm
              hideTitle
              variant="bordered"
              ship={ship}
              setShip={setShip}
              toDelivery={toDelivery as any}
              setToDelivery={setToDelivery}
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
                  title: "text-medium text-foreground-500",
                  indicator: "text-foreground",
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
                    defaultValue="cash"
                  >
                    <PaymentMethodRadio
                      isRecommended
                      classNames={paymentRadioClasses}
                      description="Paid by cash"
                      icon={
                        <Icon
                          icon="solar:wallet-money-bold"
                          className="text-danger"
                          fontSize={32}
                        />
                      }
                      label="Cash"
                      value="cash"
                    />
                    <PaymentMethodRadio
                      classNames={paymentRadioClasses}
                      description="coming soon"
                      icon={
                        <Icon
                          icon="solar:filters-bold-duotone"
                          className="text-danger"
                          fontSize={32}
                        />
                      }
                      label="Baray"
                      value="baray"
                      isDisabled
                    />
                    <PaymentMethodRadio
                      classNames={paymentRadioClasses}
                      description="coming soon"
                      icon={<VisaIcon height={30} width={30} />}
                      label="Visa"
                      value="4229"
                      isDisabled
                    />
                    <PaymentMethodRadio
                      classNames={paymentRadioClasses}
                      description="coming soon"
                      icon={<MasterCardIcon height={30} width={30} />}
                      label="MasterCard"
                      value="8888"
                      isDisabled
                    />
                    <PaymentMethodRadio
                      classNames={paymentRadioClasses}
                      description="coming soon"
                      icon={<PayPalIcon height={30} width={30} />}
                      label="PayPal"
                      value="paypal"
                      isDisabled
                    />
                  </RadioGroup>
                </AccordionItem>
                {/* <AccordionItem
                  key="add_new_payment"
                  title="Add a new payment method"
                >
                  <PaymentForm variant="bordered" />
                </AccordionItem> */}
              </Accordion>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [page, ship, toDelivery]);

  // if (loading) {
  //   return (
  //     <section className="grid min-h-dvh place-items-center px-6 py-24 sm:py-32 lg:px-8">
  //       <Spinner label="Loading..." color="primary" />
  //     </section>
  //   );
  // }

  // if (cartItems.length <= 0) {
  //   return (
  //     <section className="grid min-h-dvh place-items-center px-6 py-24 sm:py-32 lg:px-8">
  //       <div className="text-center">
  //         <div className="flex justify-center items-center">
  //           <Image
  //             isBlurred
  //             radius="none"
  //             alt="Empty"
  //             src="/images/empty-cart.svg"
  //             className="h-32 sm:h-32 lg:h-60"
  //           />
  //         </div>
  //         <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
  //           Whoops! Your cart is currently empty.
  //         </h1>
  //         <p className="mt-6 text-base leading-7 text-gray-600">
  //           Browse our amazing selection of products and fill your cart with
  //           goodies!
  //         </p>
  //         <div className="mt-10 flex items-center justify-center gap-x-6">
  //           <Button
  //             variant="shadow"
  //             color="primary"
  //             as={Link}
  //             href="/"
  //             className="text-background"
  //           >
  //             Go back home
  //           </Button>

  //           <Button
  //             variant="light"
  //             color="primary"
  //             as={Link}
  //             href="/products"
  //             endContent={<span aria-hidden="true">&rarr;</span>}
  //           >
  //             Products
  //           </Button>
  //         </div>
  //       </div>
  //     </section>
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
              // isDisabled={page === 0}
              radius="full"
              variant="flat"
              // onPress={() => {
              //   if (page <= 1) {
              //     refetch();
              //     setToDelivery(null);
              //     setShip("");
              //   }
              //   paginate(-1);
              // }}
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
              {/* {user ? (
                <Button
                  fullWidth
                  color="primary"
                  className="mt-8 text-background"
                  size="lg"
                  onPress={() => {
                    if (page === 2) {
                      onSubmitCheckout();
                    }
                    paginate(1);
                  }}
                  isDisabled={page === 1 && !(ship && toDelivery)}
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
                >
                  Login
                </Button>
              )} */}
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
      <div className="col-span-2">
        {page <= 0 ? null : ( // <RecommendProducts products={products} />
          <div className="sticky top-28 hidden sm:hidden lg:block">
            <Card shadow="sm" isBlurred>
              <CardHeader>Sumary</CardHeader>
              <CardBody>
                <dl className="flex flex-col gap-4 py-4">
                  <div className="flex justify-between">
                    <dt className="text-small text-default-500">Subtotal</dt>
                    <dd className="text-small font-semibold text-default-700">
                      {formatToUSD(999)}
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

                    {/* {ship === "PERSONAL" ? (
                      <dd className="text-small font-semibold text-default-700">
                        Free
                      </dd>
                    ) : (
                      <dd className="text-small font-semibold text-default-700">
                        {es_price?.estimatePrice?.data?.price
                          ? formatToUSD(es_price?.estimatePrice?.data?.price)
                          : formatToUSD(0)}
                      </dd>
                    )} */}
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
                    {/* <dd className="font-semibold text-primary text-xl">
                      {formatToUSD(
                        price +
                          (es_price?.estimatePrice?.data?.price
                            ? es_price?.estimatePrice?.data?.price
                            : 0)
                      )}
                    </dd> */}
                    {/* {ship === "PERSONAL" ? (
                      <dd className="font-semibold text-primary text-xl">
                        {formatToUSD(price)}
                      </dd>
                    ) : (
                      <dd className="font-semibold text-primary text-xl">
                        {formatToUSD(
                          price +
                            (es_price?.estimatePrice?.data?.price
                              ? es_price?.estimatePrice?.data?.price
                              : 0)
                        )}
                      </dd>
                    )} */}
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
