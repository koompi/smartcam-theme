import { gql } from "@apollo/client";

export const ORDER_PRODUCT = gql`
  mutation ($input: InputOrder!) {
    storeCreateOrder(input: $input)
  }
`;

export const ORDER_BY_ID = gql`
  query ExampleQuery($storeOrderId: String!) {
    storeOrder(id: $storeOrderId) {
      code
      createdAt
      id
      status
      tax
      totalDiscount
      totalPrice
      carts {
        discountPrice
        productId
        qty
        unitPrice
        variantId
        product {
          brand
          category {
            title {
              en
            }
          }
          desc
          detail
          id
          previews
          price
          productCodes {
            code
            id
          }
          rating
          slug
          status
          subcategories {
            title {
              en
            }
          }
          tags
          thumbnail
          title
          variants {
            attributes {
              option
              type
            }
            default
            id
            label
            previews
            price
          }
        }
      }
    }
  }
`;

export const ESTIMATION_PRICE = gql`
  query(
    $input: [InputEstimationOrder!]!
    $membershipId: String
  ) {
    estimationOrders(input: $input, membershipId: $membershipId) {
      qty
      promotion {
        discount {
          discountPercentage
          discountPrice
          discountType
          originalPrice
          totalDiscount
        }
        isMembership
      }
      product {
        id
        title
        price
      }
    }
  }
`;
