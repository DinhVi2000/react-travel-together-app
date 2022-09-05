import * as types from "./login.constants";
import produce from "immer";

const initialState = {
  loading: false,
  user: {},
};

export const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOGIN:
        draft.loading = true;
        break;
      case types.SET_USER_DATA:
        draft.user = action.payload;
        break;
      case types.LOGIN_SUCCESS:
        draft.loading = false;
        break;
      case types.LOGIN_FAILED:
        draft.loading = false;
        break;
      default:
        return state;
    }
  });
