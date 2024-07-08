import { gql } from "@apollo/client";

export const CATEGORIES = gql`
  query ($filter: OrderBy) {
    storeOwnerCategories(filter: $filter) {
      id
      logo
      title {
        en
      }
      products
      children {
        id
        products
        title {
          en
        }
      }
    }
  }
`;

export const SUB_CATEGORY_BY_ID = gql`
  query ($parentId: String!) {
    storeOwnerSubcategories(parentId: $parentId) {
      id
      products
      title {
        en
      }
    }
  }
`;
