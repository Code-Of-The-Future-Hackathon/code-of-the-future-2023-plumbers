import { Chip, Stack, Typography } from "@mui/material";

import { GREEN_SPACES_COLORS, GREEN_SPACES_SIZES } from "../../constants";

const GreenSpacesTypes = ({
  selectedTypes,
  setSelectedTypes,
  selectedSizes,
  setSelectedSizes,
}) => {
  const onSelectType = (type) => {
    let result = true;

    if (selectedTypes[type]) {
      result = false;
    }

    setSelectedTypes((state) => ({ ...state, [type]: result }));
  };

  const onSelectSize = (size) => {
    let result = true;

    if (selectedSizes[size]) {
      result = false;
    }

    setSelectedSizes((state) => ({ ...state, [size]: result }));
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        p: "8px 16px",
        border: "1px solid lightgray",
        borderRadius: "5px",
        width: "85%",
      }}
      justifyContent={"space-between"}
    >
      <Stack direction="row" spacing={2}>
        <Typography variant="h6">Types:</Typography>
        {Object.keys(GREEN_SPACES_COLORS).map((type, index) => {
          return (
            <Chip
              key={index}
              label={type}
              variant={selectedTypes[type] ? "" : "outlined"}
              onClick={() => onSelectType(type)}
            />
          );
        })}
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="h6">Sizes:</Typography>
        {Object.keys(GREEN_SPACES_SIZES).map((size, index) => {
          return (
            <Chip
              key={index}
              label={size}
              variant={selectedSizes[size] ? "" : "outlined"}
              onClick={() => onSelectSize(size)}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default GreenSpacesTypes;
