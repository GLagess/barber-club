"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Star, Clock, CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { MOCK_BARBERSHOP, MOCK_BARBERS, MOCK_SCHEDULE, MOCK_BARBER_BIOS, MOCK_BARBER_SPECIALTIES, TIME_SLOTS } from "@/lib/mock-data";

const services = [
  { name: "Corte Social", duration: "30 min", price: "R$ 45" },
  { name: "Corte + Barba", duration: "60 min", price: "R$ 75" },
  { name: "Degradê", duration: "45 min", price: "R$ 60" },
  { name: "Barba", duration: "30 min", price: "R$ 35" },
];

function BarberCard({ barber, expanded, onToggle }: {
  barber: (typeof MOCK_BARBERS)[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  const bio = MOCK_BARBER_BIOS[barber.name] ?? "";
  const specialties = MOCK_BARBER_SPECIALTIES[barber.name] ?? [];
  const schedule = MOCK_SCHEDULE[barber.name] ?? {};
  const freeSlots = TIME_SLOTS.filter((t) => !schedule[t] || schedule[t].status === "free").slice(0, 4);

  return (
    <div
      className="rounded-2xl border transition-all duration-200"
      style={{
        borderColor: expanded ? "rgba(201,168,76,0.3)" : "#1A1A1A",
        background: expanded ? "rgba(201,168,76,0.04)" : "#111",
      }}
    >
      {/* Card header (always visible) */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shrink-0"
          style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C", fontFamily: "var(--font-display)" }}
        >
          {barber.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-sm">{barber.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={11} fill="#C9A84C" stroke="#C9A84C" />
            <span className="text-xs font-semibold text-white">{barber.rating}</span>
            <span className="text-xs text-[#555]">· {barber.appointmentsToday} hoje</span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp size={16} className="text-[#C9A84C] shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-[#555] shrink-0" />
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-[#1A1A1A] pt-4 space-y-4">
          <p className="text-sm text-[#888] leading-relaxed">{bio}</p>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {specialties.map((s) => (
              <span
                key={s}
                className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
                style={{ background: "rgba(201,168,76,0.08)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.15)" }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Free slots preview */}
          <div>
            <p className="text-xs text-[#555] mb-2 flex items-center gap-1">
              <Calendar size={11} /> Próximos horários livres hoje
            </p>
            <div className="flex gap-2 flex-wrap">
              {freeSlots.length > 0 ? freeSlots.map((t) => (
                <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[#2A2A2A] text-[#888] bg-[#0D0D0D]">
                  {t}
                </span>
              )) : (
                <span className="text-xs text-[#555]">Sem horários livres hoje</span>
              )}
            </div>
          </div>

          <Link
            href={`/agendar/barbearias/agendar?barber=${barber.name}`}
            className="flex items-center justify-center gap-2 rounded-xl font-bold text-[#0A0A0A] py-3 text-sm transition-all hover:opacity-90 w-full"
            style={{ background: "#C9A84C" }}
          >
            Agendar com {barber.name}
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function BarbeariasPage() {
  const [expandedBarber, setExpandedBarber] = useState<string | null>(null);

  function toggleBarber(name: string) {
    setExpandedBarber((prev) => (prev === name ? null : name));
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/agendar" className="text-xs text-[#555] hover:text-[#888] transition-colors mb-4 inline-flex items-center gap-1">
          ← Voltar
        </Link>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Barbearias
        </h1>
        <p className="text-[#666] text-sm mt-1">Escolha um estabelecimento e reserve seu horário</p>
      </div>

      {/* Barbershop card */}
      <div className="rounded-2xl border border-[#1A1A1A] bg-[#111] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}
                >
                  ABERTO AGORA
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
                {MOCK_BARBERSHOP.name}
              </h2>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-sm text-[#666]">
                  <MapPin size={13} style={{ color: "#C9A84C" }} />
                  {MOCK_BARBERSHOP.address} — {MOCK_BARBERSHOP.city}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={13} fill="#C9A84C" stroke="#C9A84C" />
                  <span className="text-white font-semibold">{MOCK_BARBERSHOP.rating}</span>
                  <span className="text-[#555]">({MOCK_BARBERSHOP.totalReviews} avaliações)</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0 text-xs text-[#555]">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                Seg–Sáb: 09:00–18:00
              </div>
            </div>
          </div>
        </div>

        {/* Best professionals */}
        <div className="p-6 border-b border-[#1A1A1A]">
          <p className="text-xs font-bold text-[#888] uppercase tracking-wider mb-4">
            Melhores profissionais
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[...MOCK_BARBERS].sort((a, b) => b.rating - a.rating).map((barber) => (
              <BarberCard
                key={barber.id}
                barber={barber}
                expanded={expandedBarber === barber.name}
                onToggle={() => toggleBarber(barber.name)}
              />
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="p-6">
          <p className="text-xs font-bold text-[#888] uppercase tracking-wider mb-4">Serviços disponíveis</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {services.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between rounded-xl border border-[#1A1A1A] bg-[#0D0D0D] px-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={14} style={{ color: "#C9A84C" }} />
                  <div>
                    <p className="text-sm font-medium text-white">{s.name}</p>
                    <p className="text-[11px] text-[#555]">{s.duration}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-white">{s.price}</span>
              </div>
            ))}
          </div>
          <Link
            href="/agendar/barbearias/agendar"
            className="w-full flex items-center justify-center gap-2 rounded-xl font-bold text-[#0A0A0A] py-3.5 text-sm transition-all hover:opacity-90"
            style={{ background: "#C9A84C" }}
          >
            Agendar horário
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
