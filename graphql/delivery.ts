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
  query ($adr: AdrInput!) {
    estimatePrice(adr: $adr)
  }
`;
