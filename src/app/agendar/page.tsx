import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AgendarPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.role !== "CUSTOMER") redirect("/onboarding");

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gold">Agendar Corte</h1>
          <p className="text-muted-foreground">Encontre barbearias ou barbeiros avulsos perto de você</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-dark-border bg-dark-card p-6 space-y-3 hover:border-gold/50 transition-colors cursor-pointer">
            <p className="text-2xl">🏪</p>
            <h2 className="font-semibold text-foreground">Barbearias</h2>
            <p className="text-sm text-muted-foreground">Agende em uma barbearia com barbeiro fixo de sua escolha.</p>
          </div>
          <div className="rounded-lg border border-dark-border bg-dark-card p-6 space-y-3 hover:border-gold/50 transition-colors cursor-pointer">
            <p className="text-2xl">🛵</p>
            <h2 className="font-semibold text-foreground">Barbeiro a Domicílio</h2>
            <p className="text-sm text-muted-foreground">Um barbeiro vai até você. Configure seu endereço e encontre profissionais no raio.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
