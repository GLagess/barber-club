"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./actions";
import type { Role } from "@/generated/prisma/client";

const roles: { value: Role; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: "CUSTOMER",
    label: "Sou Cliente",
    description: "Quero agendar cortes com barbeiros",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    value: "OWNER",
    label: "Tenho uma Barbearia",
    description: "Gerencio um estabelecimento físico",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    value: "BARBER_FIXED",
    label: "Sou Barbeiro (Fixo)",
    description: "Trabalho em uma barbearia como profissional fixo",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    value: "BARBER_MOBILE",
    label: "Sou Barbeiro Avulso",
    description: "Atendo clientes a domicílio de forma independente",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
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
        {roles.map((r) => {
          const isSelected = selected === r.value;
          return (
            <button
              key={r.value}
              onClick={() => setSelected(r.value)}
              className="flex items-center gap-4 rounded-2xl border p-4 text-left transition-all"
              style={{
                borderColor: isSelected ? "#C9A84C" : "rgba(255,255,255,0.08)",
                background: isSelected ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.02)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-colors"
                style={{
                  background: isSelected ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.05)",
                  color: isSelected ? "#C9A84C" : "rgba(255,255,255,0.4)",
                }}
              >
                {r.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{r.label}</p>
                <p className="text-xs text-white/40 mt-0.5">{r.description}</p>
              </div>
              <div
                className="w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all"
                style={{ borderColor: isSelected ? "#C9A84C" : "rgba(255,255,255,0.2)" }}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full" style={{ background: "#C9A84C" }} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selected || isPending}
        className="w-full rounded-xl font-bold text-[#0A0A0A] py-3.5 text-sm transition-all hover:shadow-[0_0_24px_rgba(201,168,76,0.4)] disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A)" }}
      >
        {isPending ? "Configurando..." : "Continuar"}
      </button>
    </div>
  );
}
