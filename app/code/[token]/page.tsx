"use client";

import { customer_login } from "@/api/sso";
import { Spinner } from "@nextui-org/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function Token() {
  const param = useParams<{ token: string }>();
  const router = useRouter();

  useEffect(() => {
    // Check if the token is present and a flag is not set to prevent loops
    if (param.token && !localStorage.getItem("redirected")) {
      customer_login(param.token).then(() => {
        // Store the token and a flag indicating the redirect has occurred
        localStorage.setItem("access_token", param.token);
        localStorage.setItem("redirected", "true"); // Set a flag to avoid loops
        window.location.replace("/"); // Use replace to prevent going back to the previous page
      });
    }
  }, [param]);

  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
