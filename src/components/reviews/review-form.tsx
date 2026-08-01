"use client";

import { useState, useTransition } from "react";
import { StarRating } from "./star-rating";
import { submitReview } from "@/app/reviews/actions";

interface ReviewFormProps {
  appointmentId: string;
  barberName: string;
  barbershopName?: string;
  onSuccess?: () => void;
}

export function ReviewForm({ appointmentId, barberName, barbershopName, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setError("Selecione uma nota."); return; }
    setError(null);

    startTransition(async () => {
      const result = await submitReview({ appointmentId, rating, comment: comment.trim() || undefined });
      if (result?.error) {
        setError(result.error);
      } else {
        onSuccess?.();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          Avalie seu atendimento{barbershopName ? ` na ${barbershopName}` : ""} com {barberName}
        </p>
        <div className="flex items-center gap-3">
          <StarRating value={rating} onChange={setRating} size="lg" />
          {rating > 0 && (
            <span className="text-sm text-gold font-medium">
              {["", "Ruim", "Regular", "Bom", "Ótimo", "Excelente"][rating]}
            </span>
          )}
        </div>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Deixe um comentário (opcional)..."
        maxLength={500}
        rows={3}
        className="w-full rounded-lg border border-dark-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none resize-none"
      />

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={isPending || rating === 0}
        className="w-full rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-background transition-opacity disabled:opacity-40 hover:bg-gold-light"
      >
        {isPending ? "Enviando..." : "Publicar avaliação"}
      </button>
    </form>
  );
}
