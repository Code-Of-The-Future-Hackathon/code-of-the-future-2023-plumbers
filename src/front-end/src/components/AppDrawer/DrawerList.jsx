import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import {
  FormatShapes,
  Home,
  Leaderboard,
  Map,
  Paid,
  Park,
} from "@mui/icons-material";

const SCREENS = [
  {
    name: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    name: "Map",
    url: "/map",
    icon: <Map />,
  },
  {
    name: "Analysis",
    url: "/analysis",
    icon: <Leaderboard />,
  },
  {
    name: "Green Spaces",
    url: "/green-spaces",
    icon: <FormatShapes />,
  },
  {
    name: "Tree Planter",
    url: "/tree-planter",
    icon: <Park />,
  },
  {
    name: "Finance",
    url: "/finance",
    icon: <Paid />,
  },
];

const DrawerList = () => {
  const navigate = useNavigate();

  const onDrawerListItemClick = (screenUrl) => {
    navigate(screenUrl);
  };

  return (
    <List>
      {SCREENS.map((screen) => (
        <ListItem
          key={screen.url}
          disablePadding
          sx={{ display: "block" }}
          onClick={() => onDrawerListItemClick(screen.url)}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {screen.icon}
            </ListItemIcon>
            <ListItemText
              primary={screen.name}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default DrawerList;
