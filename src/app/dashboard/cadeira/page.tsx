import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ReviewCard } from "@/components/reviews/review-card";
import { RatingBadge } from "@/components/reviews/star-rating";

export default async function DashboardCadeiraPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      barberLinks: {
        where: { status: "ACCEPTED" },
        include: { barbershop: true },
      },
      reviewsReceived: {
        include: { client: { select: { name: true, avatarUrl: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!user || user.role !== "BARBER_FIXED") redirect("/onboarding");

  const activeLink = user.barberLinks[0];
  const reviews = user.reviewsReceived;
  const avgRating =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gold">Minha Cadeira</h1>
          <p className="text-muted-foreground">
            {activeLink
              ? `Vinculado à ${activeLink.barbershop.name}`
              : "Solicite vínculo com uma barbearia"}
          </p>
        </div>

        {!activeLink ? (
          <div className="rounded-lg border border-dark-border bg-dark-card p-8 text-center space-y-3">
            <p className="text-muted-foreground">
              Você não está vinculado a nenhuma barbearia ainda.
            </p>
            <button className="rounded-lg bg-gold px-6 py-2 font-semibold text-background hover:bg-gold-light transition-colors">
              Buscar Barbearia
            </button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Agendamentos Hoje", value: "—" },
                { label: "Próximo Horário", value: "—" },
                { label: "Avaliação Média", value: reviews.length > 0 ? avgRating.toFixed(1) : "—" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-dark-border bg-dark-card p-6">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-gold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Minhas Avaliações</h2>
                {reviews.length > 0 && (
                  <RatingBadge rating={avgRating} count={reviews.length} />
                )}
              </div>

              {reviews.length === 0 ? (
                <div className="rounded-lg border border-dark-border bg-dark-card p-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    Nenhuma avaliação ainda. Elas aparecem após clientes concluírem atendimentos com você.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {reviews.map((r) => (
                    <ReviewCard
                      key={r.id}
                      author={r.client.name}
                      avatarUrl={r.client.avatarUrl}
                      rating={r.rating}
                      comment={r.comment}
                      createdAt={r.createdAt}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
