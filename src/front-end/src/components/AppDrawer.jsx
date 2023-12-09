import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";

import AppBar from "./AppBar";
import DrawerHeader from "./DrawerHeader";
import DrawerList from "./DrawerList";
import CustomDrawer from "./CustomDrawer";

const AppDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <CustomDrawer variant="permanent" open={open}>
        <DrawerHeader handleDrawerClose={handleDrawerClose} />
        <Divider />
        <DrawerList />
      </CustomDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
};

export default AppDrawer;
