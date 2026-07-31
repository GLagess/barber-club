import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/clerk(.*)",
]);

const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

const roleRedirects: Record<string, string> = {
  ADMIN: "/admin",
  OWNER: "/dashboard/loja",
  BARBER_FIXED: "/dashboard/cadeira",
  BARBER_MOBILE: "/dashboard/autonomo",
  CUSTOMER: "/agendar",
};

const rolePaths: Record<string, string> = {
  ADMIN: "/admin",
  OWNER: "/dashboard/loja",
  BARBER_FIXED: "/dashboard/cadeira",
  BARBER_MOBILE: "/dashboard/autonomo",
  CUSTOMER: "/agendar",
};

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims } = await auth();
  const url = req.nextUrl;

  if (isPublicRoute(req)) return NextResponse.next();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;

  // No role yet → send to onboarding (unless already there)
  if (!role && !isOnboardingRoute(req)) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // User with role hitting /onboarding → send to their dashboard
  if (role && isOnboardingRoute(req)) {
    const dest = roleRedirects[role] ?? "/agendar";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  // Protect role-specific paths: if user is on a path not meant for their role, redirect
  if (role) {
    const ownPath = rolePaths[role];
    const pathname = url.pathname;

    const allRolePaths = Object.values(rolePaths);
    const isOnWrongRolePath = allRolePaths.some(
      (p) => pathname.startsWith(p) && !pathname.startsWith(ownPath)
    );

    if (isOnWrongRolePath) {
      return NextResponse.redirect(new URL(ownPath, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
