import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const { name, cnpj, address, city, state, phone, description } = await req.json();
    if (!name || !cnpj || !address || !city || !phone) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    const barbershop = await prisma.barbershop.create({
      data: {
        ownerId: session.user.id,
        name, cnpj, address, city, state: state ?? "SP", phone,
        description: description ?? null,
      },
    });

    return NextResponse.json({ id: barbershop.id });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erro interno";
    if (msg.includes("Unique constraint") || msg.includes("unique")) {
      return NextResponse.json({ error: "CNPJ já cadastrado." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao criar barbearia." }, { status: 500 });
  }
}
