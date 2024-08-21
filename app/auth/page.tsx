"use client";

import { Loading } from "@/components/globals/Loading";
import { useTelegram } from "@/context/telegramProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Telegram() {
  const router = useRouter();
  const [test, setTest] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const { user, webApp } = useTelegram();

  useEffect(() => {
    setIsLoading(true);
    const fetchUserAuth = async () => {
      try {
        await axios
          .post(
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
          )
          .then(async (data) => {
            setTest(data)
            // window.location.href =`${window.location.origin}?code=${data.token}&state=koompi`;
            router.replace(`${window.location.origin}/code=${data.data.token}&state=koompi`)
          })
          .catch((err: any) => {
            console.log("err", err);
          })
          .finally(() => setIsLoading(false));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user) {
      fetchUserAuth();
    }
  }, [webApp, user, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <p>
        Token: {JSON.stringify(test, null, 4)}
      </p>
    </>
  );
}
