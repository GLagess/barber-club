"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { setUserRole } from "@/lib/clerk";
import type { Role } from "@/generated/prisma/client";

const roleRedirects: Record<Role, string> = {
  ADMIN: "/admin",
  OWNER: "/dashboard/loja",
  BARBER_FIXED: "/dashboard/cadeira",
  BARBER_MOBILE: "/dashboard/autonomo",
  CUSTOMER: "/agendar",
};

export async function completeOnboarding(role: Role): Promise<void> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  await prisma.user.update({
    where: { clerkId: userId },
    data: { role },
  });

  await setUserRole(userId, role);

  redirect(roleRedirects[role]);
}
