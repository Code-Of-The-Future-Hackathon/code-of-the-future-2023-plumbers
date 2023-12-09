import { configureStore } from "@reduxjs/toolkit";

import zoomLevelReducer from "./zoomLevelSlice.js";

export default configureStore({
  reducer: {
    zoomLevel: zoomLevelReducer,
  },
});
