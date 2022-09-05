import React from "react";

import "../blog/blogitem.scss";
import SkeletonLoading from "./SkeletonLoading";

const BlogItemSkeletonLoading = ({ user }) => {
  return (
    <div className="blogItem mb-[10px]">
      <div className="info">
        <div className="info__simp mb-1">
          <div className="flex">
            <SkeletonLoading className={"w-10 h-10 rounded-full mr-2"} />
            <div>
              <SkeletonLoading className={"w-[200px] h-3 rounded-md mb-2"} />
              <SkeletonLoading className={"w-[150px] h-3 rounded-md"} />
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <SkeletonLoading className={"w-full h-[400px]"} />
      </div>
      <div className="interactive">
        <SkeletonLoading className={"w-[60%] h-3 rounded-md mt-4"} />
        <SkeletonLoading className={"w-[20%] h-3 rounded-md mt-3"} />
      </div>
    </div>
  );
};

export default BlogItemSkeletonLoading;
