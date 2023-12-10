import React, { useState, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  Typography,
  Divider,
  Button,
  TextField,
  IconButton,
  Checkbox,
} from "@mui/material";
import { ArrowBackIos, Edit } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import GoogleMaps from "./GoogleMaps";
import { setSplitMapScreen } from "../../redux/splitMapScreenSlice";
import { setActiveGreenSpace } from "../../redux/activeGreenSpaceSlice";
import { updateGreenSpaceName } from "../../services/greenspacesService";

const icons = [
  "alley-icon.png",
  "bench.png",
  "dog-park.png",
  "fountain-icon.png",
  "garden.png",
  "park-icon.png",
  "pruning-and-trimming.png",
  "street-lamp.png",
  "tree.png",
  "watering-plants.png",
  "weed-removal.png",
];

const Map = () => {
  const splitMapScreen = useSelector((state) => state.splitMapScreen);
  const activeGreenSpace = useSelector((state) => state.activeGreenSpace);
  const dispatch = useDispatch();
  console.log(activeGreenSpace);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [selectedActions, setSelectedActions] = useState({});

  const handleCheckboxChange = (iconName) => {
    setSelectedActions((prevState) => ({
      ...prevState,
      [iconName]: !prevState[iconName],
    }));
  };
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
          <Divider />
          <Typography variant="h6">Actions in Greenspace:</Typography>
          <Stack spacing={2}>
            {icons.map((icon) => (
              <Stack
                key={icon}
                direction="row"
                alignItems="center"
                spacing={1}
                width={"200px"}
                justifyContent={"space-between"}
              >
                <img
                  src={`/icons/${icon}`}
                  alt={icon}
                  style={{ width: "24px", height: "24px" }}
                />
                <Typography>
                  {icon.replace(/[-_\.]/g, " ").replace(/\.\w+$/, "")}
                </Typography>
                <Checkbox
                  checked={selectedActions[icon] || false}
                  onChange={() => handleCheckboxChange(icon)}
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </div>
  );
};

export default memo(Map);
