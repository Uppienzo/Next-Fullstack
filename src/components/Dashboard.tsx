"use client";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-secondary">
      <Sidebar />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-2xl font-semibold mb-4">Welcome to the Dashboard!</h1>
        <p className="text-gray-600 mb-4">You are now logged in.</p>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

