import { FormControlLabel, List, ListItem, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { setGreenSpacesSwitch } from "../../redux/greenSpacesSwitchSlice";
import { GREEN_SPACES_COLORS } from "../../constants";

const GreenSpacesSwitch = () => {
  const greenSpacesSwitch = useSelector((state) => state.greenSpacesSwitch);
  const dispatch = useDispatch();

  const changeSwitch = (switchValue) => {
    dispatch(setGreenSpacesSwitch(switchValue));
  };

  return (
    <List sx={{ mt: "5px" }}>
      {Object.entries(GREEN_SPACES_COLORS).map(([switchValue, color]) => (
        <ListItem key={switchValue} sx={{ p: 0 }}>
          <FormControlLabel
            control={
              <Switch
                sx={{
                  "& .MuiSwitch-track": {
                    backgroundColor: color,
                  },
                  "& .MuiSwitch-thumb": {
                    color,
                  },
                }}
                checked={greenSpacesSwitch[switchValue]}
              />
            }
            label={switchValue}
            onChange={() => changeSwitch(switchValue)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default GreenSpacesSwitch;
