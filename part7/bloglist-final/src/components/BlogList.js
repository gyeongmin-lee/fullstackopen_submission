import { Heading, VStack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import blogService from "../services/blogs";
import Blog from "./Blog";

const BlogList = () => {
  const result = useQuery("blogs", blogService.getAll);

  const blogs = result.data;
  const sortedBlogs = blogs && blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      <Heading as="h3" size="md">
        Posts
      </Heading>
      {result.isLoading && <div>Loading...</div>}
      {result.isError && <div>Error: {result.error.message}</div>}
      {sortedBlogs && (
        <VStack marginTop="10px" spacing={4} alignItems="stretch">
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </VStack>
      )}
    </>
  );
};

export default BlogList;
