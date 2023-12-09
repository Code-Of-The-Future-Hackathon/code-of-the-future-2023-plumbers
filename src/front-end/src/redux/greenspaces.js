import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  publicAreas: [],
  currentPublicAreaZone: {},
};

const publicAreasSlice = createSlice({
  name: 'greenspaces',
  initialState,
  reducers: {
    setCurrentGreenspace: (state, action) => {
      state.currentPublicAreaZone = action.payload;
    },
    setCurrentGreenspaces: (state, action) => {
      state.publicAreas = action.payload;
    },
  },
});

export const { setCurrentPublicAreaZone, setPublicAreas } =
  publicAreasSlice.actions;

export default publicAreasSlice.reducer;
