import { gql } from "@apollo/client";

export const CREATE_CUSTOMER_LOCATION = gql`
  mutation ($bodyLocation: BodyLocation!, $bodyAddress: BodyAddress!) {
    createLocation(bodyLocation: $bodyLocation, bodyAddress: $bodyAddress)
  }
`;

export const DELETE_LOCATION = gql`
  mutation DeleteLocation($deleteLocationId: String!) {
    deleteLocation(id: $deleteLocationId)
  }
`;
