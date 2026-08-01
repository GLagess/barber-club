import { MOCK_BARBERS } from "@/lib/mock-data";
import { ScheduleGrid } from "@/components/dashboard/schedule-grid";
import { CalendarDays } from "lucide-react";

export default function AgendaLojaPage() {
  const barberNames = MOCK_BARBERS.map((b) => b.name);

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays size={18} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
          <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest">Agenda</p>
        </div>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Grade de Horários
        </h1>
        <p className="text-[#666] text-sm mt-1">
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-6">
        {[
          { label: "Livre", color: "#0D0D0D", border: "#1A1A1A", text: "#333" },
          { label: "Ocupado", color: "rgba(201,168,76,0.08)", border: "rgba(201,168,76,0.18)", text: "#C9A84C" },
          { label: "Intervalo", color: "#161616", border: "#2A2A2A", text: "#444" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ background: l.color, border: `1px solid ${l.border}` }}
            />
            <span className="text-xs text-[#666]">{l.label}</span>
          </div>
        ))}
      </div>

      <ScheduleGrid barbers={barberNames} />
    </div>
  );
}
