import { FlatList, View } from "react-native";
import useReviews from "../hooks/useReviews";
import ReviewItem from "./ReviewItem";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const MyReviews = () => {
  const { reviews, refetch, fetchMore } = useReviews({ first: 5 });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem isMine={true} review={item} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      // onEndReachedThreshold={0.5}
    />
  );
};

export default MyReviews;
