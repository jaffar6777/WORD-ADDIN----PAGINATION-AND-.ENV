import { PrimaryButton, Spinner, SpinnerSize, Text, TextField } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../store/AuthState/AuthActions";
import { fetchPosts } from "../store/PostsState/PostsActions";
import Pagination from "./Pagination";
import { alignRight, center, container, m, mv, spaceBetween } from "./styles";

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.Posts);

  useEffect(() => {
    dispatch(fetchPosts(activeIndex + 1));
    if (initialLoad) {
      setInitialLoad(false);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (searchText !== "") {
      setFilteredData(posts.data.filter((post) => post.title.toLowerCase().includes(searchText.toLowerCase())));
    }
  }, [posts]);

  const onLogoutHandler = () => {
    dispatch(Logout());
  };

  const nextHandler = () => {
    setActiveIndex((prevState) => prevState + 1);
  };
  const prevHandler = () => {
    setActiveIndex((prevState) => prevState - 1);
  };

  const directHandler = (pageIndex) => {
    setActiveIndex(pageIndex);
  };

  const searchInputHandler = (event) => {
    setSearchText(event.target.value);
    setFilteredData(posts.data.filter((post) => post.title.toLowerCase().includes(event.target.value.toLowerCase())));
  };

  if (posts.loading) {
    return (
      <div style={center}>
        <Spinner size={SpinnerSize.large} label="Fetching" />
      </div>
    );
  }

  if (initialLoad) {
    return null;
  }

  const renderPosts = () => {
    if (posts.data && posts.data.length !== 0 && searchText === "") {
      return posts?.data?.map((post) => <Post key={post.id} post={post} />);
    } else if (posts.data && posts.data.length !== 0 && filteredData.length > 0) {
      return filteredData?.map((post) => <Post key={post.id} post={post} />);
    } else {
      return <h1>No Data Found</h1>;
    }
  };
  return (
    <div style={container}>
      <PrimaryButton className={m} text="LOGOUT" onClick={onLogoutHandler} />
      <TextField placeholder="Search Here" style={alignRight} value={searchText} onChange={searchInputHandler} />
      {renderPosts()}
      <Pagination
        activeIndex={activeIndex}
        nextHandler={nextHandler}
        prevHandler={prevHandler}
        directHandler={directHandler}
      />
    </div>
  );
}

export default Home;

const Post = ({ post }) => {
  return (
    <div style={spaceBetween}>
      <Text style={mv}>{post.title}</Text>
    </div>
  );
};
