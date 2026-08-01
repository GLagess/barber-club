"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function HomeSignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-1.5 text-xs text-[#555] hover:text-red-400 transition-colors"
    >
      <LogOut size={13} />
      Sair
    </button>
  );
}
