const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  initialBlogPosts,
  blogsInDb,
  nonExistingId,
  usersInDb,
  getLoggedInUser,
} = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogPosts.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are correct number of blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogPosts.length);
  });

  test("the blog has an id property", async () => {
    const blogs = await blogsInDb();
    const blog = blogs[0];

    expect(blog.id).toBeDefined();
  });
});

describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {
    const { token, user: loggedInUser } = await getLoggedInUser(api);

    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "http://newblog.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogPosts.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("New blog");

    const addedBlog = blogsAtEnd.find((blog) => blog.title === "New blog");
    expect(addedBlog.user.username).toBe(loggedInUser.username);

    const usersAtEnd = await usersInDb();
    const updatedUser = usersAtEnd.find(
      (u) => u.username === loggedInUser.username
    );
    expect(updatedUser.blogs.length).toBe(loggedInUser.blogs.length + 1);
  });

  test("a blog without likes property defaults to 0", async () => {
    const { token } = await getLoggedInUser(api);

    const newBlog = {
      title: "New blog",
      author: "New author",
      url: "http://newblog.com",
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog);

    const blogsAtEnd = await blogsInDb();
    const addedBlog = blogsAtEnd.find((blog) => blog.title === "New blog");

    expect(addedBlog.likes).toBe(0);
  });

  test("a blog without title and url is not added", async () => {
    const missingTitle = {
      author: "New author",
      url: "http://newblog.com",
    };

    const missingUrl = {
      title: "New blog",
      author: "New author",
    };

    await api.post("/api/blogs").send(missingTitle).expect(400);
    await api.post("/api/blogs").send(missingUrl).expect(400);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogPosts.length);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogPosts.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("updating a blog", () => {
  test("succeeds with status code 200 if id is valid", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogPosts.length);

    const updatedBlogInDb = blogsAtEnd.find(
      (blog) => blog.id === blogToUpdate.id
    );
    expect(updatedBlogInDb.likes).toBe(blogToUpdate.likes + 1);
  });

  test("succeeds with status code 200 if id is valid and likes is not defined", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "New Title",
      author: blogToUpdate.author,
      url: blogToUpdate.url,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogPosts.length);

    const updatedBlogInDb = blogsAtEnd.find(
      (blog) => blog.id === blogToUpdate.id
    );
    expect(updatedBlogInDb.likes).toBe(blogToUpdate.likes);
  });

  test("fails with status code 404 if id is not found", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };

    const invalidId = await nonExistingId();
    await api.put(`/api/blogs/${invalidId}`).send(updatedBlog).expect(404);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogPosts.length);
  });

  test("fails with status code 400 if id is invalid", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };

    await api.put("/api/blogs/invalidId").send(updatedBlog).expect(400);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogPosts.length);
  });
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("user can be fetched", async () => {
    const usersAtStart = await usersInDb();
    const response = await api.get("/api/users");

    expect(response.body).toHaveLength(usersAtStart.length);

    const users = response.body.map((user) => user.username);
    expect(users).toContain("root");
  });

  test("user can be added", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "testuser",
      name: "Test User",
      password: "testuserpassword",
    };

    await api.post("/api/users").send(newUser).expect(201);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain("testuser");
  });

  test("user cannot be added if username is not unique", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "root",
      name: "Test User",
      password: "testuserpassword",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("both username and password are required", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "testuser",
      name: "Test User",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    expect(result.body.error).toContain("missing");

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("both username and password should be at least 3 characters long", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "te",
      name: "Test User",
      password: "te",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    expect(result.body.error).toContain("is shorter than the minimum allowed");

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
