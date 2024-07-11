import { gql } from "@apollo/client";

export const TAGS = gql`
  query {
    storeOwnerTags {
      id
      title {
        en
        kh
      }
    }
  }
`;
