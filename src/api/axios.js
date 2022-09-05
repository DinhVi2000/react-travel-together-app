import axios from "axios";

const getHeader = (token) => {
  const headers = {
    "Content-type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Authorization: "",
  };
  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  return headers;
};

export const callApi = async (token, method, apiPath, params, data) => {
  const options = {
    method,
    headers: {
      ...getHeader(token),
    },
    baseURL: process.env.CONFIG_SERVICE,
    url: apiPath,
    params,
    data,
  };
  // response
  try {
    const response = await axios(options);
    return response.data;
  } catch (err) {
    console.log("err :", err);
    return data;
  }
};
