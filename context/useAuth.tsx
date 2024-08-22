"use client";

import { createContext, useContext, JSX, FC, useState, useEffect } from "react";
import axios from "axios";
import { UserType } from "@/types/user";
import { ContextAuth } from "@/types/global";
import { useQuery } from "@apollo/client";
import { WISHLIST_NOTIFICATION } from "@/graphql/wishlist";

export const AuthContext = createContext({});

interface Props {
  children: JSX.Element;
}

export const AppProvider: FC<Props> = (props) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const { data, refetch } = useQuery(WISHLIST_NOTIFICATION);

  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND}/api/me`, {
          headers: {
            Authorization: `Bearer ${
              typeof window !== "undefined" &&
              localStorage.getItem("access_token")
            }`,
          },
        })
        .then(
          ({ status, data }: { status: number; data: { data: UserType } }) => {
            if (status === 200) {
              const user = data.data;
              setUser({
                ...user,
              });
              setLoading(false);
              return;
            }
            setLoading(false);
            setUser(null);
          }
        )
        .catch((_) => {
          setLoading(false);
          setUser(null);
          return;
        });
    } catch (e) {
      setLoading(false);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        loading: loading,
        notifications: data?.storeNotifications,
        refetch: refetch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as ContextAuth;
