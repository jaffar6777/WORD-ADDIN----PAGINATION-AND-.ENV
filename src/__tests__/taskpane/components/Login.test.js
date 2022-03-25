import userEvent from "@testing-library/user-event";
import React from "react";
import Login from "../../../taskpane/components/Login";
import { LOGIN } from "../../../taskpane/store/AuthState/AuthTypes";
import { reduxTestStore, render, screen } from "../../../utils/test-utils";

describe("LOGIN", () => {
  it("If Username is empty show text Please Enter User Name", async () => {
    render(<Login />);
    const passwordElememt = screen.getByPlaceholderText("Password");
    const SubmitButtonElement = screen.getByText("Submit");
    userEvent.type(passwordElememt, "admin");
    userEvent.click(SubmitButtonElement);
    const textElement = await screen.findByText("Please Enter User Name");
    expect(textElement).toBeInTheDocument();
  });

  it("If Password is empty show text Please Enter Password", async () => {
    render(<Login />);
    const userNameElement = screen.getByPlaceholderText("User Name");
    const SubmitButtonElement = screen.getByText("Submit");
    userEvent.type(userNameElement, "Admin");
    userEvent.click(SubmitButtonElement);
    const textElement = await screen.findByText("Please Enter Password");
    expect(textElement).toBeInTheDocument();
  });

  it("If Username  is wrong show text Please check the User Name", async () => {
    render(<Login />);
    const userNameElement = screen.getByPlaceholderText("User Name");
    const passwordElememt = screen.getByPlaceholderText("Password");
    const SubmitButtonElement = screen.getByText("Submit");
    userEvent.type(userNameElement, "Admin123"); // Wrong Username
    userEvent.type(passwordElememt, "admin");
    userEvent.click(SubmitButtonElement);
    const textElement = await screen.findByText("Please check the User Name");
    expect(textElement).toBeInTheDocument();
  });

  it("If Password is wrong show text Please check the Password", async () => {
    render(<Login />);
    const userNameElement = screen.getByPlaceholderText("User Name");
    const passwordElememt = screen.getByPlaceholderText("Password");
    const SubmitButtonElement = screen.getByText("Submit");
    userEvent.type(userNameElement, "Admin");
    userEvent.type(passwordElememt, "admin123"); // Wrong Password
    userEvent.click(SubmitButtonElement);
    const textElement = await screen.findByText("Please check the Password");
    expect(textElement).toBeInTheDocument();
  });

  it("If Username and Password is correct", async () => {
    render(<Login />);
    const dispatchSpy = jest.spyOn(reduxTestStore, "dispatch");
    const userNameElement = screen.getByPlaceholderText("User Name");
    const passwordElememt = screen.getByPlaceholderText("Password");
    const SubmitButtonElement = screen.getByText("Submit");
    userEvent.type(userNameElement, "Admin");
    userEvent.type(passwordElememt, "admin");
    userEvent.click(SubmitButtonElement);
    expect(dispatchSpy).toHaveBeenCalledWith({ type: LOGIN });
    expect(dispatchSpy).toBeCalledTimes(1);
  });
});
