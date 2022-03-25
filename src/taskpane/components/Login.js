import { Label, PrimaryButton, TextField } from "@fluentui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Login as userLogin } from "../store/AuthState/AuthActions";

const container = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const m1 = {
  margin: "1rem",
};

const mt1 = {
  marginTop: "1rem",
};

const mb1 = {
  marginBottom: "1rem",
};

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangeUserName = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const submitHandler = () => {
    if (username === "") {
      setUsernameError("Please Enter User Name");
    } else if (password === "") {
      setPasswordError("Please Enter Password");
    } else if (username !== "Admin") {
      setUsernameError("Please check the User Name");
    } else if (password !== "admin") {
      setPasswordError("Please check the Password");
    }
    dispatch(userLogin());
    setUsername("");
    setPassword("");
  };

  return (
    <div style={container}>
      <h2 className={m1}>LOGIN</h2>
      <form onSubmit={submitHandler}>
        <Label required className={mt1}>
          User Name
        </Label>
        <TextField
          placeholder="User Name"
          errorMessage={usernameError ? usernameError : ""}
          onChange={onChangeUserName}
        />
        <Label required>Password</Label>
        <TextField
          className={mb1}
          placeholder="Password"
          errorMessage={passwordError ? passwordError : ""}
          onChange={onChangePassword}
        />
        <PrimaryButton text="Submit" onClick={submitHandler} />
      </form>
    </div>
  );
}

export default Login;
