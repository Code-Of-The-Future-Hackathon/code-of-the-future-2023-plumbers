import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { memo, useCallback, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

import { setSplitMapScreen } from "../../redux/splitMapScreenSlice";
import GreenSpacesSwitch from "./GreenSpacesSwitch";

const GoogleMaps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const [map, setMap] = useState(null);
  const splitMapScreen = useSelector((state) => state.splitMapScreen);
  const mapZoomLevel = useSelector((state) => state.mapZoomLevel);
  const mapCenter = useSelector((state) => state.mapCenter);
  const dispatch = useDispatch();

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(mapCenter);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onClickGreenSpace = () => {
    dispatch(setSplitMapScreen(true));
  };

  const onGreenSpaceClick = (greenSpace) => {
    console.log(greenSpace);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: splitMapScreen ? "50%" : "100%",
        height: "91vh",
      }}
      center={mapCenter}
      zoom={mapZoomLevel}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Button variant="outlined" onClick={onClickGreenSpace}>
        Open Green Space
      </Button>
      <Button
        onClick={() => enqueueSnackbar("Notify!", { variant: "warning" })}
      >
        Show snackbar
      </Button>
      <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <GreenSpacesSwitch />
      </div>
      {greenSpaces.map((greenSpace) => (
        <Polygon
          onClick={() => onGreenSpaceClick(greenSpace)}
          paths={Object.values(p.points)}
          options={{
            fillColor: p.color,
          }}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(GoogleMaps);
