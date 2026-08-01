"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const perks = [
  { title: "Proprietários", desc: "Dashboard com agenda, equipe e financeiro." },
  { title: "Barbeiros", desc: "Opera fixo ou como autônomo — você escolhe." },
  { title: "Clientes", desc: "Agendamento fácil com avaliação integrada." },
];

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }

      const login = await signIn("credentials", { email, password, redirect: false });
      if (login?.error) { setError("Conta criada, mas erro ao entrar. Tente fazer login."); return; }

      router.push("/onboarding");
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen flex bg-[#0A0A0A]">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-14 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(201,168,76,0.1) 0%, transparent 70%)" }}
        />
        <div aria-hidden className="absolute inset-0 border-r border-white/5" />

        <Link href="/" className="relative flex items-center gap-3 w-fit">
          <Image src="/logo.png" alt="Use Barber Club" width={44} height={44} className="rounded-xl" />
          <span className="font-bold text-white text-lg tracking-tight">Use Barber Club</span>
        </Link>

        <div className="relative space-y-8">
          <div className="space-y-3">
            <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase">Comece agora</p>
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Junte-se a quem<br />já modernizou.
            </h2>
            <p className="text-white/40 text-base leading-relaxed max-w-sm">
              Crie sua conta em segundos e descubra como o Use Barber Club vai transformar sua operação.
            </p>
          </div>
          <div className="space-y-4">
            {perks.map((p) => (
              <div key={p.title} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(201,168,76,0.12)" }}
                >
                  <svg className="w-4 h-4 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{p.title}</p>
                  <p className="text-white/40 text-xs mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-white/20 text-xs">© {new Date().getFullYear()} userbarberclub.com</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden flex-col items-center gap-3 mb-2">
            <Image src="/logo.png" alt="Use Barber Club" width={64} height={64} className="rounded-2xl" />
            <span className="font-bold text-white text-xl tracking-tight">Use Barber Club</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white">Criar conta grátis</h1>
            <p className="text-white/40 text-sm">Sem cartão de crédito. Comece em menos de 1 minuto.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Nome completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="João Silva"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#C9A84C]/60 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#C9A84C]/60 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Senha</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#C9A84C]/60 focus:outline-none transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl font-bold text-[#0A0A0A] py-3.5 text-sm transition-all hover:shadow-[0_0_24px_rgba(201,168,76,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A)" }}
            >
              {isPending ? "Criando conta..." : "Criar conta gratuita"}
            </button>

            <p className="text-center text-xs text-white/20">
              Ao criar uma conta você concorda com nossos{" "}
              <span className="text-white/40">Termos de Uso</span> e{" "}
              <span className="text-white/40">Política de Privacidade</span>.
            </p>
          </form>

          <p className="text-center text-sm text-white/30">
            Já tem conta?{" "}
            <Link href="/sign-in" className="text-[#C9A84C] hover:text-[#E8C97A] transition-colors font-medium">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
