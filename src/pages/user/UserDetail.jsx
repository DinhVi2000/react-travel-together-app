import React, { Fragment, useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";

import { useParams } from "react-router-dom";
import axios from "axios";
import { USER } from "../../constants/paths";
import SkeletonLoading from "../../components/loading/SkeletonLoading";
import Popup from "../../components/popup/Popup";
import BlogDetail from "../../components/blog/BlogDetail";
import { useSelector } from "react-redux";
const UserDetail = () => {
  const currentUser = useSelector((state) => state.loginReducer.user);
  let { userId } = useParams();

  const [user, setUser] = useState({});

  const [hoverAt, setHoverAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [blogInPopup, setBlogInPopup] = useState({});
  const [isFollower, setIsFollower] = useState(null);
  // const [liked, setLiked] = useState(checkCurrentUserLiked());

  // const checkCurrentUserLiked = () => {
  //   let liked = false;
  //   const userCheck = likedUsers.find((user) => user.id === currentUser.id);
  //   userCheck ? (liked = true) : (liked = false);
  //   return liked;
  // };

  const togglePopup = (blog) => {
    setBlogInPopup(blog);
    setIsOpen(!isOpen);
  };

  const checkIsFollower = (userData) => {
    const check = userData.followedUsers.find(
      (follower) => follower.id === currentUser.id
    );
    if (check) {
      setIsFollower(true);
    } else {
      setIsFollower(false);
    }
  };

  const { avatar, fullName, followedUsers, followingUsers, blogs, bio } = user;

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(USER.GET_USER_BY_ID, {
        params: { userId: userId },
      });
      if (res && res.data && res.data.success) {
        setUser(res.data.data);
        // setLikedUserArray(res.data.data.likedUsers);
        checkIsFollower(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onMouseOver = (blogId) => {
    setHoverAt(blogId);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <MainLayout>
      <main className="pt-[84px] max-w-[935px] mx-auto">
        <div>
          <div className="px-5 py-8 flex border-b-[1px] border-gray-300 ">
            <div className="header flex  items-center justify-center grow mr-8 ">
              <div>
                {loading ? (
                  <SkeletonLoading
                    className={"w-[150px] h-[150px] rounded-full"}
                  />
                ) : (
                  <img
                    className="w-[150px] h-[150px] rounded-full object-cover "
                    src={avatar || ""}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="grow-[2]">
              <div className="flex mb-4">
                {loading ? (
                  <SkeletonLoading className={"w-[400px] h-5"} />
                ) : (
                  <>
                    <h2 className="text-2xl mr-4">{fullName || ""}</h2>
                    <div className="flex gap-x-2">
                      <button className=" px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-slate-50">
                        <i className="bx bx-chat text-xl mr-1"></i>
                        <span className="text-sm ">Nhắn tin</span>
                      </button>
                      {isFollower ? (
                        <button className="px-4 border border-gray-300 rounded-md hover:bg-slate-50">
                          <span className="text-sm ">Đang theo dõi</span>
                        </button>
                      ) : (
                        <button className="px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400">
                          <span className="text-sm ">Theo dõi</span>
                        </button>
                      )}
                      <button className="px-2 flex items-center border border-gray-300 rounded-md hover:bg-slate-50">
                        <i className="bx bx-dots-horizontal-rounded text-xl "></i>
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-x-5 mb-4">
                {loading ? (
                  <SkeletonLoading className={"w-[300px] h-4"} />
                ) : (
                  <>
                    <div>
                      <span className="font-semibold">
                        {blogs?.length || 0}
                      </span>{" "}
                      bài viết
                    </div>
                    <div>
                      <span className="font-semibold">
                        {followedUsers?.length || 0}
                      </span>{" "}
                      người theo dõi
                    </div>
                    <div>
                      đang theo dõi{" "}
                      <span className="font-semibold">
                        {followingUsers?.length || 0}
                      </span>{" "}
                      người dùng
                    </div>
                  </>
                )}
              </div>
              <div>
                {loading ? (
                  <SkeletonLoading className={"w-[100px] h-3"} />
                ) : (
                  <>
                    <span className="font">Mô tả</span>
                    <p className="text-sm">{bio || ""}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            {loading ? (
              <SkeletonLoading className={"w-20 h-5 mx-auto my-3"} />
            ) : (
              <h2 className="text-center p-2 text-xl">Bài viết</h2>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 pb-10">
            {loading ? (
              <Fragment>
                {Array(3)
                  .fill({})
                  .map((item, index) => (
                    <SkeletonLoading
                      className={"w-full h-[300px]"}
                      key={index}
                    />
                  ))}
              </Fragment>
            ) : (
              <Fragment>
                {blogs?.length > 0 &&
                  blogs.map((blog) => (
                    <div
                      className="cursor-pointer relative"
                      key={blog.id}
                      onMouseOver={() => {
                        onMouseOver(blog.id);
                      }}
                      onMouseOut={() => {
                        setHoverAt("");
                      }}
                      onClick={() => {
                        togglePopup(blog);
                      }}
                    >
                      {hoverAt === blog.id ? (
                        <div className="bg-black opacity-40 w-full h-[300px] absolute z-10">
                          <div className="absolute z-20 text-white w-full h-full flex items-center justify-center opacity-100">
                            <i className="bx bxs-heart mr-1"></i>
                            <span>{blog.likedUsers.length || 0}</span>
                            <div className="w-4"></div>
                            <i className="bx bxs-comment mr-1"></i>
                            <span>{blog.comments.length || 0}</span>
                          </div>
                        </div>
                      ) : null}
                      <img
                        className="object-cover h-[300px] w-full "
                        src={blog?.images[0] || ""}
                        alt=""
                      />
                      {/* <div className="relative top-0"> */}
                      {/* </div> */}
                    </div>
                  ))}
              </Fragment>
            )}
          </div>
        </div>
        {isOpen && (
          <Popup
            content={
              <BlogDetail user={user} blog={blogInPopup} setUser={setUser} />
            }
            handleClose={togglePopup}
          />
        )}
      </main>
    </MainLayout>
  );
};

export default UserDetail;
