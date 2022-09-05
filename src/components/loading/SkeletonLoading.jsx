import React from "react";

import "./skeletonloading.scss";

const SkeletonLoading = ({ className }) => {
  return <div className={`${className} is-loading`}></div>;
};

export default SkeletonLoading;
