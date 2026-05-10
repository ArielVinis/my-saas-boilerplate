"use client";

import { signOut } from "@/lib/auth-client";
import { paths } from "@/lib/paths";
import { IconLoader2 } from "@tabler/icons-react";
import { useEffect } from "react";

export const LogoutPage = () => {
  useEffect(() => {
    signOut({ query: { redirect: paths.auth.login } });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        Deslogando <IconLoader2 className="w-4 h-4 animate-spin" />
      </h1>
    </div>
  );
};
