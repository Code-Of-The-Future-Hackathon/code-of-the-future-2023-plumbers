import { createSlice } from "@reduxjs/toolkit";

export const splitMapScreenSlice = createSlice({
  name: "splitMapScreen",
  initialState: false,
  reducers: {
    setSplitMapScreen: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSplitMapScreen } = splitMapScreenSlice.actions;

export default splitMapScreenSlice.reducer;
