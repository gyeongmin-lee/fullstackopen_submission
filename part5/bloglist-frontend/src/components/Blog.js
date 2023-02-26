import { useState } from "react";

const Blog = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        <strong>{blog.title}</strong> {blog.author}{" "}
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {!isExpanded ? "view" : "hide"}
        </button>
      </div>
      {isExpanded && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button>like</button>
          </div>
          {blog.user && <div>{blog.user.name}</div>}
        </div>
      )}
    </div>
  );
};

export default Blog;
