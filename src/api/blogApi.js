import axios from "axios";
import { BLOG } from "../constants/paths";

const blogApi = {
  postComnment: async (body, params) => {
    const { content, userIdComment, userAvt, fullName, isLocalGuide } = body;
    let response = null;
    try {
      //   setLoadingComment(true);
      const res = await axios.post(
        BLOG.COMMENT,
        {
          content,
          userIdComment,
          userAvt,
          fullName,
          isLocalGuide,
        },
        {
          params,
        }
      );
      if (res?.data?.data) {
        response = res.data.data;
      }
    } catch (error) {
    } finally {
      return response;
    }
  },
  toggleLike: async (params) => {
    let response = null;
    try {
      const res = await axios.post(BLOG.LIKE, null, {
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

export default blogApi;
