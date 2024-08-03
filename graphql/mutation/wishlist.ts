import { gql } from "@apollo/client";

export const ADD_WISHLIST = gql`
  mutation ($products: [InputWishlistCart!]!, $wishlistType: WishlistType!) {
    storeAddWishlist(products: $products, wishlistType: $wishlistType)
  }
`;
