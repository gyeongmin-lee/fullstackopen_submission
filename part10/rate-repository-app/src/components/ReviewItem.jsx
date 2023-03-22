import format from "date-fns/format";
import { StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  reviewWrapper: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
  },
  reviewScore: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewScoreText: {
    color: theme.colors.primary,
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 1,
  },
  content: {
    display: "flex",
    flex: 1,
  },
  textSpacing: {
    marginBottom: 5,
  },
});

const ReviewItem = ({ review, isMine }) => {
  return (
    <View style={styles.reviewWrapper}>
      <View style={styles.reviewScore}>
        <Text style={styles.reviewScoreText}>{review.rating}</Text>
      </View>
      <View style={styles.content}>
        <Text
          style={styles.textSpacing}
          fontSize="subheading"
          fontWeight="bold"
        >
          {isMine
            ? `${review.repository.ownerName}/${review.repository.name}`
            : review.user.username}
        </Text>
        <Text style={styles.textSpacing} color="textSecondary">
          {format(new Date(review.createdAt), "MM.dd.yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
