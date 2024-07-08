"use client";

import { createContext, useContext, JSX, FC, useState, useEffect } from "react";
import axios from "axios";
import { UserType } from "@/types/user";
import { ContextAuth } from "@/types/global";

export const AuthContext = createContext({});

interface Props {
  children: JSX.Element;
}

const getUser = async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND}/api/me`, {
      headers: {
        Authorization: `Bearer ${
          typeof window !== "undefined" && localStorage.getItem("access_token")
        }`,
      },
    })
    .then(({ status, data }) => {
      if (status === 200) {
        const user = data.data.user;

        return {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar,
          fullname: user?.fullname,
          id: user?._id,
          phone_number: user?.phone_number,
          gender: user?.gender,
        };
      }
      return;
    })
    .catch((e) => {
      if (e.code === "ERR_NETWORK") {
        return 401;
      }
      return null;
    });
};

export const AppProvider: FC<Props> = (props) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const user = async () => {
      const data = (await getUser()) as UserType;
      if ((data as unknown as number) == 401) {
        return setLoading(true);
      }
      setUser(data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return;
    };
    user();
    return;
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, loading: loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as ContextAuth;
