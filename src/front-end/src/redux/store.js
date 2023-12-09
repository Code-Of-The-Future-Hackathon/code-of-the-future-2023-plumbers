import { configureStore } from "@reduxjs/toolkit";

import mapZoomLevelReducer from "./mapZoomLevelSlice.js";
import splitMapScreenReducer from "./splitMapScreenSlice.js";
import mapCenterReducer from "./mapCenterSlice.js";
import isLoadingReducer from "./isLoadingSlice.js";
import notificationReducer from "./notificationSlice.js";

export default configureStore({
  reducer: {
    mapZoomLevel: mapZoomLevelReducer,
    splitMapScreen: splitMapScreenReducer,
    mapCenter: mapCenterReducer,
    isLoading: isLoadingReducer,
    notification: notificationReducer,
  },
});