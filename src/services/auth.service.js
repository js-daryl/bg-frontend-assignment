import axios from "./axios";

import { SERVER_URL } from "../config.json";
import LocalStorageService from "./localstorage.service";

const login = (id, password) => {
  return axios
    .post(`${SERVER_URL}/auth/login`, {
      email: id,
      password,
    })
    .then(({data}) => {
      LocalStorageService.setToken(data.token);
      LocalStorageService.setUser(data.user);
      return data.user;
    });
};

const logout = () => {
  LocalStorageService.clearToken();
};

export default {
  login,
  logout,
};
