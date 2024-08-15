"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { TelegramProvider } from "@/context/telegramProvider";
import Script from "next/script";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
        onLoad={() => console.log("loaded")}
        onError={() => console.log("error")}
        onReady={() => console.log("ready")}
      />
      <NextUIProvider navigate={router.push}>
        <ProgressBar
          height="3px"
          color="#0F3ECC"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <TelegramProvider>{children}</TelegramProvider>
      </NextUIProvider>
    </>
  );
}
