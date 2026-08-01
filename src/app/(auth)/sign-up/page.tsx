"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

      // Auto sign-in after signup
      const login = await signIn("credentials", { email, password, redirect: false });
      if (login?.error) { setError("Conta criada, mas erro ao entrar. Tente fazer login."); return; }

      router.push("/onboarding");
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gold">Use Barber Club</h1>
          <p className="text-muted-foreground text-sm">Crie sua conta gratuita</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nome</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full rounded-lg border border-dark-border bg-dark-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-lg border border-dark-border bg-dark-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Senha</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="w-full rounded-lg border border-dark-border bg-dark-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-gold py-2.5 font-semibold text-background transition-opacity disabled:opacity-50 hover:bg-gold-light"
          >
            {isPending ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link href="/sign-in" className="text-gold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
