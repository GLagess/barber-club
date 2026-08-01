"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight, CheckCircle2, Building2, User, Users,
  CalendarDays, Star
} from "lucide-react";

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: "500+", label: "Barbearias ativas" },
  { value: "2.000+", label: "Barbeiros cadastrados" },
  { value: "50k+", label: "Agendamentos realizados" },
  { value: "4.9", label: "Estrelas de avaliação" },
];

const roleCards = [
  {
    icon: Building2,
    title: "Proprietários",
    description: "Dashboard completo para quem gerencia barbearias físicas",
    bullets: [
      "Controle de agenda e equipe",
      "Relatórios financeiros em tempo real",
      "Gestão de serviços e preços",
      "Avaliações e feedbacks dos clientes",
    ],
  },
  {
    icon: User,
    title: "Barbeiros",
    description: "Ferramentas para profissionais fixos e autônomos",
    bullets: [
      "Agenda digital integrada",
      "Modo fixo ou autônomo (home service)",
      "Histórico de clientes e serviços",
      "Comissões calculadas automaticamente",
    ],
  },
  {
    icon: Users,
    title: "Clientes",
    description: "Experiência simples e moderna de agendamento",
    bullets: [
      "Busca por barbeiros próximos",
      "Agendamento com 1 clique",
      "Confirmação automática por notificação",
      "Sistema de avaliação pós-atendimento",
    ],
  },
];

const steps = [
  {
    num: "01",
    icon: User,
    title: "Crie sua conta",
    desc: "Cadastre-se gratuitamente em menos de 1 minuto. Sem cartão de crédito necessário.",
  },
  {
    num: "02",
    icon: Building2,
    title: "Configure seu perfil",
    desc: "Defina seu perfil (proprietário, barbeiro ou cliente) e personalize suas configurações.",
  },
  {
    num: "03",
    icon: CalendarDays,
    title: "Comece a usar",
    desc: "Gerencie agendas, equipes e clientes direto do seu dashboard personalizado.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[#1A1A1A] bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo size={32} />
          <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#funcionalidades" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm text-white/60 hover:text-white transition-colors px-3 py-1.5">
              Entrar
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-semibold text-[#0A0A0A] px-4 py-1.5 rounded-lg transition-all hover:opacity-90"
              style={{ background: "#C9A84C" }}
            >
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-8 text-xs font-semibold tracking-widest uppercase"
              style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)" }}
            >
              <Star size={10} fill="currentColor" />
              Plataforma #1 para barbearias no Brasil
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sua barbearia
              <br />
              <span style={{ color: "#C9A84C" }}>gerenciada</span> com
              <br />
              inteligência.
            </h1>
            <p className="text-lg text-[#888] max-w-xl mb-10 leading-relaxed">
              Gestão completa para proprietários, barbeiros fixos e autônomos. Agenda, financeiro, equipe e clientes — tudo em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-[#0A0A0A] px-8 py-4 text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "#C9A84C" }}
              >
                Criar conta gratuita
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-white/70 hover:text-white px-8 py-4 text-sm transition-all border border-[#2A2A2A] hover:border-[#3A3A3A] bg-[#111]"
              >
                Já tenho conta
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[#1A1A1A] bg-[#0D0D0D] py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <p
                  className="text-3xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-display)", color: "#C9A84C" }}
                >
                  {s.value}
                </p>
                <p className="text-sm text-[#666]">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Para quem é */}
      <section id="funcionalidades" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-14">
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#C9A84C" }}>
                Funcionalidades
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Feito para cada perfil
              </h2>
              <p className="text-[#666] mt-3 text-lg max-w-lg">
                Uma plataforma, três experiências distintas — cada uma otimizada para quem vai usar.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roleCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-[#1A1A1A] bg-[#111] p-8 h-full flex flex-col">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shrink-0"
                    style={{ background: "rgba(201,168,76,0.12)" }}
                  >
                    <card.icon size={22} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
                  </div>
                  <h3
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-[#666] text-sm mb-6">{card.description}</p>
                  <ul className="space-y-2.5 mt-auto">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-[#999]">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "#C9A84C" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="py-28 px-6 bg-[#0D0D0D] border-y border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-16 text-center">
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#C9A84C" }}>
                Como funciona
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Em 3 passos simples
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.12}>
                <div className="relative">
                  <p
                    className="text-7xl font-black leading-none mb-6 select-none"
                    style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
                  >
                    {step.num}
                  </p>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(201,168,76,0.12)" }}
                  >
                    <step.icon size={20} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {step.title}
                  </h3>
                  <p className="text-[#666] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div
              className="rounded-3xl p-14 md:p-20 text-center"
              style={{ background: "#111", border: "1px solid #1A1A1A" }}
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#C9A84C" }}>
                Comece hoje
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-xl mx-auto leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Pronto para modernizar sua barbearia?
              </h2>
              <p className="text-[#666] mb-10 max-w-md mx-auto">
                Junte-se a centenas de barbearias que já usam o Use Barber Club. Grátis para começar.
              </p>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 rounded-xl font-bold text-[#0A0A0A] px-10 py-4 text-sm transition-all hover:opacity-90"
                style={{ background: "#C9A84C" }}
              >
                Criar conta gratuita
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size={28} />
          <p className="text-[#444] text-sm">© {new Date().getFullYear()} Use Barber Club — userbarberclub.com</p>
          <div className="flex gap-6 text-sm text-[#444]">
            <Link href="/sign-in" className="hover:text-white transition-colors">Entrar</Link>
            <Link href="/sign-up" className="hover:text-white transition-colors">Cadastrar</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
