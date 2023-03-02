import "./Message.css";

const Message = ({ message, errorMessage }) => {
  if (!message && !errorMessage) {
    return null;
  }
  return (
    <div className={`message ${errorMessage ? "error" : ""}`}>
      {message || errorMessage}
    </div>
  );
};

export default Message;
