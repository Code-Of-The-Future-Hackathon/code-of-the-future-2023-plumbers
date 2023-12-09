import { FormControlLabel, List, ListItem, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { setGreenSpacesSwitch } from "../../redux/greenSpacesSwitchSlice";

const switchValuesData = ["garden", "grass", "grassland", "park", "scrub"];

const GreenSpacesSwitch = () => {
  const greenSpacesSwitch = useSelector((state) => state.greenSpacesSwitch);
  const dispatch = useDispatch();

  const changeSwitch = (switchValue) =>
    dispatch(setGreenSpacesSwitch(switchValue));

  return (
    <List sx={{ mt: "5px" }}>
      {switchValuesData.map((switchValue) => (
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
