import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { USER } from "../constants/paths";
import { setUserData } from "../redux/auth/login.actions";

const getCurrentUser = async () => {
  try {
    const res = await axios.get(USER.GET_CURRENT_USER);
    if (res.data && res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    console.error("error :", error);
    return null;
  }
};

const ProtectedRoutes = (props) => {
  const dispatch = useDispatch();

  const useAuth = async () => {
    const user = await getCurrentUser();
    dispatch(setUserData(user));
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {}, []);

  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default ProtectedRoutes;
