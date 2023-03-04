import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import "./Message.css";

const Message = ({ message, errorMessage }) => {
  if (!message && !errorMessage) {
    return null;
  }
  return (
    <Alert status={errorMessage ? "error" : "success"}>
      <AlertIcon />
      <AlertTitle>{message || errorMessage}</AlertTitle>
    </Alert>
  );
};

export default Message;
