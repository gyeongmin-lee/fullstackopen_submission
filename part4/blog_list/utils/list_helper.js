const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  const favoriteBlog = blogs.find((blog) => blog.likes === mostLikes);

  if (!favoriteBlog) {
    return null;
  }

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const uniqueAuthors = [...new Set(authors)];

  const authorBlogs = uniqueAuthors.map((author) => {
    return {
      author,
      blogs: blogs.filter((blog) => blog.author === author).length,
    };
  });

  const mostBlogs = Math.max(...authorBlogs.map((author) => author.blogs));
  const authorWithMostBlogs = authorBlogs.find(
    (author) => author.blogs === mostBlogs
  );

  if (!authorWithMostBlogs) {
    return null;
  }

  return {
    author: authorWithMostBlogs.author,
    blogs: authorWithMostBlogs.blogs,
  };
};

const mostLikes = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const uniqueAuthors = [...new Set(authors)];

  const authorLikes = uniqueAuthors.map((author) => {
    return {
      author,
      likes: blogs
        .filter((blog) => blog.author === author)
        .reduce((acc, blog) => acc + blog.likes, 0),
    };
  });

  const mostLikes = Math.max(...authorLikes.map((author) => author.likes));
  const authorWithMostLikes = authorLikes.find(
    (author) => author.likes === mostLikes
  );

  if (!authorWithMostLikes) {
    return null;
  }

  return {
    author: authorWithMostLikes.author,
    likes: authorWithMostLikes.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
