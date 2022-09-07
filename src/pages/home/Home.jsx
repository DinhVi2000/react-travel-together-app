import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BlogItem from "../../components/blog/BlogItem";
import Create from "../../components/create/Create";
import CreatePopup from "../../components/create/CreatePopup";
import BlogItemSkeletonLoading from "../../components/loading/BlogItemSkeletonLoading";
import Popup from "../../components/popup/Popup";
import { BLOG } from "../../constants/paths";
import MainLayout from "../../layouts/MainLayout";
import { dateSortDesc } from "../../Method";
import "./home.scss";

const Home = () => {
  const [usersWithBlog, setUsersWithBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const fetchAllBlog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BLOG.GET_ALL);
      if (res.data && res.data.success) {
        let list = [];
        let usersHasBlog = res.data.data.filter(
          (item) => item.blogs.length > 0
        );
        usersHasBlog.forEach((user) => {
          user.blogs.forEach((blog, index) => {
            if (blog) {
              const {
                createUser,
                content,
                images,
                location,
                createdDate,
                ban,
                id,
                likedUsers,
                comments,
              } = blog;
              list.push({
                ...user,
                // key: index,
                createdDate,
                blog: {
                  createUser,
                  content,
                  images,
                  location,
                  createdDate,
                  ban,
                  likedUsers,
                  comments,
                  id,
                },
              });
            }
          });
        });

        setUsersWithBlog(list);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlog();
  }, []);

  return (
    <Fragment>
      <MainLayout>
        <div>
          <div className="home">
            <Create togglePopup={togglePopup} />
            {loading ? (
              <Fragment>
                {Array(2)
                  .fill({})
                  .map((item, index) => (
                    <BlogItemSkeletonLoading key={index} />
                  ))}
              </Fragment>
            ) : (
              <Fragment>
                {usersWithBlog?.length > 0 &&
                  dateSortDesc(usersWithBlog, "createdDate").map(
                    (user, index) => (
                      <BlogItem
                        key={user.blog.id}
                        user={user}
                        setUsersWithBlog={setUsersWithBlog}
                      />
                    )
                  )}
              </Fragment>
            )}
          </div>
        </div>
        {isOpen && (
          <Popup
            content={
              <CreatePopup
                togglePopup={togglePopup}
                usersWithBlog={usersWithBlog}
                setUsersWithBlog={setUsersWithBlog}
              />
            }
            handleClose={togglePopup}
          />
        )}
      </MainLayout>
    </Fragment>
  );
};

export default Home;
