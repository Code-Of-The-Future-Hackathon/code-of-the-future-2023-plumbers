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
                height="200px"
              >
                <Typography variant="h6" gutterBottom textAlign="center">
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
                <Typography variant="h5">{element}</Typography>
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
