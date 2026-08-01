import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ReviewCard } from "@/components/reviews/review-card";
import { RatingBadge } from "@/components/reviews/star-rating";

export default async function DashboardAutonomoPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      mobileSettings: true,
      reviewsReceived: {
        include: { client: { select: { name: true, image: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!user || user.role !== "BARBER_MOBILE") redirect("/onboarding");

  const settings = user.mobileSettings;
  const reviews = user.reviewsReceived;
  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gold">Painel Autônomo</h1>
          <p className="text-muted-foreground">
            {settings ? `Raio de atendimento: ${settings.radiusKm} km` : "Configure suas preferências de atendimento"}
          </p>
        </div>

        {!settings ? (
          <div className="rounded-lg border border-dark-border bg-dark-card p-8 text-center space-y-3">
            <p className="text-muted-foreground">Configure seu raio de atendimento e taxa de deslocamento.</p>
            <button className="rounded-lg bg-gold px-6 py-2 font-semibold text-background hover:bg-gold-light transition-colors">Configurar Atendimento</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Agendamentos Hoje", value: "—" },
                { label: "Raio de Atendimento", value: `${settings.radiusKm} km` },
                { label: "Taxa de Deslocamento", value: `R$ ${Number(settings.deliveryFeeMin).toFixed(2)}` },
                { label: "Avaliação Média", value: reviews.length > 0 ? avgRating.toFixed(1) : "—" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-dark-border bg-dark-card p-6">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-gold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Minhas Avaliações</h2>
                {reviews.length > 0 && <RatingBadge rating={avgRating} count={reviews.length} />}
              </div>
              {reviews.length === 0 ? (
                <div className="rounded-lg border border-dark-border bg-dark-card p-6 text-center">
                  <p className="text-muted-foreground text-sm">Nenhuma avaliação ainda.</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {reviews.map((r) => (
                    <ReviewCard key={r.id} author={r.client.name} avatarUrl={r.client.image} rating={r.rating} comment={r.comment} createdAt={r.createdAt} />
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
