import {
  Box,
  Button,
  Heading,
  Input,
  Link,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
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
          <Heading as="h2" size="md">
            {blog.title}
          </Heading>
          <VStack alignItems="flex-start" spacing="1" marginBottom="5">
            <Link color="blue.500" isExternal href={url}>
              {blog.url}
            </Link>
            <div>
              {blog.likes} likes{" "}
              <Button size="xs" onClick={() => handleLike(blog)}>
                LIKE
              </Button>
            </div>
            {blog.user && (
              <Text fontSize="sm" color="gray.500">
                Added by {blog.user.name}
              </Text>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDelete(blog)}
            >
              Delete
            </Button>
          </VStack>
          <div>
            <Heading marginBottom="1" as="h3" size="sm">
              Comments
            </Heading>
            <Box marginBottom={5}>
              <form onSubmit={handleComment}>
                <Input
                  type="text"
                  value={commentValue}
                  onChange={({ target }) => setCommentValue(target.value)}
                />
                <Button marginTop="2" size="sm" type="submit">
                  Add Comment
                </Button>
              </form>
            </Box>
            {blog.comments.length === 0 ? (
              <Text>No comments yet</Text>
            ) : (
              <Stack divider={<StackDivider />}>
                {blog.comments.map((comment) => (
                  <Text fontSize="sm" key={comment}>
                    {comment}
                  </Text>
                ))}
              </Stack>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPage;
