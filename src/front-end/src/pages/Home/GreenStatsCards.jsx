import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import PieChartSmall from "../../components/Charts/homePageChart";

const GreenStatsCards = ({
  chartLabel,
  element,
  count,
  value,
  sumValue,
  secondLabel,
}) => {
  const customIcon =
    element === "Benches"
      ? "icons/bench.png"
      : element === "Water Fontains"
      ? "/icons/fontain-icon.png"
      : element === "Dog Parks"
      ? "/icons/dog-park.png"
      : "icons/park-icon.png";
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                width="50%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="250px"
              >
                <Typography variant="h7" textAlign="center">
                  {chartLabel + "/" + secondLabel}
                </Typography>
                <PieChartSmall
                  value={value}
                  valueName={chartLabel}
                  sumValue={sumValue}
                  secondLabel={secondLabel}
                />
              </Box>
              <Box
                width="50%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={customIcon}
                  alt="Icon"
                  style={{ marginRight: "5px", width: "64px" }}
                />
                <Typography variant="h5" alignItems={"center"}>
                  {element}
                </Typography>
                <Typography variant="h4" color="primary">
                  {count}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GreenStatsCards;
