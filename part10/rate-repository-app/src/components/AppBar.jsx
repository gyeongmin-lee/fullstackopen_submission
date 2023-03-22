import { useQuery } from "@apollo/client";
import Constants from "expo-constants";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Link, useNavigate } from "react-router-native";
import { GET_AUTHORIZED_USER } from "../graphql/queries";
import useSignOut from "../hooks/useSignOut";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.darkBg,
    display: "flex",
    flexDirection: "row",
  },
  tabText: {
    color: "white",
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    padding: 20,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
  });

  const signOut = useSignOut();

  const navigate = useNavigate();
  const onSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.tabText}>Repositories</Text>
        </Link>
        {data?.me ? (
          <>
            <Link to="/create_review">
              <Text style={styles.tabText}>Create a review</Text>
            </Link>
            <Link to="/my_reviews">
              <Text style={styles.tabText}>My reviews</Text>
            </Link>
            <Pressable onPress={onSignOut}>
              <Text style={styles.tabText}>Sign Out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Text style={styles.tabText}>Sign In</Text>
            </Link>
            <Link to="/signup">
              <Text style={styles.tabText}>Sign Up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
