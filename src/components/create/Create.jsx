import React from "react";
import { useSelector } from "react-redux";

import "./create.scss";

import defaultAvatar from "../../assets/images/default-avatar.jpg";

const Create = ({ togglePopup }) => {
  const user = useSelector((state) => state.loginReducer.user) || {};

  return (
    <div className="create">
      <div className="create__first">
        <div className="avatar">
          <img src={user.avatar || defaultAvatar} alt="" />
        </div>
        <div className="content">
          <input
            type="text"
            placeholder="What do you think?"
            onFocus={() => {
              togglePopup();
            }}
          />
        </div>
      </div>
      <div className="create__second">
        <div className="item">
          <i className="bx bxs-video-plus"></i>
          <span className="text-sm">Video trực tiếp</span>
        </div>
        <div className="item">
          <i className="bx bx-images"></i>
          <span className="text-sm">Ảnh/Video</span>
        </div>
        <div className="item">
          <i className="bx bx-smile"></i>
          <span className="text-xs">Cảm xúc/Hoạt động</span>
        </div>
      </div>
    </div>
  );
};

export default Create;
