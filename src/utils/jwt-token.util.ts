import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage.util";

export const getAccessToken = () => {
  return getFromLocalStorage<string>("access_token");
};

export const getRefreshToken = () => {
  return getFromLocalStorage<string>("refresh_token");
};

export const removeAccessToken = () => {
  removeFromLocalStorage("access_token");
};

export const removeRefreshToken = () => {
  removeFromLocalStorage("refresh_token");
};

export const setAccessToken = (token: string) => {
  setToLocalStorage<string>("access_token", token);
};

export const setRefreshToken = (token: string) => {
  setToLocalStorage<string>("refresh_token", token);
};
