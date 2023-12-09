import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useNavigate } from "react-router-dom";

const SCREENS = [
  {
    name: "Home",
    url: "/",
    icon: <InboxIcon />,
  },
  {
    name: "Map",
    url: "/map",
    icon: <InboxIcon />,
  },
  {
    name: "Analysis",
    url: "/analysis",
    icon: <InboxIcon />,
  },
  {
    name: "Green Spaces",
    url: "/green-spaces",
    icon: <InboxIcon />,
  },
  {
    name: "Tree Planter",
    url: "/tree-planter",
    icon: <InboxIcon />,
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
