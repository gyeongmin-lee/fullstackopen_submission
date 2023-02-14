import "./Notification.css";

const Notification = ({ message, type = "success" }) => {
  if (message === null || message === "") {
    return null;
  }

  return <div className={`notification ${type === "error" ? "error" : ""}`}>{message}</div>;
};

export default Notification;
