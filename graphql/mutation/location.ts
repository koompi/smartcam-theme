import { gql } from "@apollo/client";

export const CREATE_CUSTOMER_LOCATION = gql`
  mutation (
    $bodyLocation: BodyLocation!
    $bodyAddress: BodyAddress!
  ) {
    createLocation(
      bodyLocation: $bodyLocation
      bodyAddress: $bodyAddress
    )
  }
`;