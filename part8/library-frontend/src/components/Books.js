import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  const allResult = useQuery(ALL_BOOKS);

  const allGenres = allResult.data && [
    ...new Set(allResult.data.allBooks.map((b) => b.genres).flat()),
  ];

  if (!props.show) {
    return null;
  }

  const updateGenre = (genre) => {
    setGenre(genre);
    result.refetch({ genre });
  };

  const books = result.data && result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

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
      <div>
        {allGenres &&
          allGenres.map((g) => (
            <button key={g} onClick={() => updateGenre(g)}>
              {g}
            </button>
          ))}
        <button onClick={() => updateGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
