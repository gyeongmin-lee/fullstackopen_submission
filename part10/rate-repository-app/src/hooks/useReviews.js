import { useMutation, useQuery } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutation";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const useReviews = ({ first = 5 } = {}) => {
  const variables = { includeReviews: true, first };
  const { data, refetch, loading, fetchMore, ...result } = useQuery(
    GET_AUTHORIZED_USER,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );

  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    await mutate({ variables: { id } });
    refetch();
  };

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me?.reviews?.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.me?.reviews?.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) || [];

  return {
    reviews,
    deleteReview,
    fetchMore: handleFetchMore,
    refetch,
    ...result,
  };
};

export default useReviews;
