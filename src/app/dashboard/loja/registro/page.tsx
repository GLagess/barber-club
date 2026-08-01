"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";

export default function RegistroBarbershopPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", cnpj: "", address: "", city: "", state: "SP", phone: "", description: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/barbershop/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Erro ao registrar barbearia.");
        return;
      }
      router.push("/dashboard/loja");
      router.refresh();
    });
  }

  const inputClass = "w-full rounded-xl bg-[#111] border border-[#2A2A2A] px-4 py-3 text-sm text-white placeholder:text-[#444] focus:border-[#C9A84C] focus:outline-none transition-colors";
  const labelClass = "block text-xs font-medium text-[#888] uppercase tracking-wider mb-1.5";

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: "rgba(201,168,76,0.1)" }}
        >
          <Building2 size={22} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
          Registrar Barbearia
        </h1>
        <p className="text-[#666] text-sm">Preencha os dados para criar seu espaço na plataforma.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Nome da Barbearia *</label>
            <input name="name" required value={form.name} onChange={handleChange} placeholder="Barbearia Da Vinci" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>CNPJ *</label>
            <input name="cnpj" required value={form.cnpj} onChange={handleChange} placeholder="00.000.000/0001-00" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Endereço *</label>
          <input name="address" required value={form.address} onChange={handleChange} placeholder="Rua das Artes, 42 — Centro" className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Cidade *</label>
            <input name="city" required value={form.city} onChange={handleChange} placeholder="São Paulo" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Estado *</label>
            <select name="state" value={form.state} onChange={handleChange} className={inputClass}>
              {["SP","RJ","MG","RS","BA","PR","SC","GO","PE","CE","DF"].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Telefone *</label>
          <input name="phone" required value={form.phone} onChange={handleChange} placeholder="(11) 98765-4321" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Descrição</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Conte um pouco sobre sua barbearia..."
            rows={3}
            className={inputClass + " resize-none"}
          />
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-500/8 border border-red-500/15 rounded-xl px-4 py-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl font-bold text-[#0A0A0A] py-3.5 text-sm transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: "#C9A84C" }}
        >
          {isPending ? "Registrando..." : "Registrar Barbearia"}
        </button>
      </form>
    </div>
  );
}
