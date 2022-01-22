import { useState } from "react";
import useForm from "../hooks/useForm.js";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
  let initialState = { userName: "", password: "" };

  const [svcError, setSvcError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    setSvcError("");
    try {
      const data = await login(state.userName, state.password);
      if (data.userName) {
        navigate("/");
      }
    } catch (error) {
      setSvcError(error.message);
    }
  };

  const validate = (state) => {
    let error = {};
    if (!state.userName) {
      error.userName = "User name is required field";
    } else if (!/\S+@\S+\.\S+/.test(state.userName)) {
      error.userName = "Invalid user name";
    }

    if (!state.password) {
      error.password = "Password is required field";
    } else if (state.password.length < 8) {
      error.password = "Minimum password length is 8 characters";
    }
    return error;
  };

  const { state, errors, changeHandler, submitHandler } = useForm(
    initialState,
    validate,
    onSubmit
  );

  return (
    <div className="align-center">
      <div className="content-box">
        <form onSubmit={submitHandler} noValidate>
          <div className="header-title">
            <h2>Sign In to Your Account</h2>
          </div>
          <Input
            type="email"
            placeholder="Enter user name"
            name="userName"
            changeHandler={changeHandler}
            state={state}
            errors={errors}
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            changeHandler={changeHandler}
            state={state}
            errors={errors}
          />
          {svcError && <div className="error-text">{svcError}</div>}
          <div className="content-spaced">
            <a href="/signup">Creat account</a>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}
