import Link from "next/link";
import Image from "next/image";

const stats = [
  { value: "500+", label: "Barbearias" },
  { value: "2.000+", label: "Barbeiros" },
  { value: "50.000+", label: "Agendamentos" },
  { value: "4.9★", label: "Avaliação média" },
];

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Para Proprietários",
    text: "Dashboard completo com controle de agenda, equipe de barbeiros, serviços e relatórios financeiros em tempo real.",
    tag: "OWNER",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Para Barbeiros",
    text: "Vincule-se a uma barbearia ou opere de forma autônoma. Gerencie sua agenda, precifique serviços e expanda sua clientela.",
    tag: "BARBER",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Para Clientes",
    text: "Encontre os melhores barbeiros da sua cidade, agende com um clique e avalie sua experiência.",
    tag: "CUSTOMER",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Use Barber Club" width={36} height={36} className="rounded-lg" priority />
          <span className="font-bold text-white tracking-tight">Use Barber Club</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm text-white/70 hover:text-white transition-colors px-4 py-1.5"
          >
            Entrar
          </Link>
          <Link
            href="/sign-up"
            className="text-sm bg-[#C9A84C] hover:bg-[#E8C97A] text-[#0A0A0A] font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            Começar grátis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-40 pb-28">
        {/* Radial glow background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,168,76,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Logo with glow */}
        <div className="relative mb-8">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full blur-3xl opacity-40"
            style={{ background: "#C9A84C", transform: "scale(1.4)" }}
          />
          <Image
            src="/logo.png"
            alt="Use Barber Club"
            width={140}
            height={140}
            className="relative rounded-2xl"
            priority
          />
        </div>

        <p className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase mb-4">
          A plataforma para barbearias modernas
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight max-w-3xl mb-6">
          Sua barbearia no{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            próximo nível
          </span>
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Gestão completa para proprietários, barbeiros fixos e profissionais avulsos — tudo integrado, tudo simples.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-xl font-semibold text-[#0A0A0A] px-8 py-3.5 text-sm transition-all hover:shadow-[0_0_24px_rgba(201,168,76,0.5)]"
            style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A)" }}
          >
            Começar gratuitamente
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 rounded-xl font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/20 px-8 py-3.5 text-sm transition-all bg-white/5"
          >
            Já tenho conta
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-white/[0.02] py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p
                className="text-2xl md:text-3xl font-extrabold mb-1"
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #E8C97A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </p>
              <p className="text-white/40 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-3">Funcionalidades</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Feito para cada perfil</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-7 hover:border-[#C9A84C]/30 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 text-[#C9A84C]"
                  style={{ background: "rgba(201,168,76,0.1)" }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.text}</p>
                <div
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div
          className="max-w-3xl mx-auto rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)", border: "1px solid rgba(201,168,76,0.2)" }}
        >
          <div
            aria-hidden
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl opacity-30"
            style={{ background: "#C9A84C" }}
          />
          <h2 className="relative text-3xl md:text-4xl font-extrabold text-white mb-4">
            Pronto para transformar sua barbearia?
          </h2>
          <p className="relative text-white/50 mb-8 max-w-lg mx-auto">
            Crie sua conta agora e comece a usar todas as ferramentas. Sem cartão de crédito, sem compromisso.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-xl font-bold text-[#0A0A0A] px-10 py-4 text-sm transition-all hover:shadow-[0_0_32px_rgba(201,168,76,0.5)]"
            style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A)" }}
          >
            Criar conta gratuita
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Use Barber Club" width={24} height={24} className="rounded" />
            <span className="text-white/30 text-sm">Use Barber Club</span>
          </div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} userbarberclub.com — Todos os direitos reservados</p>
        </div>
      </footer>
    </main>
  );
}
