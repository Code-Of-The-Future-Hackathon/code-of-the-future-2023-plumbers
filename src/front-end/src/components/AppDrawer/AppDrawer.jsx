import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Routes, Route } from "react-router-dom";

import AppBar from "./AppBar";
import DrawerHeader from "./DrawerHeader";
import DrawerList from "./DrawerList";
import CustomDrawer from "./CustomDrawer";
import Map from "../../pages/Map/Map";
import Home from "../../pages/Home/Home";
import Analysis from "../../pages/Analysis/Analysis";
import GreenSpaces from "../../pages/GreenSpaces/GreenSpaces";
import TreePlanter from "../../pages/TreePlanter/TreePlanter";

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/green-spaces" element={<GreenSpaces />} />
          <Route path="/tree-planter" element={<TreePlanter />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AppDrawer;
