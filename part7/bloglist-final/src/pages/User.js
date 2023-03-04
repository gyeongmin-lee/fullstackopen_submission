import { Heading, Link, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import userService from "../services/users";

const UserPage = () => {
  const { id } = useParams();
  const result = useQuery(["users", id], () => userService.getOne(id));
  const user = result.data;

  return (
    <div>
      <Heading as="h2" size="md">
        User
      </Heading>
      {result.isLoading && <div>Loading...</div>}
      {result.isError && <div>Error: {result.error.message}</div>}
      {user && (
        <div>
          <Text mb={2}>
            {user.name} ({user.username})
          </Text>
          <Heading mb={2} as="h4" size="md">
            Added Blogs
          </Heading>
          <Stack divider={<StackDivider />}>
            {user.blogs.map((blog) => (
              <Text fontSize={"sm"} key={blog.id}>
                <Link
                  color={"blue.500"}
                  as={RouterLink}
                  to={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>
              </Text>
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default UserPage;
