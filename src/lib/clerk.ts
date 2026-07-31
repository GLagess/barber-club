import { auth, clerkClient } from "@clerk/nextjs/server";
import type { Role } from "@/generated/prisma/client";

export async function getCurrentUserRole(): Promise<Role | null> {
  const { sessionClaims } = await auth();
  const meta = sessionClaims?.metadata as { role?: Role } | undefined;
  return meta?.role ?? null;
}

export async function setUserRole(clerkId: string, role: Role): Promise<void> {
  const client = await clerkClient();
  await client.users.updateUserMetadata(clerkId, {
    publicMetadata: { role },
  });
}
