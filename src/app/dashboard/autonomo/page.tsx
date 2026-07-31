import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardAutonomoPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { mobileSettings: true },
  });

  if (!user || user.role !== "BARBER_MOBILE") redirect("/onboarding");

  const settings = user.mobileSettings;

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gold">Painel Autônomo</h1>
          <p className="text-muted-foreground">
            {settings
              ? `Raio de atendimento: ${settings.radiusKm} km`
              : "Configure suas preferências de atendimento"}
          </p>
        </div>

        {!settings ? (
          <div className="rounded-lg border border-dark-border bg-dark-card p-8 text-center space-y-3">
            <p className="text-muted-foreground">
              Configure seu raio de atendimento e taxa de deslocamento para começar a receber
              agendamentos.
            </p>
            <button className="rounded-lg bg-gold px-6 py-2 font-semibold text-background hover:bg-gold-light transition-colors">
              Configurar Atendimento
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Agendamentos Hoje", value: "—" },
              { label: "Raio de Atendimento", value: `${settings.radiusKm} km` },
              { label: "Taxa de Deslocamento", value: `R$ ${settings.deliveryFeeMin}` },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-dark-border bg-dark-card p-6"
              >
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-gold">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
