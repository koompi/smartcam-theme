import axios from "axios";

export const sso_api = (code: string, state: string) => {
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_RVB_BACKEND}/sso?code=${code}&state=${state}&scope=default`,
  };
  return axios.request(config);
};

export const user_store_login = (token: String) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/store/login`,
    { store_id: process.env.NEXT_PUBLIC_ID_STORE },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
