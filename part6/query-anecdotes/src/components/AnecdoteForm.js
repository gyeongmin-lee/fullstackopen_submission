import { useMutation, useQueryClient } from "react-query";
import { useNotification } from "../NotificationContext";
import { createAnecdote } from "../requests";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newNote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", [...anecdotes, newNote]);
      showNotification(`you created '${newNote.content}'`);
    },
    onError: () => {
      showNotification("too short anecdote, must have length 5 or more");
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
