import moment from "moment";
import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className="flex gap-2 mb-3">
      <img
        src={comment.userAvt || ""}
        className="w-8 h-8 rounded-full "
        alt=""
      />
      <div className="">
        <div>
          <span className="mr-1">
            <span className="text-sm font-semibold mb-1">
              {comment.fullName || ""}
            </span>
            {comment.localGuide ? (
              <span>
                <i className="bx bxs-check-circle text-sm text-blue-500 mx-1 "></i>
              </span>
            ) : null}
          </span>
          <span className="text-sm">{comment.content || ""}</span>
        </div>
        <p className="text-xs text-gray-500">
          {moment.utc(comment.createdDate).local().startOf("seconds").fromNow()}
        </p>
      </div>
    </div>
  );
};

export default Comment;
