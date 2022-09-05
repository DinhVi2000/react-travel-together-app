import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { loginReducer } from "../redux/auth/login.reducer";

const reducer = combineReducers({
  // here we will be adding reducers
  loginReducer,
});
const store = configureStore({
  reducer,
});
export default store;
