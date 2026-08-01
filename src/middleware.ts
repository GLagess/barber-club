import { auth } from "@/auth";
import { NextResponse } from "next/server";

const publicPaths = ["/", "/sign-in", "/sign-up", "/api/auth"];

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

function isPublic(pathname: string) {
  return publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const pathname = nextUrl.pathname;

  if (isPublic(pathname)) return NextResponse.next();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const role = session.user.role;

  // No role yet → onboarding
  if (!role && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Has role but hitting /onboarding → send to correct dashboard
  if (role && pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL(roleRedirects[role] ?? "/agendar", req.url));
  }

  // Block cross-role access
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
