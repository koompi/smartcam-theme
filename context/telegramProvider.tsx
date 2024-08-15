import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ITelegramUser, IWebApp } from "@/types/global";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: ITelegramUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [webApp, setWebApp] = useState<IWebApp | null>(null);
  const { user } = useAuth();
  console.log("user", user);
  

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp;
    console.log("app", app);
    
    if (app) {
      app.ready();
      app.expand();
      setWebApp(app);
    }
  }, []);

  useEffect(() => {
    console.log("webapp", webApp);
    
    if (webApp && webApp.initDataUnsafe.user && !user) {
      router.push("/");
    }
  }, [webApp, user, router]);

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);