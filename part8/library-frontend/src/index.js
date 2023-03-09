import ReactDOM from "react-dom/client";
import App from "./App";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { getWsHttpSplitLinnk } from "./util";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: getWsHttpSplitLinnk(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
