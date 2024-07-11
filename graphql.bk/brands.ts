import { gql } from "@apollo/client";

export const BRANDS = gql`
  query {
    storeOwnerBrands {
      id
      logo
      title {
        en
        kh
      }
    }
  }
`;
