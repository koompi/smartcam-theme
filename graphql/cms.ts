import { gql } from "@apollo/client";

export const BLOGS = gql`
  query StoreBlogs($keyword: String, $filter: OrderBy) {
    storeBlogs(keyword: $keyword, filter: $filter) {
      blogs {
        id
        owner {
          id
          fullname
          firstName
          email
          avatar
          lastName
          username
        }
        thumbnail
        title
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export const BLOG = gql`
  query StoreBlogById($storeBlogByIdId: String!) {
    storeBlogById(id: $storeBlogByIdId) {
      id
      owner {
        id
        fullname
        firstName
        email
        avatar
        lastName
        username
      }
      thumbnail
      title
      description
      createdAt
      updatedAt
    }
  }
`;
