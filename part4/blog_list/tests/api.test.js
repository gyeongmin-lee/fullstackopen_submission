const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const { initialBlogPosts, blogsInDb, nonExistingId } = require("./test_helper");

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

afterAll(async () => {
  await mongoose.connection.close();
});
