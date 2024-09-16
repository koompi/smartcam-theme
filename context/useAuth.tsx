"use client";

import { createContext, useContext, JSX, FC, useState, useEffect, use } from "react";
import axios from "axios";
import { UserType } from "@/types/user";
import { ContextAuth } from "@/types/global";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({});

interface Props {
  children: JSX.Element;
}

export const AppProvider: FC<Props> = (props) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/users/me`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token") || ""}`
        }
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

      if (telegramUser && !user) {
        setLoading(true);
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
          .then((response) => {
            localStorage.setItem("access_token", response.data.token);
            setUser(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              setUser(null);
              setLoading(false);
            } else {
              setUser(null);
              setLoading(false);
            }
          });
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp && !user) {
      handleTelegramLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    localStorage.removeItem("access_token");
    setUser(null);
    if (typeof window !== "undefined") {
      global && window.location.reload();
    }
  };

  const login = (code: string | null, state: string | null) => {
    setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/sso/customer?code=${code}&state=${state}&redirect_url=${window.location.origin}`).then((res) => {
      localStorage.setItem("access_token", res.data.token);
      setUser(res.data.user);
      router.push(res.data.redirect_url)
    }).catch(_ => {
      setLoading(false)
    })
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        loading: loading,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as ContextAuth;
