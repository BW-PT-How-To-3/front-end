import axios from "axios";

export const axiosWithAuth = () => {
  const token = window.localStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: token,
    },
    baseURL: "https://how-to-hacks.herokuapp.com",
    // baseURL: "http://localhost:4000",
  });
};
