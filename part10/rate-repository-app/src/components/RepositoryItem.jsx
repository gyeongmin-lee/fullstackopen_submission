import { Image, StyleSheet, View } from "react-native";
import theme from "../theme";
import { formatCount } from "../util";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    rowGap: 20,
    columnGap: 20,
  },
  flexColContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "100px",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
    marginTop: 15,
  },
  footerItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  vGap: {
    marginVertical: 3,
  },
  hGap: {
    marginHorizontal: 10,
  },
  label: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 5,
    borderRadius: 5,
    fontSize: 10,
  },
});

const RepositoryFooterItem = ({ label, value }) => {
  return (
    <View style={styles.footerItem}>
      <Text style={styles.hGap} fontWeight="bold">
        {value}
      </Text>
      <Text style={styles.hGap} color="textSecondary">
        {label}
      </Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.flexContainer}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
        <View style={[styles.flexColContainer, styles.hGap]}>
          <Text style={styles.vGap} fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>
          <Text style={styles.vGap} color="textSecondary">
            {item.description}
          </Text>
          <View style={[styles.label, styles.vGap]}>
            <Text color="white">{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <RepositoryFooterItem
          label="Stars"
          value={formatCount(item.stargazersCount)}
        />
        <RepositoryFooterItem
          label="Forks"
          value={formatCount(item.forksCount)}
        />
        <RepositoryFooterItem label="Reviews" value={item.reviewCount} />
        <RepositoryFooterItem label="Rating" value={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
