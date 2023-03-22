import { FlatList, View } from "react-native";
import useReviews from "../hooks/useReviews";
import ReviewItem from "./ReviewItem";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const MyReviews = () => {
  const { reviews, refetch } = useReviews();

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem isMine={true} review={item} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
