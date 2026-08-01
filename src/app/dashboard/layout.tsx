import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const role = session.user.role as string ?? "CUSTOMER";
  const name = session.user.name ?? "Usuário";
  const email = session.user.email ?? "";

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      <Sidebar role={role} name={name} email={email} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
