import { gql } from "@apollo/client";

export const DELIVERIES = gql`
  query {
    storeDeliveries {
      id
      fee
      phoneNumber
      customerName
      addressName
      address
      logo
      express
    }
  }
`;

export const CUSTOMER_ADDRESS = gql`
  query {
    storeAddress {
      id
      lat
      lng
      firstName
      lastName
      addressName
      phoneNumber
      photos
      storeId
      label
    }
  }
`;

export const ESTIMATE_PRICE = gql`
  query (
    $items: [Items!]!
    $lat: Float
    $lng: Float
    $deliveryType: DeliveryType!
    $membershipId: String
  ) {
    estimatePriceDelivery(
      items: $items
      lat: $lat
      lng: $lng
      deliveryType: $deliveryType
      membershipId: $membershipId
    ) {
      data {
        currency
        estimateTime
        price
        vehicleType
      }
    }
  }
`;

export const SHIPPING_LIST = gql`
  query StoreShippings {
    storeShippings {
      id
      isActive
      freeDelivery
      deliveryFee
      isCustomFee
      deliveryType
    }
  }
`;
