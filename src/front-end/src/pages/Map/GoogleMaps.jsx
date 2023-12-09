import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";
import { memo, useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

import { setSplitMapScreen } from "../../redux/splitMapScreenSlice";
import GreenSpacesSwitch from "./GreenSpacesSwitch";
import { setIsLoading } from "../../redux/isLoadingSlice";
import { getGreenspaces } from "../../services/greenspacesService";
import { GREEN_SPACES_COLORS } from "../../constants";

const GoogleMaps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const [map, setMap] = useState(null);
  const [greenSpaces, setGreenSpaces] = useState([]);
  const splitMapScreen = useSelector((state) => state.splitMapScreen);
  const mapZoomLevel = useSelector((state) => state.mapZoomLevel);
  const mapCenter = useSelector((state) => state.mapCenter);
  const dispatch = useDispatch();

  useEffect(() => {
    getNewGreenSpaces();
  }, []);

  const getNewGreenSpaces = async () => {
    dispatch(setIsLoading(true));

    try {
      const newGreenSpaces = await getGreenspaces();
      setGreenSpaces(newGreenSpaces);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

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
          key={greenSpace.id}
          onClick={() => onGreenSpaceClick(greenSpace)}
          paths={greenSpace.geometry}
          options={{
            fillColor: GREEN_SPACES_COLORS[greenSpace.type],
          }}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(GoogleMaps);
