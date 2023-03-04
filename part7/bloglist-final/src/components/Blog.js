import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <strong>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </strong>{" "}
      {blog.author}{" "}
    </div>
  );
};

export default Blog;
