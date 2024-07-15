import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query ($filter: OrderBy) {
    customerOrders(filter: $filter) {
      total
      pages
      orders {
        carts {
          productId
          qty
          product {
            brand
            previews
            price
            slug
            title
            rating
            thumbnail
          }
          unitPrice {
            khr
            usd
          }
          discountPrice {
            khr
            usd
          }
          discountPercentage
        }
        code
        createdAt
        id
        status
        tax
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
  }
`;
