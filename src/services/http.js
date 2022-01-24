import axios from "axios";
import jwtDecode from "jwt-decode";
import jwt from "jwt-decode";

const BASE_URL = "http://localhost:8080";

function redirectToLogin() {
  window.location = "/login";
}

function getAuthHeaders() {
  const token = getToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

const setToken = (accessToken) => {
  const { exp, iat } = jwt(accessToken);
  const timeNow = new Date();
  timeNow.setSeconds(timeNow.getSeconds() + (exp - iat));
  localStorage.setItem("expiresIn", timeNow);
  localStorage.setItem("accessToken", accessToken);
};

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const removeToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("expiresIn");
  redirectToLogin();
};

const get = async (endpoint, options = {}) => {
  return axios
    .get(`${BASE_URL}/${endpoint}`, { ...options, ...getAuthHeaders() })
    .catch((error) => handleError(error));
};

const post = async (endpoint, data = {}, options = {}) => {
  return axios
    .post(`${BASE_URL}/${endpoint}`, data, { ...options, ...getAuthHeaders() })
    .catch(handleError);
};

function handleError(error) {
  const { statusCode } = error.response.data;
  if (statusCode !== 401) {
    throw error;
  } else {
    return removeToken();
  }
}

export { get, post, getToken, removeToken, setToken, BASE_URL };
