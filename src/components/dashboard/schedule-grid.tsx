"use client";

import { TIME_SLOTS, MOCK_SCHEDULE, type Slot } from "@/lib/mock-data";

interface ScheduleGridProps {
  barbers: string[];
  schedule?: Record<string, Record<string, Slot>>;
}

function SlotCell({ slot }: { slot: Slot | undefined }) {
  if (!slot || slot.status === "free") {
    return (
      <div className="h-14 rounded-lg border border-[#1A1A1A] bg-[#0D0D0D] flex items-center justify-center">
        <span className="text-xs text-[#333]">Livre</span>
      </div>
    );
  }
  if (slot.status === "break") {
    return (
      <div className="h-14 rounded-lg border border-[#2A2A2A] bg-[#161616] flex items-center justify-center">
        <span className="text-xs text-[#444]">Intervalo</span>
      </div>
    );
  }
  // occupied
  return (
    <div
      className="h-14 rounded-lg flex flex-col items-start justify-center px-2 gap-0.5"
      style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.18)" }}
    >
      {slot.client && (
        <span className="text-xs font-semibold text-white truncate w-full leading-tight">{slot.client}</span>
      )}
      {slot.service && (
        <span className="text-[10px] text-[#888] truncate w-full">{slot.service}</span>
      )}
      {!slot.client && (
        <span className="text-xs text-[#C9A84C]">Ocupado</span>
      )}
    </div>
  );
}

export function ScheduleGrid({ barbers, schedule = MOCK_SCHEDULE }: ScheduleGridProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1A1A1A]">
      <div className="min-w-[700px]">
        {/* Header */}
        <div
          className="grid gap-2 p-3 border-b border-[#1A1A1A] bg-[#0D0D0D]"
          style={{ gridTemplateColumns: `80px repeat(${barbers.length}, 1fr)` }}
        >
          <div />
          {barbers.map((b) => (
            <div key={b} className="text-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-1"
                style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}
              >
                {b.slice(0, 2).toUpperCase()}
              </div>
              <p className="text-xs font-semibold text-white">{b}</p>
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="p-3 space-y-1.5 bg-[#0A0A0A]">
          {TIME_SLOTS.map((time) => (
            <div
              key={time}
              className="grid gap-2 items-center"
              style={{ gridTemplateColumns: `80px repeat(${barbers.length}, 1fr)` }}
            >
              <span className="text-xs text-[#555] font-mono text-right pr-3">{time}</span>
              {barbers.map((b) => (
                <SlotCell key={b} slot={schedule[b]?.[time]} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
