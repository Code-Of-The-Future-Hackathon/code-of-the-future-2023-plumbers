import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import store from "./redux/store";
import AppDrawer from "./components/AppDrawer/AppDrawer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/map",
    element: <Map />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppDrawer>
        <RouterProvider router={router} />
      </AppDrawer>
    </Provider>
  </React.StrictMode>
);
