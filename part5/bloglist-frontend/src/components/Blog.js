import { useState } from "react";

const Blog = ({ blog, onLike, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <strong>{blog.title}</strong> {blog.author}{" "}
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {!isExpanded ? "view" : "hide"}
        </button>
      </div>
      {isExpanded && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>
            likes {blog.likes}{" "}
            <button onClick={() => onLike(blog)}>like</button>
          </div>
          {blog.user && <div>{blog.user.name}</div>}
          {onDelete && <button onClick={() => onDelete(blog)}>remove</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;
