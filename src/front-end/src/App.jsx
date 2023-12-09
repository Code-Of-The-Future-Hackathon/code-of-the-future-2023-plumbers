import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Routes, Route } from "react-router-dom";

import AppBar from "./components/AppDrawer/AppBar";
import DrawerHeader from "./components/AppDrawer/DrawerHeader";
import DrawerList from "./components/AppDrawer/DrawerList";
import CustomDrawer from "./components/AppDrawer/CustomDrawer";
import Map from "./pages/Map/Map";
import Home from "./pages/Home/Home";
import Analysis from "./pages/Analysis/Analysis";
import GreenSpaces from "./pages/GreenSpaces/GreenSpaces";
import TreePlanter from "./pages/TreePlanter/TreePlanter";
import Finance from "./pages/Finance/Finance";
import Loader from "./components/Loader";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar isDrawerOpen={isDrawerOpen} handleDrawerOpen={handleDrawerOpen} />
      <CustomDrawer variant="permanent" isDrawerOpen={isDrawerOpen}>
        <DrawerHeader handleDrawerClose={handleDrawerClose} />
        <Divider />
        <DrawerList />
      </CustomDrawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/green-spaces" element={<GreenSpaces />} />
          <Route path="/tree-planter" element={<TreePlanter />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
      </Box>
      <Loader />
    </Box>
  );
};

export default App;
