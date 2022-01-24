import { post } from "axios";
import { setToken, removeToken, BASE_URL, getToken, get } from "./http";

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || {});
};

const login = async (username, password) => {
  try {
    const res = await post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    const accessToken = res.data.access_token;
    setToken(accessToken);
    const userRes = await get("user");
    setUser(userRes.data);
    return userRes.data;
  } catch (error) {
    throw error?.response?.data ?? new Error("Service error");
  }
};

const refreshToken = async () => {
  try {
    const res = await get("auth/refresh-token");
    if (res.data?.access_token) setToken(res.data.access_token);
    return res.data;
  } catch (error) {
    throw error?.response?.data ?? new Error("Service error");
  }
};

const signup = async (user) => {
  try {
    const res = await post(`${BASE_URL}/auth/signup`, user);
    return res.data;
  } catch (error) {
    throw error?.response?.data ?? new Error("Service error");
  }
};

const tokenExpiresIn = () => {
  const expiresIn = localStorage.getItem("expiresIn");

  if (!expiresIn) return 0;

  const exp = (new Date(expiresIn).getTime() - new Date().getTime()) / 1000;

  return Math.ceil(exp);
};

const isLoggedIn = () => {
  const token = getToken();

  if (!token) return false;

  if (tokenExpiresIn() < 1) return false;

  return true;
};

const signout = () => {
  removeToken();
};

export {
  login,
  signup,
  signout,
  isLoggedIn,
  tokenExpiresIn,
  getUser,
  refreshToken,
};
