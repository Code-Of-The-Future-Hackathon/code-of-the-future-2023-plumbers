import { Chip, Stack, Typography } from "@mui/material";

import { GREEN_SPACES_COLORS } from "../../constants";

const GreenSpacesTypes = ({ selectedTypes, setSelectedTypes }) => {
  const onSelectType = (type) => {
    let result = true;

    if (selectedTypes[type]) {
      result = false;
    }

    setSelectedTypes((state) => ({ ...state, [type]: result }));
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ p: "8px 16px", border: "1px solid lightgray", borderRadius: "5px" }}
    >
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
  );
};

export default GreenSpacesTypes;
