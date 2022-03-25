import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "./AuthState/AuthReducer";
import fetchReducer from "./PostsState/PostsReducer";

const rootReducer = combineReducers({ Auth: loginReducer, Posts: fetchReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
