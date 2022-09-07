import React, { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MultipleImageGrid from "../image/MultipleImageGrid";

import defaultAvatar from "../../assets/images/default-avatar.jpg";
import SelectLocation from "./SelectLocation";
import axios from "axios";

import { storage } from "../../conifg/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { BLOG } from "../../constants/paths";
import ButtonLoading from "../loading/ButtonLoading";
import ErrorNotitfy from "../notification/ErrorNotitfy";

const CreatePopup = ({ togglePopup, usersWithBlog, setUsersWithBlog }) => {
  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [place, setPlace] = useState("");

  const [errorContent, setErrorContent] = useState("");

  const user = useSelector((state) => state.loginReducer.user) || {};

  const checkErorr = () => {
    let check = false;
    if (content === "") {
      setErrorContent("Vui lòng nhập nội dung blog.");
    } else if (place === "") {
      setErrorContent("Vui lòng chọn vị trí.");
    } else {
      setErrorContent("");
      check = true;
    }
    return check;
  };

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    // const lat = autocomplete.getPlace().geometry.location.lat();
    // const lng = autocomplete.getPlace().geometry.location.lng();
    setPlace(autocomplete.getPlace().formatted_address);
    openContent();
  };

  const content_ref = useRef(null);
  const location_ref = useRef(null);

  const openLocation = () => {
    content_ref.current.classList.remove("active");
    location_ref.current.classList.add("active");
  };

  const openContent = () => {
    location_ref.current.classList.remove("active");
    content_ref.current.classList.add("active");
  };

  const postNewBlog = () => {
    if (checkErorr()) {
      setLoading(true);
      Promise.all(
        Array.from(selectedImages).map((element) =>
          getFirebaseImageURL(element)
        )
      ).then(async (images) => {
        try {
          const res = await axios.post(BLOG.CREATE_BLOG, {
            content,
            images,
            location: autocomplete.getPlace().formatted_address,
            lat: autocomplete.getPlace().geometry.location.lat(),
            lng: autocomplete.getPlace().geometry.location.lng(),
          });
          if (res?.data?.data) {
            setUsersWithBlog([
              ...usersWithBlog,
              {
                ...user,
                createdDate: res.data.data.createdDate,
                blog: res.data.data,
              },
            ]);
            setLoading(false);
            togglePopup();
          }
        } catch (error) {
          setLoading(false);
        }
      });
    }
  };

  const onSelectFiles = (e) => {
    setSelectedImages(e.target.files);
  };

  const getFirebaseImageURL = (image) => {
    return new Promise((res, rej) => {
      const imageRef = ref(storage, image.name);
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              res(url);
            })
            .catch((err) => {
              rej(err);
            });
        })
        .catch((err) => {
          rej(err);
        });
    });
  };

  return (
    <Fragment>
      <div
        className="tab-body active w-[500px] pb-4 bg-white flex flex-col justify-between"
        ref={content_ref}
      >
        <div>
          <div className="flex justify-center border border-b-1 p-4">
            <h2 className="font-medium text-lg">Tạo bài viết</h2>
          </div>
          <div className="flex items-center mx-4 py-4">
            <img
              className="w-[40px] h-[40px] rounded-full object-cover mr-2"
              src={user.avatar || defaultAvatar}
              alt=""
            />
            <p className="text-sm">
              <span className="font-semibold">{user.fullName || ""}</span>
              {place !== "" && (
                <Fragment>
                  <span> Đang ở </span>
                  <span className="font-semibold">{place || ""}</span>
                </Fragment>
              )}
            </p>
          </div>
          {errorContent !== "" && (
            <div className="px-4">
              <ErrorNotitfy content={errorContent} />
            </div>
          )}
          <div className="px-4 py-2 h-auto">
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="w-full outline-none text-xl"
              rows="3"
              cols="50"
              placeholder="Bạn đang nghĩ gì thế?"
            ></textarea>
          </div>
          {selectedImages && selectedImages.length > 0 && (
            <div className="h-auto p-4">
              <MultipleImageGrid images={selectedImages} />
            </div>
          )}
        </div>
        <div className="px-4">
          <div className="border border-gray-400 p-4 rounded-lg flex justify-between items-center">
            <div>
              <span className="text-sm font-medium">
                Thêm vào bài viết của bạn
              </span>
            </div>
            <div className="flex">
              <input
                type="file"
                id="file"
                multiple
                className="hidden"
                onChange={onSelectFiles}
              />
              <div className="action w-10 flex justify-center items-center ">
                <label htmlFor="file" className="inline-block cursor-pointer">
                  <i className="bx bx-images text-green-400 text-3xl"></i>
                </label>
              </div>
              <button className="action w-9" onClick={openLocation}>
                <i className="bx bxs-map text-red-500 text-3xl"></i>
              </button>
            </div>
          </div>
          <div>
            <button
              className={`${
                loading ? "bg-blue-400" : "bg-blue-500"
              } text-white w-full p-2 rounded-md mt-2 hover:bg-blue-400`}
              onClick={postNewBlog}
            >
              {loading ? <ButtonLoading /> : "Đăng"}
            </button>
          </div>
        </div>
      </div>
      <div className="tab-body w-[500px]" ref={location_ref}>
        <SelectLocation
          openContent={openContent}
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
        />
      </div>
    </Fragment>
  );
};

export default CreatePopup;
