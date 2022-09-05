import React from "react";

const ErrorNotitfy = ({ content }) => {
  return (
    <div className="px-3 py-4 mx-2 mb-2  border-l-2 border-red-500 flex items-center gap-3 rounded-sm box-shadow-main">
      <i className="bx bx-error-circle text-red-500 text-xl"></i>
      <span className="text-sm">{content}</span>
    </div>
  );
};

export default ErrorNotitfy;
