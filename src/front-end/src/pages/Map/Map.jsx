import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Typography, Divider, Button } from "@mui/material";

import GoogleMaps from "./GoogleMaps";
import { ArrowBackIos } from "@mui/icons-material";
import { setSplitMapScreen } from "../../redux/splitMapScreenSlice";
import { setActiveGreenSpace } from "../../redux/activeGreenSpaceSlice";

const Map = () => {
  const splitMapScreen = useSelector((state) => state.splitMapScreen);
  const activeGreenSpace = useSelector((state) => state.activeGreenSpace);
  const dispatch = useDispatch();

  const onBackButtonClick = () => {
    dispatch(setSplitMapScreen(false));
    dispatch(setActiveGreenSpace(null));
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
              Име: <strong>{activeGreenSpace.name || "няма"}</strong>
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBackIos />}
              color="error"
              onClick={onBackButtonClick}
            >
              Назад
            </Button>
          </Stack>
          <Divider />
          <Typography variant="h6">
            Тип: <strong>{activeGreenSpace.type || "няма"}</strong>
          </Typography>
        </Stack>
      )}
    </div>
  );
};

export default memo(Map);
