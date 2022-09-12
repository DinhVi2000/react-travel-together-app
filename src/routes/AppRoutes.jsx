import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Route, Routes } from "react-router-dom";
import Slider from "../components/slide/Slider";
import Login from "../pages/authentication/Login";
import Home from "../pages/home/Home";
import ViewInMap from "../pages/map/ViewInMap";
import UserDetail from "../pages/user/UserDetail";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<ViewInMap />} />
        <Route path="/test" element={<Slider />} />
        <Route path="/user/:userId" element={<UserDetail />} />
      </Route>
      <Route path="signin" element={<PublicRoutes />}>
        <Route path="/signin" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
