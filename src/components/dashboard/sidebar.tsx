"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/logo";
import {
  LayoutDashboard, CalendarDays, Users, Star, LogOut,
  Building2, Settings, CalendarRange, ShoppingBag, ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string; icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }> };

const ownerNav: NavItem[] = [
  { label: "Visão Geral", href: "/dashboard/loja", icon: LayoutDashboard },
  { label: "Agenda", href: "/dashboard/loja/agenda", icon: CalendarDays },
  { label: "Equipe", href: "/dashboard/loja/equipe", icon: Users },
  { label: "Feedbacks", href: "/dashboard/loja/feedbacks", icon: Star },
];

const barberFixedNav: NavItem[] = [
  { label: "Minha Agenda", href: "/dashboard/cadeira", icon: CalendarDays },
  { label: "Agenda da Barbearia", href: "/dashboard/cadeira/barbearia", icon: Building2 },
];

const barberMobileNav: NavItem[] = [
  { label: "Minha Agenda", href: "/dashboard/autonomo", icon: CalendarRange },
  { label: "Configurações", href: "/dashboard/autonomo/config", icon: Settings },
];

const customerNav: NavItem[] = [
  { label: "Agendar", href: "/agendar", icon: ShoppingBag },
  { label: "Barbearias", href: "/agendar/barbearias", icon: Building2 },
  { label: "A Domicílio", href: "/agendar/domicilio", icon: CalendarRange },
  { label: "Meu Agendamento", href: "/agendar/meu-agendamento", icon: ClipboardList },
];

const navByRole: Record<string, NavItem[]> = {
  OWNER: ownerNav,
  BARBER_FIXED: barberFixedNav,
  BARBER_MOBILE: barberMobileNav,
  CUSTOMER: customerNav,
};

interface SidebarProps {
  role: string;
  name: string;
  email: string;
}

export function Sidebar({ role, name, email }: SidebarProps) {
  const pathname = usePathname();
  const items = navByRole[role] ?? [];

  function isActive(href: string) {
    if (href === "/dashboard/loja" || href === "/dashboard/cadeira" || href === "/dashboard/autonomo") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }

  return (
    <aside className="flex flex-col h-screen w-64 shrink-0 border-r border-[#1A1A1A] bg-[#0D0D0D]">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#1A1A1A]">
        <Logo href="/" size={32} />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                active
                  ? "text-white font-semibold"
                  : "text-[#666] hover:text-white hover:bg-white/5"
              )}
              style={active ? { background: "rgba(201,168,76,0.1)", color: "#C9A84C" } : {}}
            >
              <item.icon
                size={17}
                strokeWidth={active ? 2 : 1.5}
                className={active ? "" : "opacity-60"}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="px-3 pb-4 border-t border-[#1A1A1A] pt-4">
        <div className="px-3 mb-3">
          <p className="text-sm font-semibold text-white truncate">{name}</p>
          <p className="text-xs text-[#555] truncate">{email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-[#666] hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Sair
        </button>
      </div>
    </aside>
  );
}
