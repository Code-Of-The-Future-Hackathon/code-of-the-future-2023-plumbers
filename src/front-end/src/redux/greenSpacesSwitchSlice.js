import { createSlice } from "@reduxjs/toolkit";

export const greenSpacesSwitchSlice = createSlice({
  name: "greenSpacesSwitch",
  initialState: {
    garden: true,
    grass: true,
    grassland: true,
    park: true,
    scrub: true,
  },
  reducers: {
    setGreenSpacesSwitch: (state, action) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { setGreenSpacesSwitch } = greenSpacesSwitchSlice.actions;

export default greenSpacesSwitchSlice.reducer;
