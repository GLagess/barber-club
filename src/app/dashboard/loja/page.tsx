import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardLojaPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { ownedBarbershop: true },
  });

  if (!user || user.role !== "OWNER") redirect("/onboarding");

  const barbershop = user.ownedBarbershop;

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gold">Dashboard da Barbearia</h1>
            <p className="text-muted-foreground">
              {barbershop ? barbershop.name : "Configure sua barbearia para começar"}
            </p>
          </div>
          {barbershop && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                barbershop.status === "APPROVED"
                  ? "bg-green-900/40 text-green-400"
                  : barbershop.status === "PENDING_APPROVAL"
                  ? "bg-yellow-900/40 text-yellow-400"
                  : "bg-red-900/40 text-red-400"
              }`}
            >
              {barbershop.status === "APPROVED"
                ? "Aprovada"
                : barbershop.status === "PENDING_APPROVAL"
                ? "Aguardando aprovação"
                : "Rejeitada"}
            </span>
          )}
        </div>

        {!barbershop ? (
          <div className="rounded-lg border border-dark-border bg-dark-card p-8 text-center space-y-3">
            <p className="text-muted-foreground">Você ainda não cadastrou sua barbearia.</p>
            <button className="rounded-lg bg-gold px-6 py-2 font-semibold text-background hover:bg-gold-light transition-colors">
              Cadastrar Barbearia
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Agendamentos Hoje", value: "—" },
              { label: "Barbeiros Vinculados", value: "—" },
              { label: "Serviços Ativos", value: "—" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-dark-border bg-dark-card p-6"
              >
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-gold">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
