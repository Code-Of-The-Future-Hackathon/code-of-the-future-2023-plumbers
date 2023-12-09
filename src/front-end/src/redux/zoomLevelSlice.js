import { createSlice } from "@reduxjs/toolkit";

export const zoomLevelSlice = createSlice({
  name: "zoomLevel",
  initialState: 14,
  reducers: {
    setZoomLevel: (state, action) => {
      return action.payload;
    },
  },
});

export const { setZoomLevel } = zoomLevelSlice.actions;

export default zoomLevelSlice.reducer;
