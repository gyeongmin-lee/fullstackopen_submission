import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import BlogPage from "./pages/Blog";
import UserPage from "./pages/User";
import UsersPage from "./pages/Users";
import blogService from "./services/blogs";
import useMessageStore from "./store/messageStore";
import useUserStore from "./store/userStore";

export const LOCAL_USER_KEY = "loggedBlogappUser";

const App = () => {
  const { message, errorMessage } = useMessageStore();
  const { user, setUser } = useUserStore();

  const toggleBlogRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOCAL_USER_KEY);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem(LOCAL_USER_KEY);
    setUser(null);
  };

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <Box as="nav" backgroundColor="steelblue" color="white">
        <Flex justify="center">
          <HStack
            width="100%"
            padding="10px"
            maxWidth="container.md"
            spacing="10"
            justify="space-between"
          >
            <ButtonGroup variant="link" spacing="10px">
              <Button color="white">
                <Link to="/">blogs</Link>
              </Button>
              <Button color="white">
                <Link to="/users">users</Link>
              </Button>
            </ButtonGroup>
            <div>
              <strong>{user.name}</strong> logged in{" "}
              <Button color="ButtonText" size="xs" onClick={handleLogout}>
                logout
              </Button>
            </div>
          </HStack>
        </Flex>
      </Box>
      <Container maxWidth="container.md" paddingTop="12px" paddingBottom="12px">
        <VStack spacing="16px" alignItems="stretch">
          <Heading as="h2" size="lg">
            Blogs
          </Heading>
          <Message message={message} errorMessage={errorMessage} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Togglable buttonLabel="new note" ref={toggleBlogRef}>
                    <BlogForm toggleBlogRef={toggleBlogRef} />
                  </Togglable>
                  <BlogList />
                </>
              }
            ></Route>
            <Route path="/users" element={<UsersPage />}></Route>
            <Route path="/users/:id" element={<UserPage />}></Route>
            <Route path="/blogs/:id" element={<BlogPage />}></Route>
          </Routes>
        </VStack>
      </Container>
    </div>
  );
};

export default App;
