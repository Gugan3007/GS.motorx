"use client";

import { motion } from "framer-motion";
import { Achievement } from "@/types";
import { cn } from "@/lib/utils";

interface BadgeProps {
  achievement: Achievement;
  size?: "sm" | "md" | "lg";
  showProgress?: boolean;
}

export function Badge({ achievement, size = "md", showProgress = false }: BadgeProps) {
  const sizes = {
    sm: "h-16 w-16 text-2xl",
    md: "h-24 w-24 text-4xl",
    lg: "h-32 w-32 text-5xl"
  };

  const tierColors = {
    bronze: "from-orange-600 to-amber-700",
    silver: "from-slate-400 to-slate-600",
    gold: "from-yellow-400 to-yellow-600",
    platinum: "from-purple-400 to-pink-500"
  };

  const isLocked = !achievement.unlockedAt;
  const progress = achievement.progress || 0;
  const maxProgress = achievement.maxProgress || 100;
  const progressPercent = (progress / maxProgress) * 100;

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={cn(
          "relative flex items-center justify-center rounded-full bg-gradient-to-br shadow-lg",
          sizes[size],
          isLocked ? "from-gray-700 to-gray-800 opacity-40" : tierColors[achievement.tier]
        )}
      >
        <span className={isLocked ? "grayscale" : ""}>{achievement.icon}</span>
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
            <span className="text-2xl">🔒</span>
          </div>
        )}
      </motion.div>
      <div className="text-center">
        <p className={cn("text-sm font-semibold", isLocked && "text-slate-500")}>
          {achievement.title}
        </p>
        <p className="text-xs text-slate-400">{achievement.points} pts</p>
        {showProgress && maxProgress && (
          <div className="mt-2 w-24">
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-accent-gradient"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {progress} / {maxProgress}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
