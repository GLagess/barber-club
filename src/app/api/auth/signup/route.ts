import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return Response.json({ error: "Preencha todos os campos." }, { status: 400 });
  }
  if (password.length < 8) {
    return Response.json({ error: "A senha deve ter no mínimo 8 caracteres." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return Response.json({ error: "Este e-mail já está cadastrado." }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, password: hash },
  });

  return Response.json({ ok: true }, { status: 201 });
}
