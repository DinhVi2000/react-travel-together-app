import moment from "moment";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import blogApi from "../../api/blogApi";
import { dateSortDesc } from "../../Method";
import Comment from "./Comment";

const BlogDetail = ({ user, blog, setUser }) => {
  const currentUser = useSelector((state) => state.loginReducer.user);

  const { id, avatar, fullName, localGuide } = user;
  const { images, content, likedUsers, createdDate, comments } = blog;

  const [commentContent, setCommentContent] = useState("");
  const [commentsInBlog, setCommentsInBlog] = useState(comments || []);
  const [loadingComment, setLoadingComment] = useState(false);

  const handlePostComnment = async () => {
    setLoadingComment(true);
    const data = await blogApi.postComnment(
      {
        content: commentContent,
        userIdComment: currentUser.id,
        userAvt: currentUser.avatar,
        fullName: currentUser.fullName,
        isLocalGuide: currentUser.isLocalGuide,
      },
      { blogId: blog.id, userIdOfBlog: id }
    );
    if (data) {
      setCommentsInBlog([...commentsInBlog, data]);
      setCommentContent("");

      const blogIndex = user.blogs.findIndex((item) => item.id === blog.id);
      const newBlogs = user.blogs;
      newBlogs[blogIndex].comments.push(data);
      setUser({ ...user, blogs: newBlogs });
    }
    setLoadingComment(false);
  };

  return (
    <div className="flex relative max-h-[800px] max-w-[1120px]">
      <div className=" w-[60%] max-h-[720px] bg-black py-5 flex items-center">
        <img
          src={images[0] || ""}
          alt=""
          className="w-full object-contain h-full"
        />
      </div>
      <div className="w-[40%] min-w-[448px] flex flex-col justify-between">
        <div>
          <div className="header flex items-center gap-2 p-4 border-b-[1px] border-gray-300 ">
            <img src={avatar || ""} className="w-8 h-8 rounded-full " alt="" />
            <span className="text-sm font-semibold ">{fullName || ""}</span>
          </div>
          <div className="body p-4 h-[540px]  overflow-x-hidden text-sm">
            <div className="flex gap-2 ">
              <img
                src={avatar || ""}
                className="w-8 h-8 rounded-full "
                alt=""
              />
              <div>
                <div className="mr-2">
                  <span className="text-sm font-semibold mb-1">
                    {fullName || ""}
                  </span>
                  {localGuide ? (
                    <span>
                      <i className="bx bxs-check-circle text-sm text-blue-500 mx-1 "></i>
                    </span>
                  ) : null}
                </div>
                <span className="text-sm">{content || ""}</span>
              </div>
            </div>
            <div className="py-3">
              {commentsInBlog?.length > 0 &&
                dateSortDesc(commentsInBlog, "createdDate").map(
                  (comment, index) => <Comment comment={comment} key={index} />
                )}
            </div>
          </div>
        </div>
        <div>
          <div className="footer px-2 border-t-[1px] border-b-[1px]">
            <div className="flex justify-between pt-2 bottom-0">
              <div>
                <button className="cursor-pointer action px-2 pt-2 text-gray-600">
                  <div className="">
                    <i className="bx bx-heart text-2xl"></i>
                  </div>
                </button>
                <button className="cursor-pointer  action px-2 pt-2 text-gray-600">
                  <div>
                    <i className="bx bx-message-alt-dots text-2xl"></i>
                  </div>
                </button>
              </div>
              <button className="cursor-pointer  action px-2 pt-2 text-gray-600">
                <div>
                  <i className="bx bx-share block text-2xl"></i>
                </div>
              </button>
            </div>
            <div className="px-2 pb-2 ">
              <span className="text-xs font-semibold">
                {likedUsers.length || 0} lượt thích
              </span>
              <span> · </span>
              <span className="text-xs text-gray-500">
                {moment.utc(createdDate).local().startOf("seconds").fromNow()}
              </span>
            </div>
          </div>
          <div className="px-4 py-2 flex ">
            <input
              type="text"
              placeholder="Thêm bình luận..."
              className="outline-none w-full text-sm"
              value={commentContent}
              onChange={(e) => {
                setCommentContent(e.target.value);
              }}
            />
            <button
              className={`text-sm ${
                loadingComment ? "text-blue-400" : "text-blue-500"
              } font-semibold`}
              onClick={handlePostComnment}
            >
              Đăng
            </button>
          </div>
        </div>
      </div>
      {/* <div>
        <p className="text-sm pr-5">{content || ""}</p>
      </div> */}
    </div>
  );
};

export default BlogDetail;
