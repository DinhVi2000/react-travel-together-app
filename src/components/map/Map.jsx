import React, { useEffect, useState } from "react";

import GoogleMapReact from "google-map-react";

const Map = ({
  coordinates,
  setCoordinates,
  users,
  autocomplete,
  isEnteredPlace,
}) => {
  const [zoom, setZoom] = useState(6);

  useEffect(() => {
    if (isEnteredPlace) {
      setZoom(8);
    }
  }, [isEnteredPlace]);

  return (
    <div id="map">
      {/* <ScriptLoaded> */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_CONFIG_SERVICE }}
        // defaultCenter={coordinates}
        center={coordinates}
        // defaultZoom={6}
        zoom={zoom}
        style={{ width: "100%", height: "100%" }}
        margin={[50, 50, 50, 50]}
        // options={() => {}}
        onChange={(e) => {
          // setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          // setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        // onChildClick={() => {}}
      >
        {users?.map((users, index) => (
          <div
            key={users.blog.id}
            className="border border-white rounded-sm w-12 h-12 cursor-pointer"
            lat={Number(users.blog.lat)}
            lng={Number(users.blog.lng)}
            onClick={() => {
              setCoordinates({ lat: users.blog.lat, lng: users.blog.lng });
              setZoom(10);
            }}
          >
            <img
              src={users.blog.images[0]}
              alt=""
              className="w-full h-full rounded-sm object-cover"
            />
          </div>
        ))}
        <div
          lat={Number(coordinates.lat)}
          lng={Number(coordinates.lng)}
          className="cursor-pointer flex w-[100vh] items-center"
        >
          <i className="bx bxs-map text-3xl text-red-500 "></i>
        </div>
      </GoogleMapReact>
      {/* </ScriptLoaded> */}
    </div>
  );
};

export default Map;
