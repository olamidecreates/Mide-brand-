import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  className?: string;
  starClassName?: string;
}

/**
 * Renders a 5-star rating with fractional fill (e.g. 4.5 renders a half star)
 * using a clipped overlay rather than a rounded value, so ratings read as
 * precise rather than marketing-rounded.
 */
export function StarRating({ rating, className, starClassName }: StarRatingProps) {
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className={cn("flex items-center gap-0.5", className)}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1);
        return (
          <span key={i} className={cn("relative block h-3.5 w-3.5", starClassName)}>
            <Star className="absolute inset-0 h-3.5 w-3.5 text-ink/15" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="h-3.5 w-3.5 text-electric" fill="currentColor" />
            </span>
          </span>
        );
      })}
    </div>
  );
}
