import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const LOCAL_USER_KEY = "loggedBlogappUser";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const toggleBlogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      setUsername("");
      setPassword("");

      setNotificationMessage({ message: `Welcome ${user.name}` });
    } catch (exception) {
      console.error(exception);
      setNotificationMessage({
        message: "Wrong username or password",
        isError: true,
      });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(LOCAL_USER_KEY);
    setUser(null);
  };

  const handleNewBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));

      const { title } = createdBlog;
      setNotificationMessage({ message: `a new blog ${title} added` });

      toggleBlogRef.current.toggleVisibility();
    } catch (exception) {
      console.error(exception);
      setNotificationMessage({ message: "Error creating blog", isError: true });
    }
  };

  const handleLike = async (blog) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { id, user, ...blogData } = blog;

      const updatedBlog = await blogService.update(blog.id, {
        ...blogData,
        likes: blogData.likes + 1,
      });
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );

      const { title } = updatedBlog;
      setNotificationMessage({ message: `blog ${title} liked` });
    } catch (exception) {
      console.error(exception);
      setNotificationMessage({ message: "Error liking blog", isError: true });
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));

        const { title } = blog;
        setNotificationMessage({ message: `blog ${title} deleted` });
      }
    } catch (exception) {
      console.error(exception);
      setNotificationMessage({ message: "Error deleting blog", isError: true });
    }
  };

  const setNotificationMessage = ({ message, isError = false }) => {
    if (isError) {
      setError(message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } else {
      setMessage(message);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Message message={message} errorMessage={error} />
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
      <h2>blogs</h2>
      <Message message={message} errorMessage={error} />
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <Togglable buttonLabel="new note" ref={toggleBlogRef}>
        <BlogForm createBlog={handleNewBlog} />
      </Togglable>
      <h2>posts</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLike={handleLike}
          onDelete={blog.user?.username === user.username ? handleDelete : null}
        />
      ))}
    </div>
  );
};

export default App;
