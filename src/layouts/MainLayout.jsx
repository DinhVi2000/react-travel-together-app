import React from "react";
import Navbar from "../components/navbar/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
