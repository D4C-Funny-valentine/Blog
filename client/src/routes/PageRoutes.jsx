import React from "react";
import { Route, Routes } from "react-router-dom";

import routesData from "./data.jsx";
const PageRoutes = () => {
  return (
    <Routes>
      {routesData.map((route) => (
        <Route key={route.name} element={route.element} path={route.path} />
      ))}
    </Routes>
  );
};

export default PageRoutes;
