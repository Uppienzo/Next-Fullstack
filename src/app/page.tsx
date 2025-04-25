"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { LoginForm } from "@/components/Login";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return <Dashboard />;
}
