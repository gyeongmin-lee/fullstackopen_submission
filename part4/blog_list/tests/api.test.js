const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogPosts, blogsInDb } = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogPosts.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

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

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "New blog",
    author: "New author",
    url: "http://newblog.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogPosts.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain("New blog");
});

test("a blog without likes property defaults to 0", async () => {
  const newBlog = {
    title: "New blog",
    author: "New author",
    url: "http://newblog.com",
  };

  await api.post("/api/blogs").send(newBlog);

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
