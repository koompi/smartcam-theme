import { gql } from "@apollo/client";

export const ORDER_PRODUCT = gql`
  mutation ($input: InputOrder!) {
    storeCreateOrder(input: $input)
  }
`;

export const ORDER_BY_ID = gql`
  query ($storeOrderId: String!) {
    storeOrder(id: $storeOrderId) {
      code
      createdAt
      id
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
        discountPercentage
        totalPrice {
          khr
          usd
        }
        discountTotalPrice {
          khr
          usd
        }
        totalUnitPrice {
          khr
          usd
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
      customer {
        id
        membershipCard {
          id
          status
          membershipType
          label
          discountType
          discountPrice
          discountPercentage
        }
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
        slug
      }
      variant {
        price
        previews
        label
        id
        default
        attributes {
          option
          type
        }
        details
        stock {
          amount
          freezed
          status
        }
      }
    }
  }
`;
