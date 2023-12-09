import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsLoading } = notificationSlice.actions;

export default notificationSlice.reducer;
