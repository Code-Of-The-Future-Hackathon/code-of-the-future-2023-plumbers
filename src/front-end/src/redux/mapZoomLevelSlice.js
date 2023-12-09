import { createSlice } from "@reduxjs/toolkit";

export const mapZoomLevelSlice = createSlice({
  name: "mapZoomLevel",
  initialState: 9,
  reducers: {
    setZoomLevel: (state, action) => {
      return action.payload;
    },
  },
});

export const { setZoomLevel } = mapZoomLevelSlice.actions;

export default mapZoomLevelSlice.reducer;
