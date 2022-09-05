export const AUTH = {
  SIGN_IN: process.env.REACT_APP_CONFIG_SERVICE + "auth/signin",
  SIGN_IN_EXTERNAL:
    process.env.REACT_APP_CONFIG_SERVICE + "auth/signin/external",
};
export const USER = {
  GET_CURRENT_USER: process.env.REACT_APP_CONFIG_SERVICE + "user/current-user",
  GET_USER_BY_ID: process.env.REACT_APP_CONFIG_SERVICE + "user/getUserById",
  ADD_FOLLOW: process.env.REACT_APP_CONFIG_SERVICE + "user/add-follow",
};
export const BLOG = {
  GET_ALL: process.env.REACT_APP_CONFIG_SERVICE + "user/blog/getAll",
  CREATE_BLOG: process.env.REACT_APP_CONFIG_SERVICE + "user/blog",
  LIKE: process.env.REACT_APP_CONFIG_SERVICE + "user/blog/like",
  COMMENT: process.env.REACT_APP_CONFIG_SERVICE + "user/blog/comment",
};
