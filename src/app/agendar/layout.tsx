import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function AgendarLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const name = session.user.name ?? "Cliente";
  const email = session.user.email ?? "";

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      <Sidebar role="CUSTOMER" name={name} email={email} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
