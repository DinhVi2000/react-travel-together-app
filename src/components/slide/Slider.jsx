import React, { useEffect, useRef, useState } from "react";

import "./slider.scss";

const Slider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const SLIDES_WITDH = images.length * 100;
  const SLIDE_WITDH = 100 / images.length;

  const slides_ref = useRef(null);
  const first_slide_ref = useRef(null);

  useEffect(() => {
    slides_ref.current.style.width = SLIDES_WITDH + "%";
  }, []);

  const nextSlide = () => {
    setIndex((pre) => {
      return pre + 1;
    });
    let first_slide_width = Number(
      first_slide_ref.current.style.marginLeft.split("%")[0]
    );
    first_slide_ref.current.style.marginLeft = `${
      first_slide_width - SLIDE_WITDH
    }%`;
  };
  const prevSlide = () => {
    setIndex((pre) => {
      return pre - 1;
    });
    let first_slide_width = Number(
      first_slide_ref.current.style.marginLeft.split("%")[0]
    );
    first_slide_ref.current.style.marginLeft = `${
      first_slide_width + SLIDE_WITDH
    }%`;
  };

  return (
    <div className="slider">
      <div
        className="slides"
        ref={slides_ref}
        style={{ width: `${SLIDES_WITDH}%` }}
      >
        {images.length > 1 && (
          <div className="flex items-center justify-between absolute w-full top-[48%] px-3 z-10">
            <div className="w-[50%] text-left">
              {index !== 0 && (
                <button
                  onClick={() => {
                    prevSlide();
                  }}
                >
                  <i className="bx bx-chevron-left bg-white rounded-full text-xl cursor-pointer text-gray-500 p-1"></i>
                </button>
              )}
            </div>
            <div className="w-[50%] text-right">
              {index !== images.length - 1 && (
                <button
                  onClick={() => {
                    nextSlide();
                  }}
                >
                  <i className="bx bx-chevron-right bg-white rounded-full text-xl cursor-pointer text-gray-500 p-1"></i>
                </button>
              )}
            </div>
          </div>
        )}
        {images.map((image, index) => (
          <div
            className={`slide ${index === 0 ? "first" : ""} `}
            key={index}
            style={{ width: `${SLIDE_WITDH}%` }}
            ref={index === 0 ? first_slide_ref : null}
          >
            <img
              src={image}
              alt=""
              className="object-contain h-[550px] w-full bg-black cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-2 gap-1">
        {images &&
          images.length > 1 &&
          images.map((image, i) => (
            <div
              key={i}
              className={`w-2 h-2 ${
                index === i ? "bg-secondary" : "bg-gray-400"
              } rounded-full `}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default Slider;
