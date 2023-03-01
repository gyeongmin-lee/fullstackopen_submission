import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return action.data;
    case "HIDE_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  const showNotification = (message) => {
    dispatch({
      type: "SHOW_NOTIFICATION",
      data: message,
    });

    setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" });
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};

export default NotificationContext;
