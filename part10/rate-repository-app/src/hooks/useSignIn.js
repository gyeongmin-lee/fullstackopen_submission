import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutation";
import { useAuthStorage } from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE_USER);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
