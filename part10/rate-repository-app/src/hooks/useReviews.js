import { useMutation, useQuery } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutation";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const useReviews = () => {
  const { data, refetch } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    await mutate({ variables: { id } });
    refetch();
  };

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) || [];

  return { reviews, deleteReview, refetch };
};

export default useReviews;
