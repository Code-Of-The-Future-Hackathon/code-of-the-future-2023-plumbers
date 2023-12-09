import { configureStore } from "@reduxjs/toolkit";

import zoomLevelReducer from "./zoomLevelSlice.js";
import splitMapScreenReducer from "./splitMapScreenSlice.js";
import mapCenterReducer from "./mapCenterSlice.js";

export default configureStore({
  reducer: {
    zoomLevel: zoomLevelReducer,
    splitMapScreen: splitMapScreenReducer,
    mapCenter: mapCenterReducer,
  },
});
