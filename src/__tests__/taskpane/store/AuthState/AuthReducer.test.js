import { Login, Logout } from "../../../../taskpane/store/AuthState/AuthActions";
import { loginReducer } from "../../../../taskpane/store/AuthState/AuthReducer";

describe("Auth Reducer", () => {
  test("Should return the initial state when empty action is passed", () => {
    const initialState = undefined;
    const action = { type: "" }; // Empty action
    const result = loginReducer(initialState, action);
    expect(result).toEqual({ isLoggedIn: false });
  });

  test("Should return the initial state when wrong action is passed", () => {
    const initialState = undefined;
    const action = { type: "WRONG" }; // Wrong action
    const result = loginReducer(initialState, action);
    expect(result).toEqual({ isLoggedIn: false });
  });

  test("Should return isLoggedIn as true when wrong LOGIN action", () => {
    const initialState = undefined;
    const action = Login(); // Wrong action
    const result = loginReducer(initialState, action);
    expect(result).toEqual({ isLoggedIn: true });
  });

  test("Should return isLoggedIn as true when wrong LOGIN action", () => {
    const initialState = undefined;
    const action = Logout(); // Wrong action
    const result = loginReducer(initialState, action);
    expect(result).toEqual({ isLoggedIn: false });
  });
});
