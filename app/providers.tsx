"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { TelegramProvider } from "@/context/telegramProvider";
import Script from "next/script";
import { useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // useEffect(() => {
  //   if (window) {
  //     const app = (window as any)?.Telegram?.WebApp;
  //     // Call as soon as your page is ready for the user to see
  //     app?.ready();

  //     // Expand your web app to full screen
  //     app?.expand();
  //   }
  // }, []);

  return (
    <>
      {/* <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
        onLoad={() => console.log("loaded")}
        onError={() => console.log("error")}
        onReady={() => console.log("ready")}
      /> */}
      <NextUIProvider navigate={router.push}>
        <ProgressBar
          height="3px"
          color="#0F3ECC"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {children}
      </NextUIProvider>
    </>
  );
}
