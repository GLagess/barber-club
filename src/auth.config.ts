import type { NextAuthConfig } from "next-auth";
import type { Role } from "@/generated/prisma/client";

declare module "next-auth" {
  interface User { role?: Role }
  interface Session {
    user: { id: string; role: Role } & { name?: string | null; email?: string | null; image?: string | null }
  }
  interface JWT { role?: Role; userId?: string }
}

// Edge-safe config — sem imports do Prisma
export const authConfig: NextAuthConfig = {
  pages: { signIn: "/sign-in" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, trigger }: any) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session({ session, token }: any) {
      session.user.id = token.userId;
      session.user.role = token.role;
      return session;
    },
  },
};
