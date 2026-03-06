"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      className={cn(
        "glass-panel card-sheen rounded-hero p-6 transition-all duration-300",
        hover && "cursor-pointer hover:shadow-neon",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
