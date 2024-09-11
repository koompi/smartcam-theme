"use client";

import { Loading } from "@/components/globals/Loading";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Telegram() {
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
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
            setIsLoading(false);
            // window.location.reload();
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              // window.location.reload()
              console.error("Axios Error:", error.message);
              console.error("Status:", error.response?.status);
              console.error("Data:", error.response?.data);
            } else {
              // window.location.reload()
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

  if (isLoading) {
    return <Loading />;
  }

  return
}
