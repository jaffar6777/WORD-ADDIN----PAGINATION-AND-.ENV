const {
  postsRequest,
  postsSuccess,
  fetchPosts,
  postsFailed,
} = require("../../../../taskpane/store/PostsState/PostsActions");
const { mockStore } = require("../../../../utils/mockStore");

const store = mockStore();

describe("Posts Actions fetchPosts", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    store.clearActions();
  });

  it("Fetching Posts Success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: "name" }));
    await store.dispatch(fetchPosts("1"));
    const actions = store.getActions();
    expect(actions[0]).toEqual(postsRequest());
    expect(actions[1]).toEqual(postsSuccess({ name: "name" }));
    expect(fetchMock).toBeCalledTimes(1);
  });

  it("Fetching Posts Failure", async () => {
    fetchMock.mockReject({ error: "Invalid Url" });
    await store.dispatch(fetchPosts("1"));
    const actions = store.getActions();
    expect(actions[0]).toEqual(postsRequest());
    expect(actions[1]).toEqual(postsFailed({ error: "Invalid Url" }));
    expect(fetchMock).toBeCalledTimes(1);
  });
});
