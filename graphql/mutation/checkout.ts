import { gql } from "@apollo/client";

export const CHECKOUT = gql`
  mutation (
    $locationId: String!
    $shippingType: DeliveryType!
    $shippingFee: Float
    $payment: PaymentType!
    $body: BodyOrder!
    $membershipId: String
  ) {
    customerCheckout(
      locationId: $locationId
      shippingType: $shippingType
      shippingFee: $shippingFee
      payment: $payment
      body: $body
      membershipId: $membershipId
    )
  }
`;

export const FINISH_PAYMENT_PROCESS = gql`
  mutation CustomerCheckoutPayment($orderId: String!) {
    customerCheckoutPayment(orderId: $orderId)
  }
`;
