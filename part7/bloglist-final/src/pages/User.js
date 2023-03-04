import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import userService from "../services/users";

const UserPage = () => {
  const { id } = useParams();
  const result = useQuery(["users", id], () => userService.getOne(id));
  const user = result.data;

  return (
    <div>
      <h2>User</h2>
      {result.isLoading && <div>Loading...</div>}
      {result.isError && <div>Error: {result.error.message}</div>}
      {user && (
        <div>
          <h3>{user.name}</h3>
          <h4>added blogs</h4>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserPage;
