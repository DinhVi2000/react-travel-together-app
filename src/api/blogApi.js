import axios from "axios";
import { list } from "firebase/storage";
import { BLOG } from "../constants/paths";

const blogApi = {
  getAllBlog: async () => {
    let list = [];
    try {
      const res = await axios.get(BLOG.GET_ALL);
      if (res.data && res.data.success) {
        let usersHasBlog = res.data.data.filter(
          (item) => item.blogs.length > 0
        );
        usersHasBlog.forEach((user) => {
          user.blogs.forEach((blog, index) => {
            if (blog) {
              const {
                createUser,
                content,
                images,
                location,
                createdDate,
                ban,
                id,
                likedUsers,
                comments,
              } = blog;
              list.push({
                ...user,
                // key: index,
                createdDate,
                blog: {
                  createUser,
                  content,
                  images,
                  location,
                  createdDate,
                  ban,
                  likedUsers,
                  comments,
                  id,
                },
              });
            }
          });
        });
      }
    } catch (error) {
    } finally {
      return list;
    }
  },
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
