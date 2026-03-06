"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = true,
  interactive = false,
  onChange
}: StarRatingProps) {
  const sizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= Math.round(rating);

        return (
          <button
            key={i}
            onClick={() => handleClick(starValue)}
            disabled={!interactive}
            className={cn(interactive && "cursor-pointer transition hover:scale-110")}
          >
            <Star
              className={cn(
                sizes[size],
                isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
              )}
            />
          </button>
        );
      })}
      {showNumber && <span className="ml-1 text-sm text-slate-400">{rating.toFixed(1)}</span>}
    </div>
  );
}
