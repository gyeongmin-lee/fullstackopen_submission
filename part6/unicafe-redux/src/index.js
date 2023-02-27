import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

const App = () => {
  return (
    <>
      <div>
        <button onClick={() => store.dispatch({ type: "GOOD" })}>good</button>
        <button onClick={() => store.dispatch({ type: "OK" })}>neutral</button>
        <button onClick={() => store.dispatch({ type: "BAD" })}>bad</button>
        <button onClick={() => store.dispatch({ type: "ZERO" })}>
          reset stats
        </button>
      </div>
      <div>
        <h1>statistics</h1>
        <p>good {store.getState().good}</p>
        <p>neutral {store.getState().ok}</p>
        <p>bad {store.getState().bad}</p>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
