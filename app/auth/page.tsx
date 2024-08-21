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
    let isMounted = true; // Flag to track if the component is mounted

    const fetchData = async () => {
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

        // Set state with the response data, only if the component is still mounted
        if (isMounted) {
          setTest(getResponse.data);

          // Optional: Redirect if on client side
          if (typeof window !== "undefined") {
            window.location.replace("/");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Call the async function
    fetchData();

    // Cleanup function to avoid memory leaks or race conditions
    return () => {
      isMounted = false;
    };
  }, [user, webApp]); 
  

  if (isLoading) {
    return <Loading />;
  }
}
