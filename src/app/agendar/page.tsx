import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Building2, MapPin, ArrowRight, Star } from "lucide-react";

export default async function AgendarPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const firstName = session.user.name?.split(" ")[0] ?? "Cliente";

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-10">
        <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-1">Agendamento</p>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Olá, {firstName}! Como quer agendar?
        </h1>
        <p className="text-[#666] text-sm mt-1">Escolha a modalidade de atendimento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Link
          href="/agendar/barbearias"
          className="group rounded-2xl border border-[#1A1A1A] bg-[#111] p-7 hover:border-[#C9A84C]/30 hover:bg-[#161616] transition-all flex flex-col gap-5"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(201,168,76,0.1)" }}
          >
            <Building2 size={26} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
              Barbearias
            </h2>
            <p className="text-sm text-[#666] leading-relaxed">
              Visite uma barbearia, escolha seu barbeiro favorito e reserve um horário.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#555] group-hover:text-[#C9A84C] transition-colors">
            <Star size={12} fill="#C9A84C" stroke="#C9A84C" />
            <span>Barbearia Da Vinci disponível</span>
            <ArrowRight size={13} className="ml-auto" />
          </div>
        </Link>

        <Link
          href="/agendar/domicilio"
          className="group rounded-2xl border border-[#1A1A1A] bg-[#111] p-7 hover:border-[#C9A84C]/30 hover:bg-[#161616] transition-all flex flex-col gap-5"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(201,168,76,0.1)" }}
          >
            <MapPin size={26} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
              Barbeiro a Domicílio
            </h2>
            <p className="text-sm text-[#666] leading-relaxed">
              Um barbeiro profissional vai até o seu endereço. Conforto e praticidade.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#555] group-hover:text-[#C9A84C] transition-colors">
            <MapPin size={12} style={{ color: "#C9A84C" }} />
            <span>Profissionais no raio de 10 km</span>
            <ArrowRight size={13} className="ml-auto" />
          </div>
        </Link>
      </div>
    </div>
  );
}
