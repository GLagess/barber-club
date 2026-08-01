import { MOCK_BARBERS, MOCK_STATS_BARBER } from "@/lib/mock-data";
import { Star, CalendarDays, UserPlus } from "lucide-react";

function roleLabel(role: string) {
  if (role === "OWNER") return "Proprietário";
  if (role === "BARBER_FIXED") return "Barbeiro Fixo";
  return role;
}

export default function EquipePage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Equipe
          </h1>
          <p className="text-[#666] text-sm mt-1">{MOCK_BARBERS.length} profissionais na Barbearia Da Vinci</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[#2A2A2A] text-[#888] hover:text-white hover:border-[#3A3A3A] transition-all"
        >
          <UserPlus size={15} />
          Convidar Barbeiro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_BARBERS.map((barber) => {
          const barberStats = MOCK_STATS_BARBER[barber.name];
          return (
            <div key={barber.id} className="rounded-2xl border border-[#1A1A1A] bg-[#111] p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0"
                  style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C", fontFamily: "var(--font-display)" }}
                >
                  {barber.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-white text-base">{barber.name}</p>
                    {barber.role === "OWNER" && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}
                      >
                        DONO
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#666]">{roleLabel(barber.role)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="rounded-xl bg-[#0D0D0D] border border-[#1A1A1A] p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <CalendarDays size={12} style={{ color: "#C9A84C" }} />
                    <span className="text-[10px] text-[#555] uppercase tracking-wider">Hoje</span>
                  </div>
                  <p className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {barberStats?.appointmentsToday ?? 0}
                  </p>
                  <p className="text-[10px] text-[#555]">agendamentos</p>
                </div>
                <div className="rounded-xl bg-[#0D0D0D] border border-[#1A1A1A] p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Star size={12} style={{ color: "#C9A84C" }} />
                    <span className="text-[10px] text-[#555] uppercase tracking-wider">Avaliação</span>
                  </div>
                  <p className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {barber.rating}
                  </p>
                  <p className="text-[10px] text-[#555]">média geral</p>
                </div>
              </div>

              {barberStats?.nextSlot && (
                <p className="text-xs text-[#555] mt-3">
                  Próximo horário livre: <span className="text-[#888]">{barberStats.nextSlot}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
