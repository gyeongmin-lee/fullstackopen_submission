import ReactDOM from "react-dom/client";

import App from "./App";

import { createStore } from "redux";
import noteReducer from "./reducers/noteReducer";
import { Provider } from "react-redux";

const store = createStore(noteReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
