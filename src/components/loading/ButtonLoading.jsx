import React from "react";

const ButtonLoading = ({ color = "white" }) => {
  return (
    <div
      className={` w-5 h-5 border-2 border-${color} border-t-transparent animate-spin rounded-full mx-auto`}
    ></div>
  );
};

export default ButtonLoading;
