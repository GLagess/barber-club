import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 space-y-8">
        <div className="space-y-6">
          <Image
            src="/logo.png"
            alt="Use Barber Club"
            width={200}
            height={200}
            className="mx-auto"
            priority
          />
          <div className="space-y-3">
            <p className="text-gold text-sm font-semibold tracking-widest uppercase">
              A plataforma para barbearias modernas
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Use Barber Club
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
              Gestão completa para barbearias, barbeiros fixos e profissionais avulsos — tudo em
              um só lugar.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/sign-up"
            className="rounded-lg bg-gold px-8 py-3 font-semibold text-background hover:bg-gold-light transition-colors"
          >
            Começar gratuitamente
          </Link>
          <Link
            href="/sign-in"
            className="rounded-lg border border-dark-border px-8 py-3 font-semibold text-foreground hover:border-gold/50 transition-colors"
          >
            Entrar
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-dark-border py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🏪",
              title: "Para Barbearias",
              text: "Gerencie agendas, barbeiros e relatórios financeiros em um dashboard unificado.",
            },
            {
              icon: "💈",
              title: "Para Barbeiros",
              text: "Vincule-se a uma barbearia ou opere de forma autônoma com sua agenda digital.",
            },
            {
              icon: "✂️",
              title: "Para Clientes",
              text: "Agende com seu barbeiro favorito ou encontre um profissional a domicílio.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-dark-border bg-dark-card p-6 space-y-3"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-dark-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Use Barber Club — userbarberclub.com
      </footer>
    </main>
  );
}
