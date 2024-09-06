"use client";

import { Loading } from "@/components/globals/Loading";
import { useTelegram } from "@/context/telegramProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Telegram() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { user, webApp } = useTelegram();

  useEffect(() => {
    const fetchUserAuth = async () => {
      setIsLoading(true);
      try {
        // First API call
        const postResponse = await axios.post(
          `https://oauth.selendra.org/v1/telegram/app?client_id=2141a78e3d57c22151da6d179fafc8a1.selendra.org&scope=default&response_type=code&state=koompi&redirect_uri=${window.location.origin}`,
          {
            data: {
              ...user,
              auth_date: webApp?.initDataUnsafe.auth_date,
              hash: webApp?.initDataUnsafe.hash,
            },
          },
          {
            withCredentials: true,
          }
        );

        // Second API call using data from the first call
        const getResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/telegram?code=${postResponse.data.token}&state=`
        );

        // Redirect to the new page
        // router.push(`/code/${getResponse.data.token}`);
        // Redirect to the new page using window.location
        window.location.href = `/code/${getResponse.data.token}`;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Conditionally trigger the effect if user and webApp are defined
    if (user && webApp) {
      fetchUserAuth();
    }
  }, [user, webApp, router]); // Add router to the dependency array

  if (isLoading) {
    return <Loading />;
  }

  return
}
