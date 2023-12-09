import { createSlice } from "@reduxjs/toolkit";

export const mapCenterSlice = createSlice({
  name: "mapCenter",
  initialState: {
    lat: -3.745,
    lng: -38.523,
  },
  reducers: {
    setMapCenter: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMapCenter } = mapCenterSlice.actions;

export default mapCenterSlice.reducer;
