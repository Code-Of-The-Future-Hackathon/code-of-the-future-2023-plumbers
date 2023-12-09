import { createSlice } from "@reduxjs/toolkit";

export const activeGreenSpaceSlice = createSlice({
  name: "activeGreenSpace",
  initialState: false,
  reducers: {
    setActiveGreenSpace: (state, action) => {
      return action.payload;
    },
  },
});

export const { setActiveGreenSpace } = activeGreenSpaceSlice.actions;

export default activeGreenSpaceSlice.reducer;
