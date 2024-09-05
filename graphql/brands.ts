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

export const BRANDS_BY_CATEGORY = gql`
  query ($category: String!, $subcategories: [String!]) {
    storeFilteredBrands(category: $category, subcategories: $subcategories)
  }
`;
