import { LOGIN, LOGOUT } from "./AuthTypes";

export const Login = () => {
  return { type: LOGIN };
};

export const Logout = () => {
  return { type: LOGOUT };
};
