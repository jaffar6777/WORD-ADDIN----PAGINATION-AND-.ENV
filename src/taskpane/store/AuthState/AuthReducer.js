import { LOGIN, LOGOUT } from "./AuthTypes";

const initailState = { isLoggedIn: false };

export const loginReducer = (state = initailState, action) => {
  switch (action.type) {
    case LOGIN:
      return { isLoggedIn: true };
    case LOGOUT:
      return { isLoggedIn: false };
    default:
      return state;
  }
};
