import { useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const { data: bookData, refetch: refetchFilteredBooks } = useQuery(
    ALL_BOOKS,
    {
      variables: { genre },
    }
  );

  const { data: genreData, refetch: refetchAllBooks } = useQuery(ALL_BOOKS);

  useSubscription(BOOK_ADDED, {
    onData: () => {
      refetchAllBooks();
      refetchFilteredBooks({ genre });
    },
  });

  const allGenres = genreData && [
    ...new Set(genreData.allBooks.map((b) => b.genres).flat()),
  ];

  const updateGenre = (genre) => {
    setGenre(genre);
    refetchFilteredBooks({ genre });
  };

  const books = bookData && bookData.allBooks;

  if (!props.show) {
    return null;
  }

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
