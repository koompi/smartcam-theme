import { gql } from "@apollo/client";

export const GET_ALL_LOCATIONS = gql`
  query {
    storeLocations {
      id
      lat
      lng
      firstName
      lastName
      email
      phoneNumber
      salutation
      code
      districtId
      countryId
      communeId
      provinceId
      createdAt
      updatedAt
      address {
        id
        houseNo
        floorNo
        addressTypeId
        poBoxNo
        streetNo
        streetValue
        zipCode
        streetId
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;
