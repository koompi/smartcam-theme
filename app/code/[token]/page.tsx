"use client";

import { customer_login } from "@/api/sso";
import { useAuth } from "@/context/useAuth";
import { Spinner } from "@nextui-org/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function Token() {
  const param = useParams<{ token: string }>();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Check if the token is present and if the redirect flag is not set
    if (param.token) {
      customer_login(param.token).then(() => {
        // Store the token and set a flag indicating the redirect has occurred
        localStorage.setItem("access_token", param.token);
        localStorage.setItem("redirected", "true"); // Set a flag to avoid loops
        window.location.href = "/"; // Use href to reload the page
      });
    }
  }, [param]);
  
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
