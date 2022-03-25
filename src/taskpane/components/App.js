import React from "react";
import { useSelector } from "react-redux";
import Home from "./Home";
import Login from "./Login";

function App() {
  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
  return <div className="root">{isLoggedIn ? <Home /> : <Login />}</div>;
}

export default App;
