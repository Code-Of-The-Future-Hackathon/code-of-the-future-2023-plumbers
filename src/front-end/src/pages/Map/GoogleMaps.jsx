import {
  GoogleMap,
  useJsApiLoader,
  Polygon,
  Polyline,
} from "@react-google-maps/api";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSplitMapScreen } from "../../redux/splitMapScreenSlice";
import GreenSpacesSwitch from "./GreenSpacesSwitch";
import { setIsLoading } from "../../redux/isLoadingSlice";
import { getGreenspaces } from "../../services/greenspacesService";
import { GREEN_SPACES_COLORS } from "../../constants";
import { setActiveGreenSpace } from "../../redux/activeGreenSpaceSlice";

const GoogleMaps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const [map, setMap] = useState(null);
  const [greenSpaces, setGreenSpaces] = useState([]);
  const [visibleGreenSpaces, setVisibleGreenSpaces] = useState([]);
  const splitMapScreen = useSelector((state) => state.splitMapScreen);
  const mapZoomLevel = useSelector((state) => state.mapZoomLevel);
  const mapCenter = useSelector((state) => state.mapCenter);
  const greenSpacesSwitch = useSelector((state) => state.greenSpacesSwitch);
  const activeGreenSpace = useSelector((state) => state.activeGreenSpace);
  const dispatch = useDispatch();

  useEffect(() => {
    getNewGreenSpaces();
  }, []);

  useEffect(() => {
    setVisibleGreenSpaces(
      greenSpaces.filter((greenSpace) => greenSpacesSwitch[greenSpace.type])
    );
  }, [greenSpaces, greenSpacesSwitch]);

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

  const onGreenSpaceClick = (greenSpace) => {
    dispatch(setSplitMapScreen(true));
    dispatch(setActiveGreenSpace(greenSpace));
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
      <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <GreenSpacesSwitch />
      </div>
      {visibleGreenSpaces.map((greenSpace) => (
        <Polygon
          key={greenSpace.id}
          onClick={() => onGreenSpaceClick(greenSpace)}
          paths={greenSpace.geometry}
          options={{
            fillColor: GREEN_SPACES_COLORS[greenSpace.type],
          }}
        />
      ))}
      {activeGreenSpace && activeGreenSpace.details && (
        <Polyline
          path={activeGreenSpace.details.alleys.map((alley) => ({
            lat: alley.lat,
            lng: alley.lon,
          }))}
          options={{
            strokeColor: "red",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(GoogleMaps);
