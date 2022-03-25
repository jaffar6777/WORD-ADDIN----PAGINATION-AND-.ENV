// test-utils.jsx
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";

import { applyMiddleware, combineReducers, createStore } from "redux";
import { loginReducer } from "../taskpane/store/AuthState/AuthReducer";
import postsReducer from "../taskpane/store/PostsState/PostsReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ Auth: loginReducer, Posts: postsReducer });

let reduxTestStore = null;
const render = (
  component,
  { initialState, store = createStore(rootReducer, initialState, applyMiddleware(thunk)), ...renderOptions } = {}
) => {
  reduxTestStore = store;
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return rtlRender(component, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { render, reduxTestStore };
