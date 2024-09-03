import { gql } from "@apollo/client";

export const GET_ALL_LOCATIONS = gql`
  query {
    storeLocations {
      lat
      lng
      storeId
      email
      firstName
      lastName
      phoneNumber
      id
      address {
        addressName
        label
        zipCode
        photos
      }
    }
  }
`;
