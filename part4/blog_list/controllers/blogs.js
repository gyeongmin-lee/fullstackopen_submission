const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).end();
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: request.user.id,
  });

  const savedBlogs = await blog.save();
  request.user.blogs = request.user.blogs.concat(savedBlogs.id);
  await request.user.save();

  response.status(201).json(savedBlogs);
});

blogRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response.status(400).end();
  }

  if (blogToDelete.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: "not authorized" });
  }
  await blogToDelete.remove();

  request.user.blogs = request.user.blogs.filter(
    (blogId) => blogId.toString() !== request.params.id
  );
  await request.user.save();

  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const blog = request.body;

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogRouter;
