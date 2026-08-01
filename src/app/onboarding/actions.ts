"use server";

import { auth, unstable_update } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/generated/prisma/client";

const roleRedirects: Record<Role, string> = {
  ADMIN:         "/admin",
  OWNER:         "/dashboard/loja",
  BARBER_FIXED:  "/dashboard/cadeira",
  BARBER_MOBILE: "/dashboard/autonomo",
  CUSTOMER:      "/agendar",
};

export async function completeOnboarding(role: Role): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  await prisma.user.update({
    where: { id: session.user.id },
    data: { role },
  });

  // Force JWT refresh to include new role
  await unstable_update({ user: { role } });

  redirect(roleRedirects[role]);
}
