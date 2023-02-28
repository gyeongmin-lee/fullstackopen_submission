import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification: (state, action) => action.payload,
    hideNotification: () => "",
  },
});

export const { setNotification, hideNotification } = notificationSlice.actions;

export const showNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(hideNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
