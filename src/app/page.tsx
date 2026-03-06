"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatedTrafficScene } from "@/components/ui/animated-traffic";

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Splash screen progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push("/dashboard"), 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-night-900">
      {/* Animated city & traffic background */}
      <div className="absolute inset-0 -z-10">
        <AnimatedTrafficScene />
      </div>
      
      {/* Dark overlay for better splash visibility */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-night-900/85 via-night-900/90 to-night-900/85" />

      {/* Logo animation */}
      <motion.div
        className="relative z-50 flex flex-col items-center gap-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-accent-magenta via-accent-cyan to-accent-blue shadow-neon"
          animate={{
            rotate: [0, 360],
            boxShadow: [
              "0 0 25px rgba(109,220,255,0.45)",
              "0 0 50px rgba(255,60,172,0.7)",
              "0 0 25px rgba(109,220,255,0.45)"
            ]
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <span className="text-5xl font-extrabold text-white">GS</span>
        </motion.div>

        <motion.h1
          className="text-5xl font-display font-extrabold tracking-tight bg-accent-gradient bg-clip-text text-transparent"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          GS MotorX
        </motion.h1>

        <motion.p
          className="text-sm text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Smart Vehicle Concierge
        </motion.p>

        {/* Progress bar */}
        <div className="mt-8 w-64">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-magenta via-accent-cyan to-accent-blue"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <p className="mt-2 text-center text-xs text-slate-500">{progress}%</p>
        </div>
      </motion.div>
    </div>
  );
}
