import { MOCK_REVIEWS, MOCK_BARBERSHOP } from "@/lib/mock-data";
import { ReviewCardDash } from "@/components/dashboard/review-card-dash";
import { Star } from "lucide-react";

export default function FeedbacksPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
          Feedbacks
        </h1>
        <p className="text-[#666] text-sm">{MOCK_BARBERSHOP.totalReviews} avaliações recebidas</p>
      </div>

      {/* Overall rating */}
      <div className="rounded-2xl border border-[#1A1A1A] bg-[#111] p-6 mb-6 flex items-center gap-8">
        <div className="text-center">
          <p
            className="text-6xl font-black text-white leading-none mb-2"
            style={{ fontFamily: "var(--font-display)", color: "#C9A84C" }}
          >
            {MOCK_BARBERSHOP.rating}
          </p>
          <div className="flex items-center gap-0.5 justify-center mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(MOCK_BARBERSHOP.rating) ? "#C9A84C" : "none"}
                stroke={i < Math.floor(MOCK_BARBERSHOP.rating) ? "#C9A84C" : "#444"}
              />
            ))}
          </div>
          <p className="text-xs text-[#555]">{MOCK_BARBERSHOP.totalReviews} avaliações</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = star === 5 ? 89 : star === 4 ? 30 : star === 3 ? 6 : star === 2 ? 1 : 1;
            const pct = (count / MOCK_BARBERSHOP.totalReviews) * 100;
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="text-xs text-[#555] w-4 text-right">{star}</span>
                <div className="flex-1 h-2 rounded-full bg-[#1A1A1A] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: "#C9A84C" }}
                  />
                </div>
                <span className="text-xs text-[#555] w-6">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {MOCK_REVIEWS.map((r) => (
          <ReviewCardDash key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
}
