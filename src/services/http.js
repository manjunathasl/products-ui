import axios from "axios";

const BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({ baseURL: BASE_URL });

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
  return localStorage.setItem("accessToken", accessToken);
};

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const removeToken = () => {
  localStorage.removeItem("accessToken");
  redirectToLogin();
};

const get = async (endpoint, options = {}) => {
  return axiosInstance
    .get(`/${endpoint}`, { ...options, ...getAuthHeaders() })
    .catch((error) => handleError(error));
};

const post = async (endpoint, data = {}, options = {}) => {
  return axiosInstance
    .post(`/${endpoint}`, data, { ...options, ...getAuthHeaders() })
    .catch(handleError);
};

function handleError(error) {
  const { statusCode } = error.response.data;

  if (statusCode !== 401) {
    throw error;
  } else {
    return redirectToLogin();
  }
}

export { get, post, getToken, removeToken, setToken, BASE_URL };
