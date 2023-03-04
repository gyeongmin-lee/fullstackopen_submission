import { Card, CardBody, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <Card>
      <Link to={`/blogs/${blog.id}`}>
        <CardBody>
          <HStack>
            <Text fontWeight="bold">{blog.title}</Text>
            <Text>{blog.author}</Text>
          </HStack>
        </CardBody>
      </Link>
    </Card>
  );
};

export default Blog;
