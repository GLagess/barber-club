"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2, ArrowRight, Copy, CreditCard } from "lucide-react";
import { MOCK_BARBERS, MOCK_SCHEDULE, TIME_SLOTS } from "@/lib/mock-data";

const services = [
  { id: "s1", name: "Corte Social", duration: "30 min", price: "R$ 45", value: 45 },
  { id: "s2", name: "Corte + Barba", duration: "60 min", price: "R$ 75", value: 75 },
  { id: "s3", name: "Degradê", duration: "45 min", price: "R$ 60", value: 60 },
  { id: "s4", name: "Barba", duration: "30 min", price: "R$ 35", value: 35 },
];

type Step = "select" | "payment" | "confirmed";
type PayMethod = "pix" | "card";

function BookingForm() {
  const params = useSearchParams();
  const initialBarber = params.get("barber") ?? MOCK_BARBERS[0].name;

  const [step, setStep] = useState<Step>("select");
  const [selectedBarber, setSelectedBarber] = useState(initialBarber);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [payMethod, setPayMethod] = useState<PayMethod>("pix");
  const [paying, setPaying] = useState(false);

  const schedule = MOCK_SCHEDULE[selectedBarber] ?? {};
  const freeSlots = TIME_SLOTS.filter((t) => !schedule[t] || schedule[t].status === "free");

  function handlePay() {
    setPaying(true);
    setTimeout(() => { setPaying(false); setStep("confirmed"); }, 1800);
  }

  if (step === "confirmed") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
        >
          <CheckCircle2 size={36} style={{ color: "#22c55e" }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Pagamento confirmado!
        </h2>
        <p className="text-[#666] text-sm mb-1">Seu agendamento está garantido.</p>
        <p className="text-[#555] text-sm mb-1">
          {selectedService?.name} com {selectedBarber} às {selectedTime}
        </p>
        <p className="text-[#444] text-xs mb-8">Barbearia Da Vinci · {selectedService?.price}</p>
        <Link
          href="/agendar/meu-agendamento"
          className="rounded-xl font-bold text-[#0A0A0A] px-8 py-3.5 text-sm hover:opacity-90 transition-all"
          style={{ background: "#C9A84C" }}
        >
          Ver meu agendamento
        </Link>
      </div>
    );
  }

  if (step === "payment") {
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-4">Resumo do agendamento</p>
          <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-5 space-y-3">
            {[
              { label: "Barbeiro", value: selectedBarber },
              { label: "Serviço", value: `${selectedService?.name} · ${selectedService?.duration}` },
              { label: "Horário", value: `${selectedTime} de hoje` },
              { label: "Local", value: "Barbearia Da Vinci" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center">
                <span className="text-sm text-[#666]">{row.label}</span>
                <span className="text-sm font-medium text-white">{row.value}</span>
              </div>
            ))}
            <div className="border-t border-[#1A1A1A] pt-3 flex justify-between items-center">
              <span className="text-sm font-bold text-white">Total</span>
              <span className="text-lg font-bold" style={{ color: "#C9A84C" }}>{selectedService?.price}</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-3">Forma de pagamento</p>
          <div className="space-y-2">
            {[
              { id: "pix" as PayMethod, label: "Pix", sub: "Aprovação instantânea" },
              { id: "card" as PayMethod, label: "Cartão de crédito", sub: "Visa, Mastercard, Elo" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setPayMethod(m.id)}
                className="w-full flex items-center gap-3 rounded-xl border p-4 transition-all text-left"
                style={{
                  borderColor: payMethod === m.id ? "#C9A84C" : "#1A1A1A",
                  background: payMethod === m.id ? "rgba(201,168,76,0.06)" : "#111",
                }}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: payMethod === m.id ? "#C9A84C" : "#444" }}
                >
                  {payMethod === m.id && <div className="w-2 h-2 rounded-full" style={{ background: "#C9A84C" }} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{m.label}</p>
                  <p className="text-xs text-[#555]">{m.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {payMethod === "pix" && (
          <div className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] p-4">
            <p className="text-xs text-[#555] mb-1">Chave Pix</p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-white">11.987.654.321</span>
              <button className="text-xs text-[#C9A84C] flex items-center gap-1 hover:opacity-80">
                <Copy size={12} /> Copiar
              </button>
            </div>
          </div>
        )}

        {payMethod === "card" && (
          <div className="rounded-xl border border-[#2A2A2A] bg-[#0D0D0D] p-4 space-y-3">
            <div>
              <p className="text-xs text-[#555] mb-1">Número do cartão</p>
              <input
                className="w-full bg-transparent text-sm text-white placeholder:text-[#333] outline-none"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-xs text-[#555] mb-1">Validade</p>
                <input className="w-full bg-transparent text-sm text-white placeholder:text-[#333] outline-none" placeholder="MM/AA" />
              </div>
              <div className="w-20">
                <p className="text-xs text-[#555] mb-1">CVV</p>
                <input className="w-full bg-transparent text-sm text-white placeholder:text-[#333] outline-none" placeholder="123" />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => setStep("select")}
            className="px-5 py-3.5 rounded-xl border border-[#2A2A2A] text-sm text-[#666] hover:text-white transition-all"
          >
            Voltar
          </button>
          <button
            onClick={handlePay}
            disabled={paying}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl font-bold text-[#0A0A0A] py-3.5 text-sm transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: "#C9A84C" }}
          >
            {paying ? (
              <>
                <div className="w-4 h-4 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <CreditCard size={15} />
                Pagar {selectedService?.price}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // step === "select"
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
              onClick={() => setSelectedService(s)}
              className="flex items-center justify-between rounded-xl border px-4 py-3 transition-all text-left"
              style={{
                borderColor: selectedService?.id === s.id ? "#C9A84C" : "#1A1A1A",
                background: selectedService?.id === s.id ? "rgba(201,168,76,0.08)" : "#111",
              }}
            >
              <div>
                <p className="text-sm font-medium text-white">{s.name}</p>
                <p className="text-[11px] text-[#555]">{s.duration}</p>
              </div>
              <span className="text-sm font-bold" style={{ color: selectedService?.id === s.id ? "#C9A84C" : "#fff" }}>
                {s.price}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Time */}
      <div>
        <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-3">
          3. Horário — {selectedBarber}
        </p>
        {freeSlots.length === 0 ? (
          <p className="text-sm text-[#555]">Sem horários livres hoje.</p>
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

      <button
        disabled={!selectedBarber || !selectedService || !selectedTime}
        onClick={() => setStep("payment")}
        className="flex items-center justify-center gap-2 w-full rounded-xl font-bold text-[#0A0A0A] py-4 text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: "#C9A84C" }}
      >
        Ir para pagamento
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
