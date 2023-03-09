import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommended = (props) => {
  const meResult = useQuery(ME);

  const favoriteGenre =
    meResult.data && meResult.data.me && meResult.data.me.favoriteGenre;

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  });

  if (!props.show) {
    return null;
  }

  const books = result.data && result.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in you favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books &&
            books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
