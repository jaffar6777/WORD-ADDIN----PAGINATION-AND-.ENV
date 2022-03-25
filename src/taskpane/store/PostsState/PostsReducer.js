import { POSTS_FAILED, POSTS_REQUEST, POSTS_SUCCESS, SET_POSTS } from "./PostsTypes";

const initailState = { data: [], loading: false, error: false };

const postsReducer = (state = initailState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POSTS_SUCCESS:
      return {
        data: action.payload,
        loading: false,
        error: false,
      };
    case POSTS_FAILED:
      return {
        data: null,
        loading: false,
        error: true,
      };
    case SET_POSTS:
      return {
        loading: false,
        error: false,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
