"use client";

import { Suspense, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { AlertCircle } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    params.get("error") ? "E-mail ou senha inválidos." : null
  );
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        setError("E-mail ou senha inválidos.");
      } else {
        router.push("/onboarding");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-[#888] uppercase tracking-wider">E-mail</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="w-full rounded-xl bg-[#111] border border-[#2A2A2A] px-4 py-3 text-sm text-white placeholder:text-[#444] focus:border-[#C9A84C] focus:outline-none transition-colors"
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-[#888] uppercase tracking-wider">Senha</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-xl bg-[#111] border border-[#2A2A2A] px-4 py-3 text-sm text-white placeholder:text-[#444] focus:border-[#C9A84C] focus:outline-none transition-colors"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl bg-red-500/8 border border-red-500/15 px-4 py-3">
          <AlertCircle size={15} className="text-red-400 shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl font-bold text-[#0A0A0A] py-3.5 text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        style={{ background: "#C9A84C" }}
      >
        {isPending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <Logo size={48} showText={false} />
          <p className="text-[#444] text-xs mt-4 font-medium uppercase tracking-widest">Use Barber Club</p>
        </div>

        <div
          className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-8"
        >
          <div className="mb-7">
            <h1
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Entrar na conta
            </h1>
            <p className="text-sm text-[#666]">Bem-vindo de volta. Use suas credenciais abaixo.</p>
          </div>

          <Suspense
            fallback={
              <div className="space-y-4 animate-pulse">
                <div className="h-11 rounded-xl bg-[#111]" />
                <div className="h-11 rounded-xl bg-[#111]" />
                <div className="h-11 rounded-xl bg-[#C9A84C]/20" />
              </div>
            }
          >
            <SignInForm />
          </Suspense>
        </div>

        <p className="text-center text-sm text-[#555] mt-6">
          Não tem conta?{" "}
          <Link href="/sign-up" className="font-medium hover:text-white transition-colors" style={{ color: "#C9A84C" }}>
            Cadastre-se grátis
          </Link>
        </p>
      </div>
    </div>
  );
}
