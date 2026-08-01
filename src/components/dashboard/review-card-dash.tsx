import { Star } from "lucide-react";
import type { MOCK_REVIEWS } from "@/lib/mock-data";

type Review = (typeof MOCK_REVIEWS)[number];

export function ReviewCardDash({ review }: { review: Review }) {
  return (
    <div className="rounded-2xl border border-[#1A1A1A] bg-[#111] p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}
          >
            {review.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{review.client}</p>
            <p className="text-xs text-[#555]">com {review.barber} · {review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              fill={i < review.rating ? "#C9A84C" : "none"}
              stroke={i < review.rating ? "#C9A84C" : "#444"}
            />
          ))}
        </div>
      </div>
      {review.comment && (
        <p className="text-sm text-[#888] leading-relaxed">{review.comment}</p>
      )}
    </div>
  );
}
