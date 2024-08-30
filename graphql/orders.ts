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
        checkout {
          amount
          id
          orderId
          membershipCard {
            id
            label
            membershipType
            discountPrice
            discountType
            discountPercentage
            status
          }
          paymentStatus
          orderStatus
          payment
          shippingType
          shippingFee
        }
        code
        createdAt
        id
        discountUnitPrice {
          khr
          usd
        }
        totalUnitPrice {
          khr
          usd
        }
        totalPrice {
          usd
          khr
        }
      }
    }
  }
`;
