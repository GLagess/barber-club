"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Star, Clock, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";

const mobileBarbers = [
  {
    id: "m1", name: "Rafael Duarte", initials: "RD",
    avatarColor: "#7C3AED",
    instagram: "@rafaelduarte.barber",
    rating: 4.9, reviews: 83, distanceKm: 2.1,
    priceFrom: "R$ 55", deliveryFee: "R$ 15",
    services: ["Corte Social", "Corte + Barba", "Degradê"],
    nextAvailable: "11:00",
    bio: "7 anos de experiência. Especialista em degradê e cortes modernos.",
  },
  {
    id: "m2", name: "Tiago Vieira", initials: "TV",
    avatarColor: "#0EA5E9",
    instagram: "@tiagovieira.barber",
    rating: 4.7, reviews: 51, distanceKm: 4.3,
    priceFrom: "R$ 50", deliveryFee: "R$ 20",
    services: ["Corte Social", "Barba", "Sobrancelha"],
    nextAvailable: "14:00",
    bio: "Atendimento premium em casa. Pontual e profissional.",
  },
  {
    id: "m3", name: "Cauê Mendes", initials: "CM",
    avatarColor: "#10B981",
    instagram: "@cauemendes.barber",
    rating: 4.8, reviews: 67, distanceKm: 1.8,
    priceFrom: "R$ 60", deliveryFee: "R$ 10",
    services: ["Corte + Barba", "Degradê", "Corte Infantil"],
    nextAvailable: "09:30",
    bio: "Especialista em cortes clássicos e contemporâneos a domicílio.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={11}
          fill={i < Math.floor(rating) ? "#C9A84C" : "none"}
          stroke={i < Math.floor(rating) ? "#C9A84C" : "#444"}
        />
      ))}
    </div>
  );
}

export default function DomicilioPage() {
  const [confirmed, setConfirmed] = useState<string | null>(null);

  if (confirmed) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
        >
          <CheckCircle2 size={36} style={{ color: "#22c55e" }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Solicitação enviada!
        </h2>
        <p className="text-[#666] text-sm mb-2">{confirmed} vai entrar em contato para confirmar o endereço e horário.</p>
        <p className="text-[#555] text-xs mb-8">Aguarde a confirmação em breve.</p>
        <Link
          href="/agendar"
          className="rounded-xl font-bold text-[#0A0A0A] px-8 py-3.5 text-sm hover:opacity-90 transition-all"
          style={{ background: "#C9A84C" }}
        >
          Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <Link href="/agendar" className="text-xs text-[#555] hover:text-[#888] transition-colors mb-4 inline-flex items-center gap-1">
          ← Voltar
        </Link>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Barbeiro a Domicílio
        </h1>
        <p className="text-[#666] text-sm mt-1">Profissionais disponíveis no seu raio de 10 km</p>
      </div>

      <div className="space-y-4">
        {mobileBarbers.map((b) => (
          <div
            key={b.id}
            className="rounded-2xl border border-[#1A1A1A] bg-[#111] p-6"
          >
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-base font-bold shrink-0"
                style={{ background: `${b.avatarColor}22`, color: b.avatarColor, fontFamily: "var(--font-display)" }}
              >
                {b.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-white mb-0.5">{b.name}</h2>
                <p className="text-xs text-[#666] mb-1">{b.bio}</p>
                <a
                  href={`https://instagram.com/${b.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs hover:text-white transition-colors mt-1"
                  style={{ color: "#C9A84C" }}
                >
                  <ExternalLink size={11} />
                  {b.instagram}
                </a>
                <div className="flex items-center gap-4 flex-wrap mt-2">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={b.rating} />
                    <span className="text-xs font-semibold text-white">{b.rating}</span>
                    <span className="text-xs text-[#555]">({b.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#555]">
                    <MapPin size={11} style={{ color: "#C9A84C" }} />
                    {b.distanceKm} km de você
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#555]">
                    <Clock size={11} style={{ color: "#C9A84C" }} />
                    Próximo: {b.nextAvailable}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-5 flex-wrap">
              {b.services.map((s) => (
                <span
                  key={s}
                  className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
                  style={{ background: "rgba(201,168,76,0.08)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.15)" }}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#555]">A partir de</p>
                <p className="text-base font-bold text-white">{b.priceFrom} <span className="text-xs text-[#555] font-normal">+ {b.deliveryFee} deslocamento</span></p>
              </div>
              <button
                onClick={() => setConfirmed(b.name)}
                className="flex items-center gap-2 rounded-xl font-bold text-[#0A0A0A] px-5 py-3 text-sm transition-all hover:opacity-90 shrink-0"
                style={{ background: "#C9A84C" }}
              >
                Solicitar
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
