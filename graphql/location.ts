import { gql } from "@apollo/client";

export const GET_ALL_LOCATIONS = gql`
  query {
    storeLocations {
      lat
      lng
      photos
      storeId
      label
      email
      firstName
      lastName
      phoneNumber
      id
      address {
        streetNo
        streetValue
      }
    }
  }
`;
