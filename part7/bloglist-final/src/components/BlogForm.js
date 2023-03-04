import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import blogService from "../services/blogs";
import useMessageStore from "../store/messageStore";

const BlogForm = ({ toggleBlogRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient();

  const showMessage = useMessageStore((state) => state.showMessage);
  const showErrorMessage = useMessageStore((state) => state.showErrorMessage);

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", blogs.concat(newBlog));

      const { title } = newBlog;
      showMessage(`a new blog ${title} added`);
    },
  });

  const addBlog = (event) => {
    event.preventDefault();
    handleNewBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleNewBlog = async (newBlog) => {
    try {
      newBlogMutation.mutate(newBlog);
      toggleBlogRef.current.toggleVisibility();
    } catch (exception) {
      console.error(exception);
      showErrorMessage("Error creating blog");
    }
  };

  return (
    <VStack spacing="2" alignItems="stretch">
      <Heading as="h2" size="md">
        Create New
      </Heading>
      <form onSubmit={addBlog}>
        <Stack spacing="1" marginBottom="3">
          <FormControl>
            <FormLabel marginBottom="0">Title</FormLabel>
            <Input
              size="sm"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel marginBottom="0">Author</FormLabel>
            <Input
              size="sm"
              type="text"
              name="author"
              id="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel marginBottom="0">URL</FormLabel>
            <Input
              size="sm"
              type="text"
              name="url"
              id="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              required
            />
          </FormControl>
        </Stack>
        <Button
          colorScheme={"blue"}
          marginBottom="10px"
          id="create-button"
          type="submit"
        >
          create
        </Button>
      </form>
    </VStack>
  );
};

export default BlogForm;
