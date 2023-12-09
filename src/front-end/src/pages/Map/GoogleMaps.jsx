import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { memo, useCallback, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

import { setSplitMapScreen } from "../../redux/splitMapScreenSlice";

const center = {
  lat: -3.745,
  lng: -38.523,
};

const GoogleMaps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const [map, setMap] = useState(null);
  const splitMapScreen = useSelector((state) => state.splitMapScreen);
  const mapZoomLevel = useSelector((state) => state.mapZoomLevel);
  const dispatch = useDispatch();

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onClickGreenSpace = () => {
    dispatch(setSplitMapScreen(true));
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: splitMapScreen ? "50%" : "100%",
        height: "91vh",
      }}
      center={center}
      zoom={mapZoomLevel}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Button variant="outlined" onClick={onClickGreenSpace}>
        Open Green Space
      </Button>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(GoogleMaps);
