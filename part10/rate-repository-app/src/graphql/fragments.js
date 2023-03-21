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
