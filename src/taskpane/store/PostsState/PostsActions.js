import { POSTS_FAILED, POSTS_REQUEST, POSTS_SUCCESS, SET_POSTS } from "./PostsTypes";

export const postsRequest = () => {
  return { type: POSTS_REQUEST };
};

export const postsSuccess = (posts) => {
  return { type: POSTS_SUCCESS, payload: posts };
};

export const postsFailed = (error) => {
  return { type: POSTS_FAILED, payload: error };
};

export const setPosts = (posts) => {
  return { type: SET_POSTS, payload: posts };
};

export const fetchPosts = (pageNumber) => {
  return async (dispatch) => {
    try {
      dispatch(postsRequest());
      const request = await fetch("https://jsonplaceholder.typicode.com/" + "posts?_page=" + pageNumber.toString());
      const response = await request.json();
      dispatch(postsSuccess(response));
    } catch (error) {
      dispatch(postsFailed(error));
    }
  };
};
