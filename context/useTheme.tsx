"use client";

import { createContext, useContext, FC, useEffect, useState } from "react";
import { read } from "@/handler";

interface ContextProps {
  children: React.ReactNode;
}

interface ContextTheme {
  value: any;
}

export const ThemeContext = createContext({});

const ThemeProvider: FC<ContextProps> = (props) => {
  const [value, setValue] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await read();
        setValue(data);
      } catch (error) {
        console.error("Error setting JSON data:", error);
      }
    };
    getData();
  }, []);

  const context = {
    value: value,
  };

  return (
    <ThemeContext.Provider value={context}>
      <div className="relative">{props.children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export function useTheme() {
  return useContext(ThemeContext) as ContextTheme;
}
