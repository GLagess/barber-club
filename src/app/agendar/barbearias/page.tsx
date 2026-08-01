import Link from "next/link";
import { MapPin, Star, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { MOCK_BARBERSHOP, MOCK_BARBERS } from "@/lib/mock-data";

const services = [
  { name: "Corte Social", duration: "30 min", price: "R$ 45" },
  { name: "Corte + Barba", duration: "60 min", price: "R$ 75" },
  { name: "Degradê", duration: "45 min", price: "R$ 60" },
  { name: "Barba", duration: "30 min", price: "R$ 35" },
];

export default function BarbeariasPage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/agendar" className="text-xs text-[#555] hover:text-[#888] transition-colors mb-4 inline-flex items-center gap-1">
          ← Voltar
        </Link>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Barbearias
        </h1>
        <p className="text-[#666] text-sm mt-1">Escolha uma barbearia e reserve seu horário</p>
      </div>

      {/* Barbershop card */}
      <div className="rounded-2xl border border-[#1A1A1A] bg-[#111] overflow-hidden mb-6">
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}
                >
                  ABERTO AGORA
                </span>
              </div>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {MOCK_BARBERSHOP.name}
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-sm text-[#666]">
                  <MapPin size={13} style={{ color: "#C9A84C" }} />
                  {MOCK_BARBERSHOP.address} — {MOCK_BARBERSHOP.city}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={13} fill="#C9A84C" stroke="#C9A84C" />
                  <span className="text-white font-semibold">{MOCK_BARBERSHOP.rating}</span>
                  <span className="text-[#555]">({MOCK_BARBERSHOP.totalReviews})</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 text-xs text-[#555]">
                <Clock size={12} />
                Seg–Sáb: 09:00 – 18:00
              </div>
            </div>
          </div>
        </div>

        {/* Barbers */}
        <div className="p-6 border-b border-[#1A1A1A]">
          <p className="text-xs font-bold text-[#888] uppercase tracking-wider mb-4">Escolha seu barbeiro</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {MOCK_BARBERS.map((barber) => (
              <Link
                key={barber.id}
                href={`/agendar/barbearias/agendar?barber=${barber.name}`}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-[#1A1A1A] bg-[#0D0D0D] hover:border-[#C9A84C]/30 hover:bg-[#131313] transition-all text-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold"
                  style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C", fontFamily: "var(--font-display)" }}
                >
                  {barber.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{barber.name}</p>
                  <div className="flex items-center gap-0.5 justify-center mt-0.5">
                    <Star size={10} fill="#C9A84C" stroke="#C9A84C" />
                    <span className="text-[11px] text-[#666]">{barber.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="p-6">
          <p className="text-xs font-bold text-[#888] uppercase tracking-wider mb-4">Serviços disponíveis</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl font-bold text-[#0A0A0A] py-3.5 text-sm transition-all hover:opacity-90"
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
