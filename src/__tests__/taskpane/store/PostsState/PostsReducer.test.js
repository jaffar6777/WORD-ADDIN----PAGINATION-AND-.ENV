import { postsFailed, postsRequest, postsSuccess, setPosts } from "../../../../taskpane/store/PostsState/PostsActions";
import fetchReducer from "../../../../taskpane/store/PostsState/PostsReducer";

describe("Posts Reducer", () => {
  test("Should return initial state when empty action is passed ", () => {
    const initialState = undefined;
    const action = { type: "" }; // Empty action
    const result = fetchReducer(initialState, action);
    expect(result).toEqual({ data: [], loading: false, error: false });
  });

  test("Should return initial state when wrong action is passed ", () => {
    const initialState = undefined;
    const action = { type: "WRONG" }; // Wrong action
    const result = fetchReducer(initialState, action);
    expect(result).toEqual({ data: [], loading: false, error: false });
  });

  test("Should return the required data when action POSTS_REQUEST is passed ", () => {
    const initialState = undefined;
    const action = postsRequest();
    const result = fetchReducer(initialState, action);
    expect(result).toEqual({ data: [], loading: true, error: false });
  });

  test("Should return the required data when action POSTS_SUCCESS is passed ", () => {
    const initialState = undefined;
    const action = postsSuccess({ data: [] });
    const result = fetchReducer(initialState, action);
    expect(result).toEqual({ data: { data: [] }, loading: false, error: false });
  });

  test("Should return the required data when action POSTS_FAILED is passed ", () => {
    const initialState = undefined;
    const action = postsFailed({ error: "error" });
    const result = fetchReducer(initialState, action);
    expect(result).toEqual({ data: null, loading: false, error: true });
  });

  test("Should return the required data when action SET_POSTS is passed ", () => {
    const initialState = undefined;
    const action = setPosts({ data: [] });
    const result = fetchReducer(initialState, action);
    expect(result).toEqual({ data: { data: [] }, loading: false, error: false });
  });
});
