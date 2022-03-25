import React from "react";
import Home from "../../../taskpane/components/Home";
import { posts_1, posts_2 } from "../../../assets/data/posts_response";
import { reduxTestStore, render, screen, waitFor } from "../../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { LOGOUT } from "../../../taskpane/store/AuthState/AuthTypes";

describe("Home", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should render no data found if the api response gives no posts ", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    render(<Home />);
    const headingElement = await screen.findByText("No Data Found");
    expect(headingElement).toBeInTheDocument();
  });

  it("should render no data found if there are no matching posts after searching ", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    render(<Home />);
    const inputElement = await screen.findByPlaceholderText("Search Here");
    userEvent.type(inputElement, "HELLO");
    const headingElement = await screen.findByText("No Data Found");
    expect(headingElement).toBeInTheDocument();
  });

  it("should render Posts ", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    render(<Home />);
    const textElementOne = await screen.findByText("Title 1");
    const textElementTwo = await screen.findByText("Title 2");
    expect(textElementOne).toBeInTheDocument();
    expect(textElementTwo).toBeInTheDocument();
  });

  it("should render only the searched Posts ", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    render(<Home />);
    const inputElement = await screen.findByPlaceholderText("Search Here");
    userEvent.type(inputElement, "Title 1");
    const textElement = screen.getByText("Title 1");
    expect(textElement).toBeInTheDocument();
  });

  it("should not render the other Posts ", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    render(<Home />);
    const inputElement = await screen.findByPlaceholderText("Search Here");
    userEvent.type(inputElement, "Title 1");
    const textElement = screen.queryByText("Title 2");
    expect(textElement).toBe(null);
  });

  it("should change data on next Click", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    fetchMock.mockResponseOnce(JSON.stringify(posts_2));
    render(<Home />);
    const linkElement = await screen.findByText("next");
    userEvent.click(linkElement);
    expect(fetchMock).toBeCalledTimes(2);
    const textElement = await screen.findByText("Title 3");
    expect(textElement).toBeInTheDocument();
  });

  it("should change data on direct click", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    fetchMock.mockResponseOnce(JSON.stringify(posts_2));
    render(<Home />);
    const linkElement = await screen.findByText("5");
    userEvent.click(linkElement);
    expect(fetchMock).toBeCalledTimes(2);
    const textElement = await screen.findByText("Title 3");
    expect(textElement).toBeInTheDocument();
  });

  it("should change data on prev click", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    fetchMock.mockResponseOnce(JSON.stringify(posts_2));
    render(<Home />);
    const linkElement = await screen.findByText("5");
    userEvent.click(linkElement);
    const prevButton = await screen.findByText("prev");
    userEvent.click(prevButton);
    expect(fetchMock).toBeCalledTimes(3);
    const textElement = await screen.findByText("Title 3");
    expect(textElement).toBeInTheDocument();
  });

  it("next button should  be visible initially", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    render(<Home />);
    const linkElement = await screen.findByText("next");
    expect(linkElement).toBeVisible();
  });

  it("next button should not be visible when the last page is active", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    render(<Home />);
    const linkElement = await screen.findByText("10");
    userEvent.click(linkElement);
    const nextButton = await screen.findByText("next");
    expect(nextButton).not.toBeVisible();
  });

  it("prev button should not be visible initially", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    render(<Home />);
    const linkElement = await screen.findByText("prev");
    expect(linkElement).not.toBeVisible();
  });

  it("should render the correct search results on page change", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    fetchMock.mockResponseOnce(JSON.stringify(posts_2));
    render(<Home />);
    const linkElement = await screen.findByText("next");
    const inputElement = await screen.findByPlaceholderText("Search Here");
    userEvent.type(inputElement, "Title");
    const textElementsOne = await screen.findAllByText(/[a-zA-Z]*Title[a-zA-Z]*/g);
    expect(textElementsOne).toHaveLength(3);
    userEvent.click(linkElement);
    waitFor(() => {
      const textElementsTwo = screen.getAllByText(/[a-zA-Z]*Title[a-zA-Z]*/g);
      expect(textElementsTwo).toHaveLength(2);
    });
  });

  it("should navigate to Login Page when LOGOUT is clicked ", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(posts_1));
    render(<Home />);
    const dispatchSpy = jest.spyOn(reduxTestStore, "dispatch");
    const buttonElement = await screen.findByText("LOGOUT");
    userEvent.click(buttonElement);
    expect(dispatchSpy).toHaveBeenCalledWith({ type: LOGOUT });
    expect(dispatchSpy).toBeCalledTimes(1);
  });
});
