import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import OnboardingForm from "./onboarding-form";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
      />
      <div className="relative w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Use Barber Club" width={72} height={72} className="rounded-2xl" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white">Como você vai usar a plataforma?</h1>
            <p className="text-white/40 text-sm">Escolha seu perfil para personalizarmos sua experiência.</p>
          </div>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}
