import React, { useEffect, useRef } from "react";

import "./dropdown.scss";

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

const Dropdown = ({ clickElement, contentElement }) => {
  const dropdown_toggle_el = useRef(null);
  const dropdown_content_el = useRef(null);

  useEffect(() => {
    clickOutsideRef(dropdown_content_el, dropdown_toggle_el);
  }, []);

  return (
    <div className="container-notification">
      <div ref={dropdown_toggle_el} className="container-notification-toggle">
        {clickElement}
      </div>
      <div
        ref={dropdown_content_el}
        className="container-notification-content mr-4 rounded-md"
      >
        {contentElement}
      </div>
    </div>
  );
};

export default Dropdown;
