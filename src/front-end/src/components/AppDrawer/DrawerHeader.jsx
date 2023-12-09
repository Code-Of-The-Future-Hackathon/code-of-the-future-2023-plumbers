import { useTheme } from "@emotion/react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CustomDrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerHeader = ({ handleDrawerClose }) => {
  const theme = useTheme();

  return (
    <CustomDrawerHeader>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </CustomDrawerHeader>
  );
};

export default DrawerHeader;
