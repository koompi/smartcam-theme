import { gql } from "@apollo/client";

export const GET_ALL_BANNERS = gql`
  query BannerSpacialOffer {
    bannerSpacialOffer {
      id
      thumbnail
      status
      products {
        product {
          slug
        }
      }
    }
  }
`;
