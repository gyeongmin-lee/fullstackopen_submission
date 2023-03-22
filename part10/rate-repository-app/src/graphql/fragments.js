import { gql } from "@apollo/client";

export const CORE_REPOSITORY_FIELDS = gql`
  fragment CoreRepositoryFields on Repository {
    fullName
    createdAt
    description
    forksCount
    language
    id
    name
    watchersCount
    userHasReviewed
    url
    stargazersCount
    ratingAverage
    reviewCount
    ownerName
    ownerAvatarUrl
    openIssuesCount
  }
`;

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    text
    rating
    createdAt
    repository {
      id
      name
      ownerName
      url
    }
    user {
      id
      username
    }
  }
`;
