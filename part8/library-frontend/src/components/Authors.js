import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";
import { useState } from "react";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  const authors = result.data && result.data.allAuthors;

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  const updateYear = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born: Number(born) } });

    setBorn("");
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors &&
            authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={updateYear}>
        {authors && (
          <Select
            options={authors.map((a) => ({ value: a.name, label: a.name }))}
            onChange={({ value }) => setName(value)}
          />
        )}
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
