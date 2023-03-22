import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({
  orderBy = "CREATED_AT",
  orderDirection = "DESC",
  searchKeyword = "",
} = {}) => {
  const { data } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: data ? data.repositories : undefined,
  };
};

export default useRepositories;
