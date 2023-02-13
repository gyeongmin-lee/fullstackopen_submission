import { useState } from "react";

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const showRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * (anecdotes.length - 1));
    const newIndex = randomIndex === selected ? randomIndex + 1 : randomIndex;
    setSelected(newIndex);
  };

  const voteAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const maxVotes = Math.max(...votes);
  const maxVotesIndex = votes.indexOf(maxVotes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <div>
        <button onClick={voteAnecdote}>vote</button>
        <button onClick={showRandomAnecdote}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[maxVotesIndex]} votes={maxVotes} />
    </div>
  );
};

export default App;
