import { post } from "axios";
import { setToken, removeToken, BASE_URL, getToken } from "./http";

const login = async (username, password) => {
  const result = await post(`/auth/login`, {
    username,
    password,
  });
  const accessToken = result.data.accessToken;
  setToken(accessToken);
  return result.data;
};

const signup = async (username, password) => {
  await post(`${BASE_URL}/auth/signup`, { username, password });
};

const tokenExpiresIn = async (username, password) => {
  const token = getToken();

  return 0;
};

const isLoggedIn =  () => {
  const token = getToken();
  if (!token) return false;

  if (tokenExpiresIn() === 0) return false;

  return true;
};

const signout = () => {
  removeToken();
};

export { login, signup, signout, isLoggedIn, tokenExpiresIn };
