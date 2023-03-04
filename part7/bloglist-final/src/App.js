import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import BlogPage from "./pages/Blog";
import UserPage from "./pages/User";
import UsersPage from "./pages/Users";
import blogService from "./services/blogs";
import loginService from "./services/login";
import useMessageStore from "./store/messageStore";
import useUserStore from "./store/userStore";

const LOCAL_USER_KEY = "loggedBlogappUser";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { message, errorMessage, showMessage, showErrorMessage } =
    useMessageStore();
  const { user, setUser } = useUserStore();

  const toggleBlogRef = useRef();

  const queryClient = useQueryClient();

  const result = useQuery("blogs", blogService.getAll);

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", blogs.concat(newBlog));

      const { title } = newBlog;
      showMessage(`a new blog ${title} added`);
    },
  });

  const blogs = result.data;
  const sortedBlogs = blogs && blogs.sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOCAL_USER_KEY);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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

  const handleLogout = () => {
    window.localStorage.removeItem(LOCAL_USER_KEY);
    setUser(null);
  };

  const handleNewBlog = async (newBlog) => {
    try {
      newBlogMutation.mutate(newBlog);
      toggleBlogRef.current.toggleVisibility();
    } catch (exception) {
      console.error(exception);
      showErrorMessage("Error creating blog");
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Message message={message} errorMessage={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username{" "}
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              required
            />
          </div>
          <div>
            password{" "}
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
      </div>
      <h2>blogs</h2>
      <Message message={message} errorMessage={errorMessage} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
              <Togglable buttonLabel="new note" ref={toggleBlogRef}>
                <BlogForm createBlog={handleNewBlog} />
              </Togglable>
              <h2>posts</h2>
              {result.isLoading && <div>Loading...</div>}
              {result.isError && <div>Error: {result.error.message}</div>}
              {sortedBlogs &&
                sortedBlogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
            </>
          }
        ></Route>
        <Route path="/users" element={<UsersPage />}></Route>
        <Route path="/users/:id" element={<UserPage />}></Route>
        <Route path="/blogs/:id" element={<BlogPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
