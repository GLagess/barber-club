import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CalendarDays, Star, Clock, Building2 } from "lucide-react";
import { MOCK_SCHEDULE, MOCK_STATS_BARBER, MOCK_BARBERSHOP, TIME_SLOTS, type Slot } from "@/lib/mock-data";
import Link from "next/link";
import { StatsCard } from "@/components/dashboard/stats-card";

function SlotRow({ time, slot }: { time: string; slot: Slot | undefined }) {
  const isFree = !slot || slot.status === "free";
  const isBreak = slot?.status === "break";
  const isOccupied = slot?.status === "occupied";

  return (
    <div className="flex items-center gap-4 py-2 border-b border-[#111] last:border-0">
      <span className="text-sm font-mono text-[#555] w-14 shrink-0">{time}</span>
      <div
        className="flex-1 rounded-xl px-3 py-2"
        style={{
          background: isOccupied ? "rgba(201,168,76,0.07)" : isBreak ? "#0F0F0F" : "transparent",
          border: isOccupied ? "1px solid rgba(201,168,76,0.15)" : "1px solid transparent",
        }}
      >
        {isOccupied && slot ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{slot.client ?? "Cliente"}</p>
              {slot.service && <p className="text-xs text-[#666]">{slot.service}</p>}
            </div>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}
            >
              Confirmado
            </span>
          </div>
        ) : isBreak ? (
          <span className="text-xs text-[#444]">Intervalo</span>
        ) : (
          <span className="text-xs text-[#2A2A2A]">Horário livre</span>
        )}
      </div>
    </div>
  );
}

export default async function CadeiraPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  // Use "Kassiel" as the demo barber; in production, match by session user name
  const barberName = "Kassiel";
  const schedule = MOCK_SCHEDULE[barberName] ?? {};
  const stats = MOCK_STATS_BARBER[barberName];

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-1">Barbeiro Fixo</p>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Minha Agenda
        </h1>
        <p className="text-[#666] text-sm mt-1">
          {MOCK_BARBERSHOP.name} ·{" "}
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCard title="Agendamentos hoje" value={stats?.appointmentsToday ?? 0} icon={CalendarDays} />
        <StatsCard title="Próximo horário livre" value={stats?.nextSlot ?? "—"} icon={Clock} />
        <StatsCard title="Avaliação média" value={`${stats?.avgRating ?? "—"} ★`} icon={Star} gold />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-5">
            <h2 className="text-base font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Meus horários de hoje
            </h2>
            {TIME_SLOTS.map((time) => (
              <SlotRow key={time} time={time} slot={schedule[time]} />
            ))}
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#1A1A1A] bg-[#111] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Building2 size={15} style={{ color: "#C9A84C" }} />
              <p className="text-sm font-semibold text-white">Minha Barbearia</p>
            </div>
            <p className="text-base font-bold text-white mb-0.5">{MOCK_BARBERSHOP.name}</p>
            <p className="text-xs text-[#555] mb-4">{MOCK_BARBERSHOP.address}</p>
            <Link
              href="/dashboard/cadeira/barbearia"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#2A2A2A] text-[#888] hover:text-white hover:border-[#3A3A3A] transition-all text-sm py-2.5 font-medium"
            >
              Ver agenda completa
            </Link>
          </div>

          <div className="rounded-2xl border border-[#1A1A1A] bg-[#111] p-5">
            <p className="text-sm font-semibold text-white mb-3">Resumo do dia</p>
            {[
              { label: "Cortes realizados", value: "3" },
              { label: "Corte + Barba", value: "2" },
              { label: "Degradê", value: "1" },
              { label: "Faturamento est.", value: "R$ 300" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#1A1A1A] last:border-0">
                <span className="text-xs text-[#666]">{item.label}</span>
                <span className="text-xs font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
