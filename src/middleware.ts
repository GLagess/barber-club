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

// Rotas públicas (sem autenticação)
const publicPaths = ["/", "/sign-in", "/sign-up", "/api/auth"];

// /home é acessível para qualquer usuário logado
const sharedAuthPaths = ["/home"];

function isPublic(pathname: string) {
  return publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isSharedAuth(pathname: string) {
  return sharedAuthPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export default auth((req: NextRequest & { auth: { user?: { role?: string } } | null }) => {
  const pathname = req.nextUrl.pathname;
  const session = req.auth;
  const role = session?.user?.role as string | undefined;

  // Usuário logado na landing "/" → redireciona para /home
  if (pathname === "/" && session?.user) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Rotas públicas passam direto
  if (isPublic(pathname)) return NextResponse.next();

  // /home: precisa estar logado, mas qualquer role acessa
  if (isSharedAuth(pathname)) {
    if (!session?.user) return NextResponse.redirect(new URL("/sign-in", req.url));
    return NextResponse.next();
  }

  // Demais rotas: precisa estar logado
  if (!session?.user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Sem role → onboarding
  if (!role && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Já tem role e tenta acessar onboarding → vai pro dashboard
  if (role && pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL(roleRedirects[role] ?? "/home", req.url));
  }

  // Protege rotas de outros roles
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
