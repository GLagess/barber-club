"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface SubmitReviewInput {
  appointmentId: string;
  rating: number;
  comment?: string;
}

export async function submitReview(input: SubmitReviewInput): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Não autenticado." };

  if (input.rating < 1 || input.rating > 5) return { error: "Nota inválida." };

  const appointment = await prisma.appointment.findUnique({
    where: { id: input.appointmentId },
    include: { review: true },
  });

  if (!appointment) return { error: "Agendamento não encontrado." };
  if (appointment.clientId !== session.user.id) return { error: "Sem permissão para avaliar este agendamento." };
  if (appointment.status !== "COMPLETED") return { error: "Só é possível avaliar agendamentos concluídos." };
  if (appointment.review) return { error: "Este agendamento já foi avaliado." };

  await prisma.review.create({
    data: {
      appointmentId: input.appointmentId,
      clientId: session.user.id,
      barberId: appointment.barberId,
      barbershopId: appointment.barbershopId ?? null,
      rating: input.rating,
      comment: input.comment ?? null,
    },
  });

  revalidatePath("/dashboard/loja");
  revalidatePath("/dashboard/cadeira");
  revalidatePath("/dashboard/autonomo");
  if (appointment.barbershopId) revalidatePath(`/barbearia/${appointment.barbershopId}`);

  return {};
}

export async function getBarberReviews(barberId: string) {
  const reviews = await prisma.review.findMany({
    where: { barberId },
    include: { client: { select: { name: true, image: true } } },
    orderBy: { createdAt: "desc" },
  });

  const avg = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return { reviews, avg, count: reviews.length };
}

export async function getBarbershopReviews(barbershopId: string) {
  const reviews = await prisma.review.findMany({
    where: { barbershopId },
    include: {
      client: { select: { name: true, image: true } },
      barber: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const avg = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return { reviews, avg, count: reviews.length };
}
