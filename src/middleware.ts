import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

const roleRedirects: Record<string, string> = {
  ADMIN:         "/admin",
  OWNER:         "/dashboard/loja",
  BARBER_FIXED:  "/dashboard/cadeira",
  BARBER_MOBILE: "/dashboard/autonomo",
  CUSTOMER:      "/agendar",
};

const rolePrefixes: Record<string, string[]> = {
  ADMIN:         ["/admin"],
  OWNER:         ["/dashboard/loja"],
  BARBER_FIXED:  ["/dashboard/cadeira"],
  BARBER_MOBILE: ["/dashboard/autonomo"],
  CUSTOMER:      ["/agendar"],
};

const publicPaths = ["/", "/sign-in", "/sign-up", "/api/auth"];

function isPublic(pathname: string) {
  return publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export default auth((req: NextRequest & { auth: { user?: { role?: string } } | null }) => {
  const pathname = req.nextUrl.pathname;

  if (isPublic(pathname)) return NextResponse.next();

  const session = req.auth;

  if (!session?.user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const role = session.user.role as string | undefined;

  if (!role && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (role && pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL(roleRedirects[role] ?? "/agendar", req.url));
  }

  if (role) {
    const allowed = rolePrefixes[role] ?? [];
    const allPrefixes = Object.values(rolePrefixes).flat();
    const isRolePath = allPrefixes.some((p) => pathname.startsWith(p));
    const isAllowed = allowed.some((p) => pathname.startsWith(p));
    if (isRolePath && !isAllowed) {
      return NextResponse.redirect(new URL(roleRedirects[role], req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"],
};
