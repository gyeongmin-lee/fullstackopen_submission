import { useApolloClient, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommended from "./components/Recommended";
import { BOOK_ADDED } from "./queries";
import { STORAGE_KEY, updateCacheWith } from "./util";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) {
      setToken(token);
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      updateCacheWith(addedBook, client.cache);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <Recommended show={page === "recommend"} />

      <NewBook show={page === "add"} setPage={setPage} />

      <LoginForm
        show={page === "login"}
        onLogin={() => setPage("authors")}
        setToken={setToken}
      />
    </div>
  );
};

export default App;
