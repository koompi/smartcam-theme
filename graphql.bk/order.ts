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
      carts {
        productId
        qty
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
        discountPrice {
          khr
          usd
        }
        unitPrice {
          usd
          khr
        }
      }
      totalPrice {
        khr
        usd
      }
      discountUnitPrice {
        khr
        usd
      }
      totalUnitPrice {
        khr
        usd
      }
    }
  }
`;

export const ESTIMATION_PRICE = gql`
  query ($input: [InputEstimationOrder!]!, $membershipId: String) {
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
        thumbnail
      }
    }
  }
`;
