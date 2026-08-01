import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.role !== "ADMIN") redirect("/onboarding");

  const [pendingCount, totalUsers, totalShops] = await Promise.all([
    prisma.barbershop.count({ where: { status: "PENDING_APPROVAL" } }),
    prisma.user.count(),
    prisma.barbershop.count(),
  ]);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gold">Admin — Plataforma</h1>
          <p className="text-muted-foreground">Visão geral e moderação da plataforma</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Barbearias Pendentes", value: pendingCount, urgent: pendingCount > 0 },
            { label: "Usuários Totais", value: totalUsers, urgent: false },
            { label: "Barbearias Cadastradas", value: totalShops, urgent: false },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-lg border bg-dark-card p-6 ${stat.urgent ? "border-yellow-600/50" : "border-dark-border"}`}>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.urgent ? "text-yellow-400" : "text-gold"}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
