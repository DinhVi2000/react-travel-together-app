import axios from "axios";
import React, { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  console.log("app");

  useEffect(() => {
    return () => {};
  }, []);

  return <AppRoutes />;
}

export default App;
