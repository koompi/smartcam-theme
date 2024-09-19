"use client";

import { Loading } from "@/components/globals/Loading";
import { useAuth } from "@/context/useAuth";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParam = useSearchParams();
  const { login } = useAuth();
  
  useEffect(() => {
    if(searchParam.get("code") && searchParam.get("state")){
      login(searchParam.get("code"), searchParam.get("state"))
    }
    setIsLoading(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return
}
