import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useParams } from "react-router";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { format } from "date-fns";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  mb: {
    marginBottom: 10,
  },
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

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
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
          {review.user.username}
        </Text>
        <Text style={styles.textSpacing} color="textSecondary">
          {format(new Date(review.createdAt), "MM.dd.yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const Repository = () => {
  const repositoryID = useParams().id;

  const { data, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id: repositoryID },
  });

  if (!data || !data.repository || loading) {
    return <Text>Loading...</Text>;
  }

  const reviews = data.repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      style={styles.list}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View style={styles.mb}>
          <RepositoryItem showLink={true} item={data.repository} />
        </View>
      )}
    />
  );
};

export default Repository;
