import format from "date-fns/format";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router";
import useReviews from "../hooks/useReviews";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  reviewWrapper: {
    backgroundColor: "white",
    padding: 10,
  },
  review: {
    display: "flex",
    flexDirection: "row",
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
  footerBtnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  footerBtn: {
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  blueBtn: {
    backgroundColor: theme.colors.primary,
  },
  redBtn: {
    backgroundColor: theme.colors.error,
  },
});

const ReviewItem = ({ review, isMine }) => {
  const navigate = useNavigate();
  const { deleteReview } = useReviews();

  const openLink = () => {
    navigate(`/repository/${review.repository.id}`);
  };

  const deleteAlert = async () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: onDelete,
        },
      ]
    );
  };

  const onDelete = async () => {
    try {
      await deleteReview(review.id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.reviewWrapper}>
      <View style={styles.review}>
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
      {isMine && (
        <View style={styles.footerBtnGroup}>
          <Pressable
            onPress={openLink}
            style={[styles.footerBtn, styles.blueBtn]}
          >
            <Text color="white" fontWeight="bold">
              View repository
            </Text>
          </Pressable>
          <Pressable
            onPress={deleteAlert}
            style={[styles.footerBtn, styles.redBtn]}
          >
            <Text color="white" fontWeight="bold">
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
