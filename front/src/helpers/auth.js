import { setCookie, getCookie, deleteCookie } from "./cookies";
import {
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
} from "./localStorage";

export const setAuthentication = (token, user) => {
  setLocalStorage("token", token);
  setLocalStorage("user", user);
};

export const isAuthenticated = () => {
  if (
    localStorage.getItem("token") !== null &&
    localStorage.getItem("user") !== null
  ) {
    return true;
  } else {
    return false;
  }
};

export const logout = () => {
  localStorage.clear();
};
