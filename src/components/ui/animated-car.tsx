"use client";

import { motion } from "framer-motion";

interface AnimatedCarProps {
  delay?: number;
  duration?: number;
  reverse?: boolean;
}

export function AnimatedCar({ delay = 0, duration = 8, reverse = false }: AnimatedCarProps) {
  return (
    <motion.div
      className="absolute"
      initial={{ x: reverse ? "100vw" : "-100vw", opacity: 0 }}
      animate={{ x: reverse ? "-100vw" : "100vw", opacity: 1 }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        scaleX: reverse ? -1 : 1,
      }}
    >
      <svg
        width="120"
        height="60"
        viewBox="0 0 120 60"
        className="filter drop-shadow-lg"
      >
        {/* Car body */}
        <rect x="20" y="20" width="80" height="25" rx="5" fill="url(#carGradient)" />

        {/* Car roof */}
        <rect x="40" y="10" width="40" height="15" rx="3" fill="url(#roofGradient)" />

        {/* Windows */}
        <rect x="45" y="12" width="12" height="8" rx="2" fill="rgba(100,200,255,0.5)" />
        <rect x="63" y="12" width="12" height="8" rx="2" fill="rgba(100,200,255,0.5)" />

        {/* Front bumper */}
        <rect x="15" y="42" width="10" height="4" fill="rgba(255,60,172,0.7)" />

        {/* Rear bumper */}
        <rect x="95" y="42" width="10" height="4" fill="rgba(255,60,172,0.7)" />

        {/* Front wheel */}
        <circle cx="35" cy="50" r="8" fill="url(#wheelGradient)" />
        <circle cx="35" cy="50" r="4" fill="rgba(109,220,255,0.3)" />

        {/* Rear wheel */}
        <circle cx="85" cy="50" r="8" fill="url(#wheelGradient)" />
        <circle cx="85" cy="50" r="4" fill="rgba(109,220,255,0.3)" />

        {/* Speed lines */}
        <line x1="10" y1="28" x2="5" y2="28" stroke="rgba(109,220,255,0.4)" strokeWidth="2" />
        <line x1="10" y1="35" x2="0" y2="35" stroke="rgba(109,220,255,0.3)" strokeWidth="2" />
        <line x1="10" y1="42" x2="2" y2="42" stroke="rgba(109,220,255,0.2)" strokeWidth="2" />

        {/* Gradients */}
        <defs>
          <linearGradient id="carGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(109,220,255,0.9)" />
            <stop offset="100%" stopColor="rgba(100,150,255,0.8)" />
          </linearGradient>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,60,172,0.8)" />
            <stop offset="100%" stopColor="rgba(200,100,255,0.7)" />
          </linearGradient>
          <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(100,100,100,0.9)" />
            <stop offset="100%" stopColor="rgba(50,50,50,0.8)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export function AnimatedCarBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top lane cars */}
      <div className="absolute top-[15%] left-0 right-0 h-20">
        <AnimatedCar delay={0} duration={10} />
        <AnimatedCar delay={3} duration={12} reverse />
      </div>

      {/* Middle lane cars */}
      <div className="absolute top-1/2 left-0 right-0 h-20 -translate-y-1/2">
        <AnimatedCar delay={1} duration={11} reverse />
        <AnimatedCar delay={4} duration={13} />
      </div>

      {/* Bottom lane cars */}
      <div className="absolute bottom-[15%] left-0 right-0 h-20">
        <AnimatedCar delay={2} duration={12} />
        <AnimatedCar delay={5} duration={10} reverse />
      </div>
    </div>
  );
}
