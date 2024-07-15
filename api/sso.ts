import axios from "axios";

export const sso_api = (code: string, state: string) => {
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_RVB_BACKEND}/sso?code=${code}&state=${state}&scope=default`,
  };
  return axios.request(config);
};

export const customer_login = (token: String) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/customer/${process.env.NEXT_PUBLIC_ID_STORE}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};