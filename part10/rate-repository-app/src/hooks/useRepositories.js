import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: data ? data.repositories : undefined,
  };
};

export default useRepositories;
