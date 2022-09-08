import React, { useEffect, useState } from "react";

import axios from "axios";

import BlogItem from "../../components/blog/BlogItem";
import Map from "../../components/map/Map";
import MainLayout from "../../layouts/MainLayout";

import { BLOG } from "../../constants/paths";

import { Autocomplete } from "@react-google-maps/api";
import { dateSortDesc } from "../../Method";
import { useRef } from "react";

const ViewInMap = () => {
  const [coordinates, setCoordinates] = useState({
    lat: 15.968687485725862,
    lng: 108.26125417215097,
  });
  const [usersWithBlog, setUsersWithBlog] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [isEnteredPlace, setIsEnteredPlace] = useState(false);
  const blogs_ref = useRef(null);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setIsEnteredPlace(true);
    setCoordinates({ lat, lng });
  };

  const fetchAllBlog = async () => {
    try {
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
                lat,
                lng,
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
                  lat,
                  lng,
                },
              });
            }
          });
        });

        setUsersWithBlog(list);
      }
    } catch (error) {}
  };

  const scollToBlogItem = (id) => {
    const blogItemArray = blogs_ref.current.getElementsByClassName("blogItem");
    let blogItem;
    for (let index = 0; index < blogItemArray.length; index++) {
      if (blogItemArray[index].id === id) {
        blogItem = blogItemArray[index];
      }
    }
    blogs_ref.current.scrollTo({
      top: blogItem.offsetTop - 100,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
    fetchAllBlog();
  }, []);

  return (
    <MainLayout>
      <div className="bg-white w-[420px] absolute z-10 mt-[90px] mx-2 rounded-sm">
        <div className="searchBar-container w-[390px] absolute z-20 mt-4 mx-3">
          <div className="searchInNav">
            <Autocomplete
              onLoad={(e) => onLoad(e)}
              onPlaceChanged={(place) => {
                onPlaceChanged(place);
              }}
            >
              <div className="w-full flex items-center">
                <i className="bx bx-search"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm trên bản đồ"
                  className="w-[320px] "
                />
              </div>
            </Autocomplete>
          </div>
        </div>
        <div
          ref={blogs_ref}
          className=" mt-20 bg-gray-100 max-h-[750px] px-1 overflow-auto"
          id="map-blog__list"
        >
          {usersWithBlog?.length > 0 &&
            dateSortDesc(usersWithBlog, "createdDate").map((user, index) => (
              <BlogItem key={user.blog.id} user={user} />
            ))}
        </div>
      </div>
      <Map
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        users={usersWithBlog}
        autocomplete={autocomplete}
        isEnteredPlace={isEnteredPlace}
        scollToBlogItem={scollToBlogItem}
      ></Map>
      {/* </div> */}
    </MainLayout>
  );
};

export default ViewInMap;
