const listHelper = require("../utils/list_helper");
const { initialBlogPosts } = require("./test_helper");

const blogs = initialBlogPosts;

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has many blogs, equals the likes of that", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("when list has many blogs, equals the likes of that", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  test("when list is empty, equals null", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(null);
  });
});

describe("most blogs", () => {
  test("when list has only one blog, equals the author of that", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("when list has many blogs, equals the author of that", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("when list is empty, equals null", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(null);
  });
});

describe("most likes", () => {
  test("when list has only one blog, equals the author of that", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("when list has many blogs, equals the author of that", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });

  test("when list is empty, equals null", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(null);
  });
});
