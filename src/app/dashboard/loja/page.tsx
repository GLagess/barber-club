import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CalendarDays, TrendingUp, Star, Users, ArrowRight, Clock } from "lucide-react";
import { MOCK_STATS_OWNER, MOCK_BARBERSHOP } from "@/lib/mock-data";
import { StatsCard } from "@/components/dashboard/stats-card";

export default async function LojaPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const stats = MOCK_STATS_OWNER;
  const shop = MOCK_BARBERSHOP;

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}
          >
            Aprovada
          </span>
        </div>
        <h1
          className="text-3xl font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {shop.name}
        </h1>
        <p className="text-[#666] text-sm mt-1">{shop.address} · {shop.city}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Agendamentos hoje" value={stats.appointmentsToday} icon={CalendarDays} sub="4 barbeiros ativos" />
        <StatsCard title="Agendamentos na semana" value={stats.appointmentsWeek} icon={TrendingUp} />
        <StatsCard title="Faturamento estimado" value={stats.revenue} icon={TrendingUp} gold />
        <StatsCard title="Avaliação média" value={`${stats.avgRating} ★`} icon={Star} sub="127 avaliações" gold />
      </div>

      {/* Quick access */}
      <h2
        className="text-lg font-bold text-white mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Acesso rápido
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: "/dashboard/loja/agenda", icon: CalendarDays, title: "Ver Agenda", desc: "Grade de horários dos barbeiros" },
          { href: "/dashboard/loja/equipe", icon: Users, title: "Gerenciar Equipe", desc: "Kassiel, Gabriel, Josenilson e mais" },
          { href: "/dashboard/loja/feedbacks", icon: Star, title: "Feedbacks", desc: "127 avaliações — média 4.8 ★" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl border border-[#1A1A1A] bg-[#111] p-5 hover:border-[#2A2A2A] hover:bg-[#161616] transition-all flex items-start justify-between gap-3"
          >
            <div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: "rgba(201,168,76,0.1)" }}
              >
                <item.icon size={18} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
              </div>
              <p className="font-semibold text-white text-sm">{item.title}</p>
              <p className="text-xs text-[#666] mt-0.5">{item.desc}</p>
            </div>
            <ArrowRight size={16} className="text-[#444] group-hover:text-[#666] transition-colors mt-1 shrink-0" />
          </Link>
        ))}
      </div>

      {/* Recent activity hint */}
      <div className="mt-8 rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-5">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={15} style={{ color: "#C9A84C" }} />
          <p className="text-sm font-semibold text-white">Próximos agendamentos hoje</p>
        </div>
        {[
          { time: "13:00", client: "Lucas Martins", barber: "Lages", service: "Corte + Barba" },
          { time: "13:00", client: "André Costa", barber: "Kassiel", service: "Corte + Barba" },
          { time: "13:00", client: "Eduardo Lopes", barber: "Gabriel", service: "Degradê" },
          { time: "13:30", client: "Samuel Costa", barber: "Josenilson", service: "Corte Social" },
        ].map((a, i) => (
          <div key={i} className="flex items-center gap-4 py-2.5 border-b border-[#1A1A1A] last:border-0">
            <span className="text-sm font-mono text-[#C9A84C] w-12 shrink-0">{a.time}</span>
            <span className="text-sm text-white flex-1">{a.client}</span>
            <span className="text-xs text-[#555]">{a.barber} · {a.service}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
