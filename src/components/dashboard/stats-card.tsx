import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  sub?: string;
  gold?: boolean;
}

export function StatsCard({ title, value, icon: Icon, sub, gold }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-[#1A1A1A] bg-[#111] p-6">
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm text-[#666]">{title}</p>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(201,168,76,0.1)" }}
        >
          <Icon size={18} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
        </div>
      </div>
      <p
        className="text-3xl font-bold text-white leading-none mb-1"
        style={{ fontFamily: "var(--font-display)", color: gold ? "#C9A84C" : undefined }}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-[#555] mt-1">{sub}</p>}
    </div>
  );
}
