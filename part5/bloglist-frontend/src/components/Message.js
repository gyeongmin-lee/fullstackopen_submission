import "./Message.css";

const Message = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null;
  }
  return (
    <div className={`message ${errorMessage ? "error" : ""}`}>
      {message || errorMessage}
    </div>
  );
};

export default Message;
