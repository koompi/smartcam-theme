import { gql } from "@apollo/client";

export const CONFIRM_ORDER = gql`
  mutation ($orderId: String!) {
    customerConfirmOrder(orderId: $orderId)
  }
`;

export const CANCEL_ORDER = gql`
  mutation ($orderId: String!) {
    customerCancelOrder(orderId: $orderId)
  }
`;
