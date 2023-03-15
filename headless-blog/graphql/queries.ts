import { gql } from "@apollo/client";

export const Posts = gql`
  query NewQuery {
    posts {
      nodes {
        date
        id
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;
