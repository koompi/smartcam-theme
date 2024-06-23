"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ProgressBar
        height="3px"
        color="#829161"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </NextUIProvider>
  );
}
