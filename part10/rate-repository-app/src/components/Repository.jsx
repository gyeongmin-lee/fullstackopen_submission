import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useParams } from "react-router";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const styles = StyleSheet.create({
  mb: {
    marginBottom: 10,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = () => {
  const repositoryID = useParams().id;

  const { data, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id: repositoryID },
    fetchPolicy: "cache-and-network",
  });

  if (!data || !data.repository || loading) {
    return <Text>Loading...</Text>;
  }

  const reviews = data.repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
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
