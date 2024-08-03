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
          title
          thumbnail
          weight
          slug
          price
          desc
          detail
        }
        qty
      }
      createdAt
      updatedAt
    }
  }
`;
