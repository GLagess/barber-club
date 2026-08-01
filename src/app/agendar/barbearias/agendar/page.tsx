"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { MOCK_BARBERS, MOCK_SCHEDULE, TIME_SLOTS } from "@/lib/mock-data";

const services = [
  { id: "s1", name: "Corte Social", duration: "30 min", price: "R$ 45" },
  { id: "s2", name: "Corte + Barba", duration: "60 min", price: "R$ 75" },
  { id: "s3", name: "Degradê", duration: "45 min", price: "R$ 60" },
  { id: "s4", name: "Barba", duration: "30 min", price: "R$ 35" },
];

function BookingForm() {
  const params = useSearchParams();
  const initialBarber = params.get("barber") ?? MOCK_BARBERS[0].name;

  const [selectedBarber, setSelectedBarber] = useState(initialBarber);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const schedule = MOCK_SCHEDULE[selectedBarber] ?? {};
  const freeSlots = TIME_SLOTS.filter((t) => !schedule[t] || schedule[t].status === "free");

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
        >
          <CheckCircle2 size={36} style={{ color: "#22c55e" }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Agendamento confirmado!
        </h2>
        <p className="text-[#666] text-sm mb-2">
          {selectedService} com {selectedBarber} às {selectedTime}
        </p>
        <p className="text-[#555] text-xs mb-8">Você receberá uma confirmação em breve.</p>
        <Link
          href="/agendar"
          className="rounded-xl font-bold text-[#0A0A0A] px-8 py-3.5 text-sm hover:opacity-90 transition-all"
          style={{ background: "#C9A84C" }}
        >
          Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Step 1: Barber */}
      <div>
        <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-3">1. Barbeiro</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {MOCK_BARBERS.map((b) => (
            <button
              key={b.id}
              onClick={() => { setSelectedBarber(b.name); setSelectedTime(null); }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border transition-all text-center"
              style={{
                borderColor: selectedBarber === b.name ? "#C9A84C" : "#1A1A1A",
                background: selectedBarber === b.name ? "rgba(201,168,76,0.08)" : "#111",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C" }}
              >
                {b.initials}
              </div>
              <p className="text-sm font-medium text-white">{b.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Service */}
      <div>
        <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-3">2. Serviço</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedService(s.name)}
              className="flex items-center justify-between rounded-xl border px-4 py-3 transition-all text-left"
              style={{
                borderColor: selectedService === s.name ? "#C9A84C" : "#1A1A1A",
                background: selectedService === s.name ? "rgba(201,168,76,0.08)" : "#111",
              }}
            >
              <div>
                <p className="text-sm font-medium text-white">{s.name}</p>
                <p className="text-[11px] text-[#555]">{s.duration}</p>
              </div>
              <span className="text-sm font-bold" style={{ color: selectedService === s.name ? "#C9A84C" : "#fff" }}>
                {s.price}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Time slot */}
      <div>
        <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-3">
          3. Horário disponível — {selectedBarber}
        </p>
        {freeSlots.length === 0 ? (
          <p className="text-sm text-[#555]">Sem horários livres hoje para este barbeiro.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {freeSlots.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className="px-4 py-2 rounded-xl text-sm font-mono font-medium border transition-all"
                style={{
                  borderColor: selectedTime === t ? "#C9A84C" : "#1A1A1A",
                  background: selectedTime === t ? "rgba(201,168,76,0.12)" : "#111",
                  color: selectedTime === t ? "#C9A84C" : "#888",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Confirm */}
      <button
        disabled={!selectedBarber || !selectedService || !selectedTime}
        onClick={() => setConfirmed(true)}
        className="flex items-center justify-center gap-2 w-full rounded-xl font-bold text-[#0A0A0A] py-4 text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: "#C9A84C" }}
      >
        Confirmar agendamento
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

export default function AgendarBarbeariaPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <Link href="/agendar/barbearias" className="text-xs text-[#555] hover:text-[#888] transition-colors mb-4 inline-flex items-center gap-1">
          ← Voltar
        </Link>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Barbearia Da Vinci
        </h1>
        <p className="text-[#666] text-sm mt-1">Escolha barbeiro, serviço e horário</p>
      </div>

      <Suspense fallback={<div className="animate-pulse space-y-4"><div className="h-24 rounded-2xl bg-[#111]"/><div className="h-24 rounded-2xl bg-[#111]"/></div>}>
        <BookingForm />
      </Suspense>
    </div>
  );
}
