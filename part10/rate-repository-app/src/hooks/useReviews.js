import { useQuery } from "@apollo/client";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const useReviews = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) || [];

  return { reviews };
};

export default useReviews;
