import { gql } from "@apollo/client";

export const ADD_WISHLIST = gql`
  mutation ($productId: String!, $wishlistType: WishlistType!) {
    storeAddWishlist(productId: $productId, wishlistType: $wishlistType)
  }
`;

export const ADD_COMPARE_WISHLIST = gql`
  mutation ($productId: String!, $categoryId: String!) {
    storeAddCompare(productId: $productId, categoryId: $categoryId)
  }
`;

export const REMOVE_PRODUCT_FROM_WISHLIST = gql`
  mutation ($productId: String!) {
    removeProductFromWishlist(productId: $productId)
  }
`;
