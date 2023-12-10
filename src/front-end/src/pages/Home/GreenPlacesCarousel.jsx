import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box, Typography } from "@mui/material";

const items = [
  {
    name: "Gardens",
    description:
      "rban Gardens - A Haven of Serenity and Community Engagement. In our city gardens, you'll find over 200 species of plants and flowers, creating a vibrant tapestry of colors and scents. ",
    imgSrc: "/cover-images/garden.png",
  },
  {
    name: "Parks",
    description:
      "City Parks - More Than Just Green Spaces. Our parks in Burgas boast 323 benches, perfect for relaxing and enjoying the surroundings. There are 29 kilometers of well-maintained alleys, ideal for jogging, biking, or leisurely strolls",
    imgSrc: "/cover-images/park.png",
  },
  {
    name: "Nature Reserves",
    description:
      "Nature Reserves - Preserving Wildlife and Natural Beauty. Explore the unspoiled beauty of our nature reserves, covering over 500 hectares of diverse ecosystems",
    imgSrc: "/cover-images/nature-reserve.png",
  },
];

const GreenPlacesCarousel = () => {
  return (
    <Carousel>
      {items.map((item, i) => (
        <Paper key={i} style={{ position: "relative", height: "600px" }}>
          <img
            src={item.imgSrc}
            alt={item.name}
            style={{ width: "100%", objectFit: "cover" }}
          />
          <Box
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
            }}
          >
            <Typography variant="h6" style={{ padding: "10px" }}>
              {item.name}
            </Typography>
            <Typography style={{ padding: "10px" }}>
              {item.description}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Carousel>
  );
};

export default GreenPlacesCarousel;
