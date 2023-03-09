import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const { data: bookData } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  });

  const { data: allBookData } = useQuery(ALL_BOOKS, { genre: null });
  const allGenres = allBookData && [
    ...new Set(allBookData.allBooks.map((b) => b.genres).flat()),
  ];

  const updateGenre = (genre) => {
    setGenre(genre);
  };

  const books = genre
    ? bookData && bookData.allBooks
    : allBookData && allBookData.allBooks;

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
