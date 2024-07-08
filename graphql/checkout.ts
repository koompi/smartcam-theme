import { gql } from "@apollo/client";

export const CHECKOUT_PRODUCT = gql`
  mutation (
    $payment: PaymentType!
    $body: BodyOrder!
    $membershipId: String
    $deliveryType: DeliveryType!
    $locationId: String!
  ) {
    storeCreateCheckout(
      payment: $payment
      body: $body
      membershipId: $membershipId
      deliveryType: $deliveryType
      locationId: $locationId
    )
  }
`;
