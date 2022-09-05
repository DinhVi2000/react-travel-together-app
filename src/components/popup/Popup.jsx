import React from "react";

import "./popup.scss";

const Popup = ({ content, handleClose }) => {
  return (
    <div className="popup-box">
      <div className="box">
        <i
          className="bx bx-x text-3xl cursor-pointer bg-gray-200 rounded-full absolute right-2 top-4 z-10"
          onClick={handleClose}
        ></i>
        {content}
      </div>
    </div>
  );
};

export default Popup;
