import React from "react";
import { Box, Stack } from "@mui/material";
import GreenPlacesCarousel from "./GreenPlacesCarousel";
import GreenStatsCards from "./GreenStatsCards";

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction={"row"}>
        <GreenStatsCards
          sumValue={30}
          value={10}
          chartLabel={"Concrete area"}
          count={100}
          element={"Dog Parks"}
          secondLabel={"Grass"}
        ></GreenStatsCards>
        <GreenStatsCards
          sumValue={30}
          value={10}
          chartLabel={"trees"}
          count={100}
          element={"Dog Parks"}
          secondLabel={"Shrubs"}
        ></GreenStatsCards>
        <GreenStatsCards
          sumValue={30}
          value={10}
          chartLabel={"Playgrounds"}
          count={100}
          element={"Dog Parks"}
          secondLabel={"Water fountains"}
        ></GreenStatsCards>
      </Stack>
      <GreenPlacesCarousel />
    </Box>
  );
};

export default Home;
