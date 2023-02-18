const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).end();
  }

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
  });
  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
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
