import { gql } from "@apollo/client";

export const WISHLISTS = gql`
  query ($wishlistType: WishlistType!) {
    customerWishlists(wishlistType: $wishlistType) {
      id
      customer {
        id
        code
        storeId
        userId
        membershipCard {
          availability
          status
        }
        createdAt
        updatedAt
      }
      wishlistType
      products {
        promotion {
          isMembership
          discount {
            originalPrice
            discountType
            discountPrice
            discountPercentage
            totalDiscount
            promotionStatus
          }
        }
        product {
          id
          title
          thumbnail
          weight
          slug
          price
          desc
          detail
          brand
          category {
            id
            title {
              en
            }
            children {
              id
              title {
                en
              }
            }
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const WISHLIST_NOTIFICATION = gql`
  query {
    storeNotifications
  }
`;
