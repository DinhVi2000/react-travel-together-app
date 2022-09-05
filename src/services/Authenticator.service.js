import axios from "axios";
import { useNavigate } from "react-router-dom";

export const setTokenAuthenticator = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};
