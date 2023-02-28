import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      return [...state, action.payload];
    },
    voteAnecdote: (state, action) => {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        votes: noteToChange.votes + 1,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
