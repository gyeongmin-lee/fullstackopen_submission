import { useState } from "react";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";

import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";
import useRepositories from "../hooks/useRepositories";
import ModalSelector from "./ModalSelector";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const PressableRepositoryItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <RepositoryItem item={item} />
    </Pressable>
  );
};

const sortOptions = [
  {
    key: "latest-repositories",
    label: "Latest repositories",
  },
  {
    key: "highest-rated-repositories",
    label: "Highest rated repositories",
  },
  {
    key: "lowest-rated-repositories",
    label: "Lowest rated repositories",
  },
];

export const RepositoryListContainer = ({
  repositories,
  setSortBy,
  searchValue,
  onSearchChange,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <PressableRepositoryItem item={item} />}
      ListHeaderComponent={
        <>
          <TextInput
            name="search"
            placeholder="Search"
            style={{ backgroundColor: "white", padding: 15 }}
            value={searchValue}
            onChangeText={onSearchChange}
          />
          <ModalSelector
            data={sortOptions}
            onChange={(option) => setSortBy(option.key)}
            initValue="Sort repositories by:"
          />
        </>
      }
    />
  );
};

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("latest-repositories");
  const orderBy =
    sortBy === "latest-repositories" ? "CREATED_AT" : "RATING_AVERAGE";
  const orderDirection =
    sortBy === "lowest-rated-repositories" ? "ASC" : "DESC";

  const [searchValue, setSearchValue] = useState("");
  const [searchKeyword] = useDebounce(searchValue, 500);

  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      setSortBy={setSortBy}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
};

export default RepositoryList;
