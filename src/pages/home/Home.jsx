import React, { Fragment, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import blogApi from "../../api/blogApi";
import BlogItem from "../../components/blog/BlogItem";
import Create from "../../components/create/Create";
import CreatePopup from "../../components/create/CreatePopup";
import BlogItemSkeletonLoading from "../../components/loading/BlogItemSkeletonLoading";
import Popup from "../../components/popup/Popup";
import MainLayout from "../../layouts/MainLayout";
import { dateSortDesc } from "../../Method";
import "./home.scss";

const Home = () => {
  const [usersWithBlog, setUsersWithBlog] = useState([]);
  // const [loading, setLoading] = useState(false);
  const home_ref = useRef(null);

  const queryClient = useQueryClient();
  const query = useQuery("todos", () => {
    return blogApi.getAllBlog();
  });

  const mutation = useMutation(() => {}, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  const [isOpenFormCreate, setIsOpenFromCreate] = useState(false);

  const togglePopup = () => {
    setIsOpenFromCreate(!isOpenFormCreate);
  };

  const filterByTag = (tagContent) => {
    setUsersWithBlog((prevBlog) => {
      return prevBlog.filter((user) => user.blog.content.includes(tagContent));
    });
  };

  // useEffect(() => {
  //   home_ref.current.addEventListener(
  //     "scroll",
  //     (event) => {
  //       query.scrollTop = document.getElementById("home").scrollTop;
  //     },
  //     { passive: true }
  //   );
  // }, []);

  return (
    <Fragment>
      <MainLayout>
        <div>
          <div
            className="home h-[100vh] overflow-auto"
            id="home"
            ref={home_ref}
          >
            <Create togglePopup={togglePopup} />
            {query.isLoading ? (
              <Fragment>
                {Array(2)
                  .fill({})
                  .map((item, index) => (
                    <BlogItemSkeletonLoading key={index} />
                  ))}
              </Fragment>
            ) : (
              <div ref={home_ref}>
                {query.data?.length > 0 &&
                  dateSortDesc(query.data, "createdDate").map((user, index) => (
                    <BlogItem
                      key={user.blog.id}
                      user={user}
                      setUsersWithBlog={setUsersWithBlog}
                      filterByTag={filterByTag}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
        {isOpenFormCreate && (
          <Popup
            content={
              isOpenFormCreate ? (
                <CreatePopup
                  togglePopup={togglePopup}
                  usersWithBlog={usersWithBlog}
                  setUsersWithBlog={setUsersWithBlog}
                />
              ) : null
            }
            handleClose={togglePopup}
          />
        )}
      </MainLayout>
    </Fragment>
  );
};

export default Home;
