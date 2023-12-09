import { createSlice } from "@reduxjs/toolkit";

export const mapCenterSlice = createSlice({
  name: "mapCenter",
  initialState: {
    lat: 42.4564897,
    lng: 27.3987238,
  },
  reducers: {
    setMapCenter: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMapCenter } = mapCenterSlice.actions;

export default mapCenterSlice.reducer;
