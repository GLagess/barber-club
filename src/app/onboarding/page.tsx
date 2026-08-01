import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import OnboardingForm from "./onboarding-form";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <Logo size={48} showText={false} />
          <p className="text-[#444] text-xs mt-4 font-medium uppercase tracking-widest">Use Barber Club</p>
        </div>
        <div className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] p-8">
          <div className="mb-7">
            <h1
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Como você vai usar a plataforma?
            </h1>
            <p className="text-sm text-[#666]">Escolha seu perfil para personalizarmos sua experiência.</p>
          </div>
          <OnboardingForm />
        </div>
      </div>
    </div>
  );
}
