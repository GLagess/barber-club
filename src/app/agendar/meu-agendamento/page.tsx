"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Scissors, MapPin, RefreshCw, AlertCircle, X } from "lucide-react";
import { MOCK_SCHEDULE, TIME_SLOTS } from "@/lib/mock-data";

const MOCK_APPOINTMENT = {
  barber: "Kassiel",
  barbershop: "Barbearia Da Vinci",
  service: "Corte + Barba",
  price: "R$ 75,00",
  time: "14:00",
  date: "Hoje",
  paymentMethod: "Pix",
};

const services = [
  { name: "Corte Social", price: "R$ 45" },
  { name: "Corte + Barba", price: "R$ 75" },
  { name: "Degradê", price: "R$ 60" },
  { name: "Barba", price: "R$ 35" },
];

type ActivePanel = null | "time" | "service";

interface ConfirmModalProps {
  type: "time" | "service";
  newValue: string;
  barber: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ type, newValue, barber, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="w-full max-w-sm rounded-2xl border border-[#2A2A2A] bg-[#111] p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(201,168,76,0.1)" }}
          >
            <AlertCircle size={18} style={{ color: "#C9A84C" }} />
          </div>
          <button onClick={onCancel} className="text-[#555] hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
        <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Confirmar alteração
        </h3>
        <p className="text-sm text-[#666] mb-1">
          {type === "time" ? `Novo horário: ${newValue}` : `Novo serviço: ${newValue}`}
        </p>
        <p className="text-sm text-[#555] mb-6">
          Ao confirmar, o barbeiro <span className="text-[#888]">{barber}</span> e a{" "}
          <span className="text-[#888]">Barbearia Da Vinci</span> serão notificados sobre a alteração.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-[#2A2A2A] text-sm text-[#666] hover:text-white transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl font-bold text-[#0A0A0A] text-sm transition-all hover:opacity-90"
            style={{ background: "#C9A84C" }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MeuAgendamentoPage() {
  const [appointment, setAppointment] = useState(MOCK_APPOINTMENT);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [pendingValue, setPendingValue] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [notified, setNotified] = useState(false);

  const freeSlots = TIME_SLOTS.filter((t) => {
    const s = MOCK_SCHEDULE[appointment.barber]?.[t];
    return !s || s.status === "free";
  });

  function requestChange(value: string) {
    setPendingValue(value);
    setShowModal(true);
  }

  function confirmChange() {
    if (!pendingValue || !activePanel) return;
    if (activePanel === "time") {
      setAppointment((prev) => ({ ...prev, time: pendingValue }));
    } else {
      const svc = services.find((s) => s.name === pendingValue);
      setAppointment((prev) => ({ ...prev, service: pendingValue, price: svc?.price ?? prev.price }));
    }
    setShowModal(false);
    setActivePanel(null);
    setPendingValue(null);
    setNotified(true);
    setTimeout(() => setNotified(false), 4000);
  }

  return (
    <div className="p-8 max-w-2xl">
      {showModal && pendingValue && (
        <ConfirmModal
          type={activePanel!}
          newValue={pendingValue}
          barber={appointment.barber}
          onConfirm={confirmChange}
          onCancel={() => { setShowModal(false); setPendingValue(null); }}
        />
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Meu Agendamento
        </h1>
        <p className="text-[#666] text-sm mt-1">Gerencie seu próximo atendimento</p>
      </div>

      {/* Appointment card */}
      <div className="rounded-2xl border border-[#1A1A1A] bg-[#111] overflow-hidden mb-6">
        <div className="p-5 border-b border-[#1A1A1A]">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={16} style={{ color: "#22c55e" }} />
            <span className="text-sm font-semibold" style={{ color: "#22c55e" }}>Confirmado · Pago via {appointment.paymentMethod}</span>
          </div>

          {[
            { icon: MapPin, label: "Local", value: appointment.barbershop },
            { icon: RefreshCw, label: "Barbeiro", value: appointment.barber },
            { icon: Scissors, label: "Serviço", value: `${appointment.service} · ${appointment.price}` },
            { icon: Clock, label: "Horário", value: `${appointment.date}, ${appointment.time}` },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3 py-2.5 border-b border-[#1A1A1A] last:border-0">
              <row.icon size={14} style={{ color: "#C9A84C" }} className="shrink-0" />
              <span className="text-xs text-[#555] w-16 shrink-0">{row.label}</span>
              <span className="text-sm font-medium text-white">{row.value}</span>
            </div>
          ))}
        </div>

        {notified && (
          <div
            className="px-5 py-3 text-sm flex items-center gap-2"
            style={{ background: "rgba(34,197,94,0.07)", color: "#22c55e", borderBottom: "1px solid rgba(34,197,94,0.15)" }}
          >
            <CheckCircle2 size={14} />
            Alteração notificada ao barbeiro e ao estabelecimento ✓
          </div>
        )}

        <div className="p-5 flex gap-3">
          <button
            onClick={() => setActivePanel(activePanel === "time" ? null : "time")}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all"
            style={{
              borderColor: activePanel === "time" ? "#C9A84C" : "#2A2A2A",
              color: activePanel === "time" ? "#C9A84C" : "#888",
              background: activePanel === "time" ? "rgba(201,168,76,0.08)" : "transparent",
            }}
          >
            <Clock size={14} />
            Trocar horário
          </button>
          <button
            onClick={() => setActivePanel(activePanel === "service" ? null : "service")}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all"
            style={{
              borderColor: activePanel === "service" ? "#C9A84C" : "#2A2A2A",
              color: activePanel === "service" ? "#C9A84C" : "#888",
              background: activePanel === "service" ? "rgba(201,168,76,0.08)" : "transparent",
            }}
          >
            <Scissors size={14} />
            Trocar corte
          </button>
        </div>
      </div>

      {/* Time panel */}
      {activePanel === "time" && (
        <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-5 mb-4">
          <p className="text-sm font-semibold text-white mb-3">Horários disponíveis — {appointment.barber}</p>
          <div className="flex flex-wrap gap-2">
            {freeSlots.filter((t) => t !== appointment.time).map((t) => (
              <button
                key={t}
                onClick={() => requestChange(t)}
                className="px-4 py-2 rounded-xl text-sm font-mono border border-[#2A2A2A] bg-[#111] text-[#888] hover:border-[#C9A84C]/40 hover:text-white transition-all"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Service panel */}
      {activePanel === "service" && (
        <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-5 mb-4">
          <p className="text-sm font-semibold text-white mb-3">Escolha um novo serviço</p>
          <div className="space-y-2">
            {services.filter((s) => s.name !== appointment.service).map((s) => (
              <button
                key={s.name}
                onClick={() => requestChange(s.name)}
                className="w-full flex items-center justify-between rounded-xl border border-[#2A2A2A] bg-[#111] px-4 py-3 text-left hover:border-[#3A3A3A] transition-all"
              >
                <span className="text-sm font-medium text-white">{s.name}</span>
                <span className="text-sm font-bold" style={{ color: "#C9A84C" }}>{s.price}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <Link
        href="/agendar"
        className="text-xs text-[#444] hover:text-[#666] transition-colors"
      >
        ← Voltar ao início
      </Link>
    </div>
  );
}
