import { Heading, Table, Thead, Tr, Th, Td } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import userService from "../services/users";

const UsersPage = () => {
  const result = useQuery("users", userService.getAll);
  const users = result.data;

  return (
    <div>
      <Heading as="h2" size="md">
        Users
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Blogs Created</Th>
          </Tr>
        </Thead>
        <tbody>
          {users &&
            users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <Link to={`${user.id}`}>{user.name}</Link>
                </Td>
                <Td>{user.blogs.length}</Td>
              </Tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersPage;
