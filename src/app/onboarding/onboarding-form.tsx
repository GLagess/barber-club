"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./actions";
import type { Role } from "@/generated/prisma/client";

const roles: { value: Role; label: string; description: string; icon: string }[] = [
  {
    value: "CUSTOMER",
    label: "Sou Cliente",
    description: "Quero agendar cortes com barbeiros",
    icon: "✂️",
  },
  {
    value: "OWNER",
    label: "Tenho uma Barbearia",
    description: "Gerencio um estabelecimento físico",
    icon: "🏪",
  },
  {
    value: "BARBER_FIXED",
    label: "Sou Barbeiro (Fixo)",
    description: "Trabalho em uma barbearia como profissional fixo",
    icon: "💈",
  },
  {
    value: "BARBER_MOBILE",
    label: "Sou Barbeiro Avulso",
    description: "Atendo clientes a domicílio de forma independente",
    icon: "🛵",
  },
];

export default function OnboardingForm() {
  const [selected, setSelected] = useState<Role | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit() {
    if (!selected) return;
    startTransition(async () => {
      await completeOnboarding(selected);
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {roles.map((r) => (
          <button
            key={r.value}
            onClick={() => setSelected(r.value)}
            className={`
              flex items-center gap-4 rounded-lg border p-4 text-left transition-all
              ${
                selected === r.value
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-dark-border bg-dark-card text-foreground hover:border-gold/50"
              }
            `}
          >
            <span className="text-2xl">{r.icon}</span>
            <div>
              <p className="font-semibold">{r.label}</p>
              <p className="text-sm text-muted-foreground">{r.description}</p>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selected || isPending}
        className="w-full rounded-lg bg-gold px-4 py-3 font-semibold text-background transition-opacity disabled:opacity-40 hover:bg-gold-light"
      >
        {isPending ? "Configurando..." : "Continuar"}
      </button>
    </div>
  );
}
