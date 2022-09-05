import React, { useEffect, useRef } from "react";
import "./navbar.scss";

import logo from "../../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import defaultAvatar from "../../assets/images/default-avatar.jpg";
import Dropdown from "../dropdown/Dropdown";

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener("mousedown", (e) => {
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle("active");
    } else {
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove("active");
      }
    }
  });
};

const Navbar = () => {
  let navigate = useNavigate();
  const user = useSelector((state) => state.loginReducer.user) || {};

  const dropdown_toggle_el = useRef(null);
  const dropdown_content_el = useRef(null);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  useEffect(() => {
    clickOutsideRef(dropdown_content_el, dropdown_toggle_el);
  }, []);

  return (
    <div className="navbar">
      <div className="container-fluid navContent">
        <div className="menuLogo">
          <div className="navItem">
            <a href="/">
              <img src={logo} alt="" />
              <h4>Travel together</h4>
            </a>
          </div>
        </div>
        <div className="nav-left">
          <div className="searchBar-container">
            <div className="searchInNav">
              <i className="bx bx-search"></i>
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <div className="homeItem">
            <div className="navItem">
              <NavLink to={"/"}>
                <i className="bx bxs-home"></i>
                {/* <i className="bx bxl-blogger"></i> */}
                <h4>Trang Chủ</h4>
              </NavLink>
            </div>
          </div>
          <div className="mapItem">
            <div className="navItem ">
              <NavLink to={"/map"} className="flex items-center gap-1">
                <i className="bx bx-map-alt text-lg"></i>
                <h4>Xem trên bản đồ</h4>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <Dropdown
            clickElement={
              <div className="navItem">
                <span>
                  <img
                    className="avatar"
                    src={user.avatar || defaultAvatar}
                    alt=""
                  />
                </span>
              </div>
            }
            contentElement={
              <div className="bg-white w-[360px] rounded-md p-2">
                <div className="p-2 flex items-center rounded-md hover:bg-slate-100">
                  <img
                    className="w-10 h-10 rounded-full object-cover mr-2"
                    src={user.avatar || defaultAvatar}
                    alt=""
                  />
                  <span>{user.fullName || ""}</span>
                </div>
                <div
                  className="p-2 flex items-center rounded-md hover:bg-slate-100"
                  onClick={logout}
                >
                  <i className="bx bx-log-out-circle text-2xl mr-2 bg-gray-300 p-2 rounded-full flex "></i>
                  <span>Đăng xuất</span>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
