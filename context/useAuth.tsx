"use client";

import { createContext, useContext, JSX, FC, useState, useEffect } from "react";
import axios from "axios";
import { UserType } from "@/types/user";
import { ContextAuth } from "@/types/global";

export const AuthContext = createContext({});

interface Props {
  children: JSX.Element;
}

export const AppProvider: FC<Props> = (props) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<any>("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.data);
        setLoading(false);
        return;
      })
      .catch((e) => {
        setLoading(false);
        return;
      });
  }, []);

  const handleTelegramLogin = () => {
    if (window.Telegram?.WebApp) {
      const tgWebApp = window.Telegram.WebApp;
      tgWebApp.ready();
      const telegramUser = tgWebApp.initDataUnsafe.user;

      if (telegramUser) {
        // Optionally send user data to the backend for verification
        const body = {
          id: telegramUser.id.toString(),
          first_name: telegramUser.first_name,
          last_name: telegramUser.last_name,
          username: telegramUser.username,
          language_code: telegramUser.language_code,
          auth_date: tgWebApp.initDataUnsafe.auth_date.toString(),
          hash: tgWebApp.initDataUnsafe.hash,
          store_id: process.env.NEXT_PUBLIC_ID_STORE ?? "",
          redirect_url: window.location.origin,
        };
        setLoading(true);
        axios
          .post(
            `${process.env.NEXT_PUBLIC_BACKEND}/sso/telegram/login`,
            {
              ...body,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((_) => {
            setLoading(false);
            window.location.reload()
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              window.location.reload()
              console.error("Axios Error:", error.message);
              console.error("Status:", error.response?.status);
              console.error("Data:", error.response?.data);
            } else {
              window.location.reload()
              console.error("Error:", error);
            }
          });
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      handleTelegramLogin();
    }
  }, []);

  const logout = () => {
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/sso/logout`).then((_) => {
      if (typeof window !== "undefined") {
        global && window.location.reload();
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        loading: loading,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as ContextAuth;
