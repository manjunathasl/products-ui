import { useState } from "react";
import useForm from "../hooks/useForm.js";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/auth";

export default function SignUp() {
  let initialState = {
    userName: "",
    dob: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();
  const [svcError, setSvcError] = useState("");

  const onSubmit = async() => {
    setSvcError("");
    try {
      const user = {
        userName: state.userName,
        password: state.password,
        dob: state.dob,
      }
      const data = await signup(user);
      if (data.userName) {
        navigate("/login");
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
    if (!state.dob) {
      error.dob = "Date of birth is required field";
    } else if(new Date(state.dob) > Date.now()){
      error.dob = "Date of birth can not be more than today";
    }

    if (!state.confirmPassword) {
      error.confirmPassword = "Date of birth is required field";
    } else if(state.confirmPassword !== state.password){
      error.confirmPassword = "Password did not match";
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
            <h2>Create Account</h2>
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
            type="date"
            name="dob"
            placeholder="Enter date of birth"
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
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Re-Enter password"
            changeHandler={changeHandler}
            state={state}
            errors={errors}
          />

          {svcError && <div className="error-text">{svcError}</div>}
          <div className="content-right">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
