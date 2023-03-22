import { gql } from "@apollo/client";
import { CORE_REPOSITORY_FIELDS, REVIEW_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY_FIELDS}
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        node {
          ...CoreRepositoryFields
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
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
  ${REVIEW_FIELDS}
  query getAuthorizedUser(
    $includeReviews: Boolean = false
    $first: Int
    $after: String
  ) {
    me {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        totalCount
        edges {
          node {
            ...ReviewFields
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
