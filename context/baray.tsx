"use client";

import { PublicClient } from "baray-js";
import React, { useEffect, useState } from "react";

export const BarayContext = React.createContext<PublicClient | null>(null);

export const BarayProvider: React.FC<Props> = ({ children, apiKey }) => {
  const [baray, setBaray] = useState<PublicClient | null>(null);

  useEffect(() => {
    if (!baray) {
      const _baray = new PublicClient(apiKey);
      setBaray(_baray);
    }
  }, [baray]);

  return (
    <BarayContext.Provider value={baray}>{children}</BarayContext.Provider>
  );
};

interface Props {
  children: React.ReactNode;
  apiKey: string;
}
