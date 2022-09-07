import React, { Fragment } from "react";

const MultipleImageGrid = ({ images }) => {
  const convertToBlobURL = (files) => {
    const selectedFilesArray = Array.from(files);
    return selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
  };

  // console.log(convertToBlobURL(images));

  const imageClassname = (length, index) => {
    if (length === 3) {
      if (index > 0) {
        return "w-[50%]";
      }
    } else if (length >= 4) {
      if (index > 0 && index < 4) {
        return "w-[33%]";
      } else if (index >= 4) {
        return "hidden";
      }
    }
  };
  return (
    <div
      className={`border border-gray-400  rounded-lg w-full h-full p-2 flex flex-wrap`}
    >
      {images &&
        convertToBlobURL(images).map((image, index) => (
          // <span className="inline-block flex">
          <Fragment key={index}>
            <img
              key={index}
              src={image}
              alt=""
              className={`pt-1 px-1 ${imageClassname(
                images.length,
                index
              )} max-h-[140px] object-cover w-full`}
            />
            {index === 4 ? (
              <div className="relative">
                <div className="absolute text-white text-2xl z-10 w-[148px] h-[140px] flex justify-center items-center bg-gray-400 opacity-50 right-0">
                  <span>+{images.length - 4}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </Fragment>
        ))}
    </div>
  );
};

export default MultipleImageGrid;
