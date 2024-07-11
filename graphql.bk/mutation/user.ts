import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation ($input: InputUser!) {
    storeUpdateProfile(input: $input)
  }
`;
