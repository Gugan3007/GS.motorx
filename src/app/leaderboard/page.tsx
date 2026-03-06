"use client";

import { Navbar } from "@/components/layout/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { mockUserProfile } from "@/lib/data/mock-data";
import { motion } from "framer-motion";

const leaderboardData = [
  {
    rank: 1,
    name: "Arjun Singh",
    points: 3450,
    tier: "master",
    totalKm: 180000,
    services: 24
  },
  {
    rank: 2,
    name: "Priya Sharma",
    points: 2890,
    tier: "expert",
    totalKm: 145000,
    services: 19
  },
  {
    rank: 3,
    name: "Rajesh Kumar",
    points: 2210,
    tier: "expert",
    totalKm: 120000,
    services: 16
  },
  {
    rank: 4,
    name: "Gugan Saravanan",
    points: mockUserProfile.loyaltyPoints,
    tier: mockUserProfile.tier,
    totalKm: mockUserProfile.totalKm,
    services: mockUserProfile.servicesCompleted,
    isCurrentUser: true
  },
  {
    rank: 5,
    name: "Amit Patel",
    points: 720,
    tier: "pro",
    totalKm: 42000,
    services: 5
  }
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-6 py-10">
        <AnimatedContainer>
          <div className="mb-10 text-center">
            <Trophy className="h-16 w-16 text-accent-cyan mx-auto mb-4" />
            <h1 className="text-4xl font-display font-extrabold mb-2 bg-accent-gradient bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <p className="text-slate-400">Top maintenance champions in your region</p>
          </div>
        </AnimatedContainer>

        {/* Top 3 Podium */}
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {leaderboardData.slice(0, 3).map((user, idx) => {
            const medals = [Medal, Trophy, Award];
            const colors = ["text-yellow-400", "text-slate-300", "text-orange-400"];
            const Icon = medals[idx];

            return (
              <AnimatedContainer key={user.rank} delay={0.1 * idx}>
                <GlassCard className="text-center border-2 border-accent-blue/30">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ delay: 0.2 + idx * 0.1, type: "spring" }}
                    className="mx-auto mb-4"
                  >
                    <Icon className={`h-12 w-12 ${colors[idx]}`} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-1">#{user.rank}</h3>
                  <p className="text-lg font-semibold mb-2">{user.name}</p>
                  <p className="text-3xl font-extrabold text-accent-cyan mb-2">{user.points} pts</p>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p>{user.totalKm.toLocaleString()} km • {user.services} services</p>
                    <span className="inline-block rounded-full bg-accent-blue/20 px-3 py-1 text-accent-blue uppercase">
                      {user.tier}
                    </span>
                  </div>
                </GlassCard>
              </AnimatedContainer>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <AnimatedContainer delay={0.4}>
          <GlassCard>
            <h2 className="text-xl font-bold mb-4">Rankings</h2>
            <div className="space-y-2">
              {leaderboardData.map((user, idx) => (
                <motion.div
                  key={user.rank}
                  whileHover={{ x: 4 }}
                  className={`flex items-center justify-between rounded-xl p-4 transition ${
                    user.isCurrentUser
                      ? "border-2 border-accent-blue/50 bg-accent-blue/10"
                      : "border border-white/10 bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-cyan/20 font-bold">
                      {user.rank}
                    </div>
                    <div>
                      <p className="font-semibold">
                        {user.name}
                        {user.isCurrentUser && (
                          <span className="ml-2 text-xs text-accent-blue">(You)</span>
                        )}
                      </p>
                      <p className="text-sm text-slate-400">
                        {user.totalKm.toLocaleString()} km • {user.services} services
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-accent-cyan">{user.points}</p>
                    <p className="text-xs text-slate-500 uppercase">{user.tier}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </AnimatedContainer>
      </main>
    </div>
  );
}
