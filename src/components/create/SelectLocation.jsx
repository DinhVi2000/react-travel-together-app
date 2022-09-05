import { Autocomplete } from "@react-google-maps/api";
import React, { useState } from "react";

const SelectLocation = ({ openContent, onLoad, onPlaceChanged }) => {
  return (
    <div>
      <div className="flex justify-center border border-b-1 p-4">
        <i
          className="bx bx-left-arrow-alt text-3xl cursor-pointer bg-gray-200 rounded-full absolute left-2"
          onClick={openContent}
        ></i>
        <h2 className="font-medium text-lg">Tìm kiếm vị trí</h2>
      </div>
      <div>
        <div className="searchBar-container m-4 ">
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
      </div>
    </div>
  );
};

export default SelectLocation;
