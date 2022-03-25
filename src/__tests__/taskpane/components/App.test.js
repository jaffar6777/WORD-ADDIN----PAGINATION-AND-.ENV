import App from "../../../taskpane/components/App";
import { render } from "../../../utils/test-utils";
import React from "react";
import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../../taskpane/store";
import Login from "../../../taskpane/components/Login";

const MockedLoginComponent = () => (
  <Provider store={store}>
    <Login />
  </Provider>
);

describe("App", () => {
  it("should render Login when user is not Logged in", async () => {
    render(<App />);
    const snapShot = TestRenderer.create(<MockedLoginComponent />).toJSON();
    expect(snapShot).toMatchSnapshot();
  });
});
