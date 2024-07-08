import axios from "axios";

export const getMe = () => {
  let access_token = localStorage.getItem("access_token");

  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token ? access_token : ""}`,
    },
  });
};
