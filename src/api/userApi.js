import axios from "axios";
import { USER } from "../constants/paths";

const userApi = {
  addFollow: async (params) => {
    let response = null;
    try {
      const res = await axios.post(USER.ADD_FOLLOW, null, {
        params,
      });
      if (res?.data?.data) {
        response = res.data.data;
      }
    } catch (error) {
    } finally {
      return response;
    }
  },
  
};

export default userApi;
