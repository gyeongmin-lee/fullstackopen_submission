import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification: (state, action) => action.payload,
    hideNotification: () => "",
  },
});

const { setNotification, hideNotification } = notificationSlice.actions;

const showNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(hideNotification());
    }, time * 1000);
  };
};

export { setNotification, hideNotification, showNotification };
export default notificationSlice.reducer;
