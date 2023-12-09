import { FormControlLabel, List, ListItem, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { setGreenSpacesSwitch } from "../../redux/greenSpacesSwitchSlice";
import { GREEN_SPACES_TYPES } from "../../constants";

const GreenSpacesSwitch = () => {
  const greenSpacesSwitch = useSelector((state) => state.greenSpacesSwitch);
  const dispatch = useDispatch();

  const changeSwitch = (switchValue) =>
    dispatch(setGreenSpacesSwitch(switchValue));

  return (
    <List sx={{ mt: "5px" }}>
      {GREEN_SPACES_TYPES.map((switchValue) => (
        <ListItem key={switchValue} sx={{ p: 0 }}>
          <FormControlLabel
            control={<Switch checked={greenSpacesSwitch[switchValue]} />}
            label={switchValue}
            onChange={() => changeSwitch(switchValue)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default GreenSpacesSwitch;
