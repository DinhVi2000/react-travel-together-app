import React, { useState } from "react";
import moment from "moment";

import "./blogitem.scss";

import defaultAvatar from "../../assets/images/default-avatar.jpg";
import axios from "axios";
import { BLOG } from "../../constants/paths";
import Comments from "./Comment";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import Dropdown from "../dropdown/Dropdown";
import Comment from "./Comment";
import { comment } from "postcss";
import blogApi from "../../api/blogApi";
import { dateSortDesc } from "../../Method";
import userApi from "../../api/userApi";
import { Fragment } from "react";

const BlogItem = ({ user }) => {
  const { fullName, avatar, id } = user;
  const { images, content, createdDate, location, likedUsers, comments } =
    user.blog;
  const swiper = useSwiper();

  const currentUser = useSelector((state) => state.loginReducer.user);

  const checkCurrentUserLiked = () => {
    let liked = false;
    const userCheck = likedUsers.find((user) => user.id === currentUser.id);
    userCheck ? (liked = true) : (liked = false);
    return liked;
  };

  const [liked, setLiked] = useState(checkCurrentUserLiked());
  const [likedUserArray, setLikedUserArray] = useState(likedUsers);

  const [isOpenComments, setIsOpenComments] = useState(false);
  const [commentsInBlog, setCommentsInBlog] = useState(comments || []);
  const [commentContent, setCommentContent] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);
  const [isFollower, setIsFollower] = useState(false);

  const toggleLike = async () => {
    setLiked(!liked);
    const newLikedUser = [...likedUserArray];
    try {
      const data = await blogApi.toggleLike({
        blogId: user.blog.id,
        userIdOfBlog: id,
      });
      if (data) {
        if (liked) {
          const likedUserRemoved = newLikedUser.filter(
            (user) => user.id !== currentUser.id
          );
          setLikedUserArray(likedUserRemoved);
        } else {
          newLikedUser.push(currentUser);
          setLikedUserArray(newLikedUser);
        }
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const res = await axios.delete(BLOG.CREATE_BLOG, { params: { blogId } });
    } catch (error) {}
  };

  const handleAddFollow = async () => {
    const data = await userApi.addFollow({ userId: id });
    if (data) {
      setIsFollower(true);
    }
  };

  const handlePostComment = async () => {
    setLoadingComment(true);
    const data = await blogApi.postComnment(
      {
        content: commentContent,
        userIdComment: currentUser.id,
        userAvt: currentUser.avatar,
        fullName: currentUser.fullName,
        isLocalGuide: currentUser.isLocalGuide,
      },
      { blogId: user.blog.id, userIdOfBlog: id }
    );
    if (data) {
      setCommentsInBlog([...commentsInBlog, data]);
      setCommentContent("");
    }
    setLoadingComment(false);
  };

  return (
    <div className="blogItem">
      <div className="info">
        <div className="info__simp mb-1">
          <div className="flex">
            <img src={avatar || defaultAvatar} alt="" />
            <div>
              <NavLink to={`/user/${id}`} className="font-bold">
                {fullName || "Anonymous"}
              </NavLink>
              <span className="font-normal text-sm">
                <i className="bx bxs-map text-red-500 mr-1 text-base"></i>
                {location || ""}
              </span>
              <span> · </span>
              <span className="text-sm text-gray-500">
                {moment.utc(createdDate).local().startOf("seconds").fromNow()}
              </span>
            </div>
          </div>
          <div className="cursor-pointer flex items-center  followItem">
            {id === currentUser.id ? (
              <Dropdown
                clickElement={
                  <button>
                    <i className="bx bx-dots-horizontal-rounded text-xl"></i>
                  </button>
                }
                contentElement={
                  <div className="bg-white p-1">
                    <div
                      className="flex items-center gap-2 action p-2 w-60"
                      onClick={() => {
                        deleteBlog(user.blog.id);
                      }}
                    >
                      <i className="bx bxs-trash text-xl"></i>
                      <span>Xóa bài viết</span>
                    </div>
                  </div>
                }
              />
            ) : (
              <Fragment>
                {!isFollower ? (
                  <button className="min-w-[100px]" onClick={handleAddFollow}>
                    <i className="bx bx-plus-medical mr-1"></i>
                    <span>Theo dõi</span>
                  </button>
                ) : null}
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <div className="content relative">
        {images.length > 1 && (
          <div className="flex justify-between absolute w-full top-[48%] px-3 z-10">
            <button>
              <i className="bx bx-chevron-left bg-white rounded-full text-xl cursor-pointer text-gray-500 "></i>
            </button>
            <button onClick={() => swiper.slideNext()}>
              <i className="bx bx-chevron-right bg-white rounded-full text-xl cursor-pointer text-gray-500"></i>
            </button>
          </div>
        )}
        {images && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt="" className="object-cover h-[550px]" />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="interactive">
        <p className="text-sm font-normal py-4">{content || ""}</p>
        <div className="flex justify-between min-h-[40px] pb-[10px] border border-r-0 border-l-0 border-b-1 border-t-0">
          <div className="flex items-center">
            {/* <i className="bx bxs-like bg-blue-500 text-white text-sm p-1 rounded-full mr-1"></i> */}
            <div>
              <span className="text-gray-500 text-sm mr-2">
                {likedUserArray.length} Thích
              </span>
            </div>
            <button className="flex action p-1">
              {likedUserArray &&
                likedUserArray.map((user, index) => (
                  <img
                    key={index}
                    className="w-5 h-5 relative object-cover rounded-full border border-white"
                    src={user.avatar || defaultAvatar}
                    alt=""
                  />
                ))}
            </button>
          </div>
          <span
            className="text-gray-500 text-sm cursor-pointer hover:underline decoration-1"
            onClick={() => {
              setIsOpenComments(!isOpenComments);
            }}
          >
            {comments.length} Bình luận
          </span>
        </div>
        <div className="flex justify-between pt-2 ">
          <div>
            <button
              className="cursor-pointer m-2 action px-2 py-1 text-gray-600"
              onClick={toggleLike}
            >
              <div className="">
                {liked ? (
                  <i className="bx bxs-heart text-2xl text-red-500"></i>
                ) : (
                  <i className="bx bx-heart text-2xl"></i>
                )}
              </div>
              <span className="text-sm">Thích</span>
            </button>
            <button
              className="cursor-pointer m-2 action px-2  py-1 text-gray-600"
              onClick={() => {
                setIsOpenComments(!isOpenComments);
              }}
            >
              <div>
                <i className="bx bx-message-alt-dots text-2xl"></i>
              </div>
              <span className="text-sm">Bình luận</span>
            </button>
          </div>
          <div className="cursor-pointer m-2 action px-2  py-1 text-gray-600">
            <button>
              <div>
                <i className="bx bx-share block text-2xl"></i>
              </div>
              <span className="text-sm">Chia sẻ</span>
            </button>
          </div>
        </div>
        {isOpenComments ? (
          <div className="comments pt-4 border-t-[1px] border-gray-200">
            <div className="flex items-center mb-3">
              <img
                className="w-9 h-9 object-cover rounded-full mr-2"
                src={currentUser.avatar || defaultAvatar}
                alt=""
              />
              <input
                type="text"
                placeholder="Viết bình luận..."
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
                onClick={handlePostComment}
              >
                Đăng
              </button>
              {/* <div className="searchBar-container w-full">
                <div className="searchInNav">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Viết bình luận..."
                      className="w-full "
                    />
                  </div>
                </div>
              </div> */}
            </div>
            {commentsInBlog?.length > 0 &&
              dateSortDesc(commentsInBlog).map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))}
            {/* <Comment /> */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BlogItem;