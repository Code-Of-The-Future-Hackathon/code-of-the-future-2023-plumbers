import React from "react";
import { Box, Stack } from "@mui/material";
import GreenPlacesCarousel from "./GreenPlacesCarousel";
import GreenStatsCards from "./GreenStatsCards";

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <GreenPlacesCarousel />
      <Stack direction={"row"} marginTop={"5%"}>
        <GreenStatsCards
          sumValue={69895}
          value={15632}
          chartLabel={"Concrete area sq/m"}
          count={4398}
          element={"Benches"}
          secondLabel={"Grass sq/m"}
        ></GreenStatsCards>
        <GreenStatsCards
          sumValue={30765}
          value={8765}
          chartLabel={"Trees sq/m"}
          count={674}
          element={"Water Fontains"}
          secondLabel={"Shrubs sq/m"}
        ></GreenStatsCards>
        <GreenStatsCards
          sumValue={160}
          value={74}
          chartLabel={"Playgrounds"}
          count={21}
          element={"Dog Parks"}
          secondLabel={"Water fountains"}
        ></GreenStatsCards>
      </Stack>
    </Box>
  );
};

export default Home;
