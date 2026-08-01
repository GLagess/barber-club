import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import {
  Building2, CalendarDays, Users, Star,
  MapPin, LayoutDashboard, ArrowRight
} from "lucide-react";
import { HomeSignOut } from "./home-signout";

const roleConfig: Record<string, {
  label: string;
  description: string;
  links: { href: string; label: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }> }[];
}> = {
  OWNER: {
    label: "Proprietário",
    description: "Gerencie sua barbearia, equipe e agenda",
    links: [
      { href: "/dashboard/loja", label: "Visão Geral", icon: LayoutDashboard },
      { href: "/dashboard/loja/agenda", label: "Agenda", icon: CalendarDays },
      { href: "/dashboard/loja/equipe", label: "Equipe", icon: Users },
      { href: "/dashboard/loja/feedbacks", label: "Feedbacks", icon: Star },
    ],
  },
  BARBER_FIXED: {
    label: "Barbeiro Fixo",
    description: "Acesse sua agenda e a da barbearia",
    links: [
      { href: "/dashboard/cadeira", label: "Minha Agenda", icon: CalendarDays },
      { href: "/dashboard/cadeira/barbearia", label: "Agenda da Barbearia", icon: Building2 },
    ],
  },
  BARBER_MOBILE: {
    label: "Barbeiro Avulso",
    description: "Gerencie seus atendimentos a domicílio",
    links: [
      { href: "/dashboard/autonomo", label: "Minha Agenda", icon: CalendarDays },
    ],
  },
  CUSTOMER: {
    label: "Cliente",
    description: "Agende seu próximo corte",
    links: [
      { href: "/agendar/barbearias", label: "Barbearias", icon: Building2 },
      { href: "/agendar/domicilio", label: "A Domicílio", icon: MapPin },
    ],
  },
  ADMIN: {
    label: "Administrador",
    description: "Painel de controle da plataforma",
    links: [
      { href: "/admin", label: "Admin", icon: LayoutDashboard },
    ],
  },
};

export default async function HomePage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const role = session.user.role as string | undefined;
  if (!role) redirect("/onboarding");

  const config = roleConfig[role];
  const firstName = session.user.name?.split(" ")[0] ?? "usuário";

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Top nav */}
      <nav className="border-b border-[#1A1A1A] bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Logo size={28} />
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#555] hidden sm:block">{session.user.email}</span>
            <HomeSignOut />
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        {/* Welcome */}
        <div className="mb-10">
          <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-2">
            {config?.label}
          </p>
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Olá, {firstName}!
          </h1>
          <p className="text-[#666]">{config?.description}</p>
        </div>

        {/* Quick access cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config?.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between rounded-2xl border border-[#1A1A1A] bg-[#111] p-5 hover:border-[#2A2A2A] hover:bg-[#161616] transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(201,168,76,0.1)" }}
                >
                  <link.icon size={18} strokeWidth={1.5} style={{ color: "#C9A84C" }} />
                </div>
                <span className="font-semibold text-white text-sm">{link.label}</span>
              </div>
              <ArrowRight size={15} className="text-[#333] group-hover:text-[#666] transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
