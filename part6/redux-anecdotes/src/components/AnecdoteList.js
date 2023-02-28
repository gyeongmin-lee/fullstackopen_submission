import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    showNotification(
      `You voted for "${anecdotes.find((a) => a.id === id).content}"`,
      5
    )(dispatch);
  };

  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => {
    if (!filter) {
      return anecdote;
    }

    return anecdote.content.toLowerCase().includes(filter.toLowerCase());
  });

  return filteredAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
