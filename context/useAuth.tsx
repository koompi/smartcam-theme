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
  const [processing, setProcessing] = useState<string>("");

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
          id: telegramUser.id,
          first_name: telegramUser.first_name,
          last_name: telegramUser.last_name,
          username: telegramUser.username,
          language_code: telegramUser.language_code,
          auth_date: tgWebApp.initDataUnsafe.auth_date,
          hash: tgWebApp.initDataUnsafe.hash,
          store_id: process.env.NEXT_PUBLIC_ID_STORE,
          redirect_url: window.location.origin,
        };

        setProcessing(JSON.stringify(body, null, 4))

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body),
          redirect: "follow"
        } as RequestInit;

        fetch("https://backendv2.riverbase.org/sso/telegram/login", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            alert("success")
          })
          .catch((error) => console.error(error));

        // axios
        //   .post(`${process.env.NEXT_PUBLIC_BACKEND}/sso/telegram/login`, body, {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   })
        //   .then((response) => {
        //     const data = response.data;
        //     // if (data.success) {
        //     //   console.log("User logged in:", data.user);
        //     // } else {
        //     //   console.error("Login failed:", data.message);
        //     // }
        //     setProcessing(data)
        //   })
        //   .catch((error) => {
        //     // setProcessing()
        //     console.error("Error:", error);
        //   });
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      handleTelegramLogin();
    }
  }, [])

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
        logout: logout
      }}
    >
      {processing}
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as ContextAuth;
