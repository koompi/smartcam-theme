import { gql } from "@apollo/client";

// promotionStatus => [LIMITED_TIME, MEMBERSHIP, UP_COMING]
export const PROMOTION_SPECIAL_OFFER = gql`
  query ($promotionStatus: PromotionStatus!, $membershipId: String, $filter: OrderBy) {
    promotionSpecialOffer(
      type: $promotionStatus
      membershipId: $membershipId
      filter: $filter
    ) {
      products {
        promotion {
          discount {
            discountPrice
            discountPercentage
            discountType
            originalPrice
            promotionStatus
            totalDiscount
          }
          isMembership
        }
        product {
          title
          price
          thumbnail
        }
      }
    }
  }
`;
