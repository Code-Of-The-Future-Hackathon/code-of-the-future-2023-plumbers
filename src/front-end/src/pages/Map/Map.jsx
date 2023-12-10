import React, { useState, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  Typography,
  Divider,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, Edit } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import GoogleMaps from "./GoogleMaps";
import { setSplitMapScreen } from "../../redux/splitMapScreenSlice";
import { setActiveGreenSpace } from "../../redux/activeGreenSpaceSlice";
import { updateGreenSpaceName } from "../../services/greenspacesService";

const Map = () => {
  const splitMapScreen = useSelector((state) => state.splitMapScreen);
  const activeGreenSpace = useSelector((state) => state.activeGreenSpace);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!activeGreenSpace) return;
    setName(activeGreenSpace.name);
  }, [activeGreenSpace]);

  const onBackButtonClick = () => {
    dispatch(setSplitMapScreen(false));
    dispatch(setActiveGreenSpace(null));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNameUpdate = async () => {
    if (activeGreenSpace && name !== activeGreenSpace.name) {
      console.log(activeGreenSpace.type, activeGreenSpace.id);
      await updateGreenSpaceName(
        name,
        activeGreenSpace.type,
        activeGreenSpace.id
      );
      dispatch(setActiveGreenSpace({ ...activeGreenSpace, name }));
      setIsEditing(false);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <GoogleMaps />
      {splitMapScreen && activeGreenSpace && (
        <Stack spacing={3} sx={{ p: 3 }} width={"50%"}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Typography variant="h6">
              Name of greenspace:
              {isEditing ? (
                <TextField
                  value={name || "empty"}
                  onChange={handleNameChange}
                  onBlur={handleNameUpdate}
                />
              ) : (
                <>
                  <strong>{name || "няма"}</strong>
                  {!name && (
                    <IconButton onClick={handleEditClick}>
                      <EditIcon />
                    </IconButton>
                  )}
                </>
              )}
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBackIos />}
              color="error"
              onClick={onBackButtonClick}
            >
              Back
            </Button>
          </Stack>
          <Divider />
          <Typography variant="h6">
            Type of greenspace:{" "}
            <strong>{activeGreenSpace.type || "няма"}</strong>
          </Typography>
        </Stack>
      )}
    </div>
  );
};

export default memo(Map);
