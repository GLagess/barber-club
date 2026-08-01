import { StarRating } from "./star-rating";

interface ReviewCardProps {
  author: string;
  avatarUrl?: string | null;
  rating: number;
  comment?: string | null;
  createdAt: Date;
}

export function ReviewCard({ author, avatarUrl, rating, comment, createdAt }: ReviewCardProps) {
  const initials = author
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const date = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(createdAt);

  return (
    <div className="rounded-lg border border-dark-border bg-dark-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img src={avatarUrl} alt={author} className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">
              {initials}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-foreground">{author}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
        <StarRating value={rating} size="sm" />
      </div>
      {comment && <p className="text-sm text-muted-foreground leading-relaxed">{comment}</p>}
    </div>
  );
}
