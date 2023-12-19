import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

const register = (username, email, phone, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    phone,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
