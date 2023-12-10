import { IconButton, TableCell, TableRow } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { setMapCenter } from "../../redux/mapCenterSlice";
import { setIsLoading } from "../../redux/isLoadingSlice";
import { setSplitMapScreen } from "../../redux/splitMapScreenSlice";
import { setActiveGreenSpace } from "../../redux/activeGreenSpaceSlice";
import { setZoomLevel } from "../../redux/mapZoomLevelSlice";

const GreenspacesRow = ({ record }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onZoneIconClick = async () => {
    dispatch(setIsLoading(true));

    const center = {
      lat: record.geometry[0].lat,
      lng: record.geometry[0].lon,
    };

    const zonePointsBody = record.geometry.map((point) => ({
      Lat: point.lat,
      Lng: point.lng,
    }));

    try {
      const response = await fetch(
        `https://europe-west1-bins-to-owners-332bc.cloudfunctions.net/getZoneCenter`,
        {
          method: "POST",
          body: JSON.stringify({
            ZonePoints: zonePointsBody,
          }),
        }
      );

      const resultCenter = await response.json();

      if (resultCenter) {
        center.lat = resultCenter.Lat;
        center.lng = resultCenter.Lng;
      }

      dispatch(setMapCenter(center));
      dispatch(setZoomLevel(20));
      dispatch(setSplitMapScreen(true));
      dispatch(setActiveGreenSpace(record));
      navigate("/map");
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: "#e3f2fd",
        },
      }}
    >
      <TableCell>{record.name || "-"}</TableCell>
      <TableCell>{record?.zone?.area?.toFixed(3) || "-"}</TableCell>
      <TableCell>{record.type || "-"}</TableCell>
      <TableCell>
        <IconButton onClick={onZoneIconClick}>
          <Visibility />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default GreenspacesRow;
