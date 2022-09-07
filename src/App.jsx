import axios from "axios";
import React from "react";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  return <AppRoutes />;
}

export default App;
