import { gql } from "@apollo/client";
import { CORE_REPOSITORY_FIELDS, REVIEW_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY_FIELDS}
  query {
    repositories {
      edges {
        node {
          ...CoreRepositoryFields
        }
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  ${CORE_REPOSITORY_FIELDS}
  ${REVIEW_FIELDS}
  query getSingleRepository($id: ID!) {
    repository(id: $id) {
      ...CoreRepositoryFields
      reviews {
        edges {
          node {
            ...ReviewFields
          }
        }
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;
