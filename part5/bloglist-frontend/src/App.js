import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Message from "./components/Message";
import blogService from "./services/blogs";
import loginService from "./services/login";

const LOCAL_USER_KEY = "loggedBlogappUser";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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

  const handleNewBlog = async (e) => {
    e.preventDefault();

    try {
      const newBlog = { title, author, url };
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));

      setTitle("");
      setAuthor("");
      setUrl("");

      setNotificationMessage({ message: `a new blog ${title} added` });
    } catch (exception) {
      console.error(exception);
      setNotificationMessage({ message: "Error creating blog", isError: true });
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
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </div>
          <button type="submit">login</button>
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
      <h2>create new </h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>
        <button type="submit">create</button>
      </form>
      <h2>posts</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
