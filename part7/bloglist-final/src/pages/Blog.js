import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router";
import blogService from "../services/blogs";
import useMessageStore from "../store/messageStore";

const withHttp = (url) => (!/^https?:\/\//i.test(url) ? `http://${url}` : url);

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const result = useQuery(["blog", id], () => blogService.getOne(id));
  const blog = result.data;
  const [commentValue, setCommentValue] = useState("");

  const { showMessage, showErrorMessage } = useMessageStore();

  const queryClient = useQueryClient();

  const url = blog && withHttp(blog.url);

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries("blog");

      const { title } = updatedBlog;
      showMessage(`blog ${title} liked`);
    },
  });

  const addCommentMutation = useMutation(blogService.addComment, {
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries("blog");

      const { title } = updatedBlog;
      showMessage(`comment added to blog ${title}`);
    },
  });

  const deleteBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("blog");
      navigate("/");

      if (blog) {
        const { title } = blog;
        showMessage(`blog ${title} deleted`);
      }
    },
    onError: () => {
      showErrorMessage("Error deleting blog");
    },
  });

  const handleLike = async (blog) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { id, user, ...blogData } = blog;
      const updatedBlog = {
        ...blogData,
        likes: blogData.likes + 1,
      };

      updateBlogMutation.mutate({ id, newObject: updatedBlog });
    } catch (exception) {
      console.error(exception);
      showErrorMessage("Error liking blog");
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await deleteBlogMutation.mutate(blog.id);
      }
    } catch (exception) {
      console.error(exception);
      showErrorMessage("Error deleting blog");
    }
  };

  const handleComment = async () => {
    try {
      addCommentMutation.mutate({ id, comment: commentValue });
      setCommentValue("");
    } catch (exception) {
      console.error(exception);
      showErrorMessage("Error adding comment");
    }
  };

  return (
    <div>
      {result.isLoading && <div>Loading...</div>}
      {result.isError && <div>Error: {result.error.message}</div>}
      {blog && (
        <>
          <h2>{blog.title}</h2>
          <div>
            <a href={url}>{blog.url}</a>
            <div>
              {blog.likes} likes{" "}
              <button onClick={() => handleLike(blog)}>like</button>
            </div>
            {blog.user && <div>added by {blog.user.name}</div>}
            <button onClick={() => handleDelete(blog)}>delete</button>
          </div>
          <div>
            <h3>comments</h3>
            <div>
              <form onSubmit={handleComment}>
                <input
                  type="text"
                  value={commentValue}
                  onChange={({ target }) => setCommentValue(target.value)}
                />
                <button type="submit">add comment</button>
              </form>
            </div>
            {blog.comments.length === 0 ? (
              <div>No comments yet</div>
            ) : (
              <ul>
                {blog.comments.map((comment) => (
                  <li key={comment}>{comment}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPage;
