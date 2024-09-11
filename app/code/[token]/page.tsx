"use client";

import { customer_login } from "@/api/sso";
import { Spinner } from "@nextui-org/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function Token() {
  const param = useParams<{ token: string }>();
  const router = useRouter();

  // useEffect(() => {
  //   if (param.token) {
  //     customer_login(param.token).then((_) => {
  //       localStorage.setItem("access_token", param.token);
  //       router.replace("/");
  //     });
  //   }
  //   router.replace("/");
  // }, [param, router]);
  
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
