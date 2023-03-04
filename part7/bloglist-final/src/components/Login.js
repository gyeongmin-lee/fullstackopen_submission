import { useState } from "react";
import { LOCAL_USER_KEY } from "../App";
import useMessageStore from "../store/messageStore";
import Message from "./Message";
import loginService from "../services/login";
import useUserStore from "../store/userStore";
import blogService from "../services/blogs";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { message, errorMessage, showMessage, showErrorMessage } =
    useMessageStore();
  const { setUser } = useUserStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);

      setUsername("");
      setPassword("");

      showMessage(`Welcome ${user.name}`);
    } catch (exception) {
      console.error(exception);
      showErrorMessage("Wrong username or password");
    }
  };
  return (
    <Container maxWidth="container.md" padding="10px">
      <Heading marginBottom="3" as="h2">
        Log In to Application
      </Heading>
      <Message message={message} errorMessage={errorMessage} />
      <form onSubmit={handleLogin}>
        <Box marginBottom="3">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </FormControl>
        </Box>
        <Button id="login-button" type="submit">
          login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
