"use client";

import { Navbar } from "@/components/layout/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Zap, Target, Star, ArrowRight } from "lucide-react";
import { mockUserProfile } from "@/lib/data/mock-data";
import { ACHIEVEMENTS_CATALOG, calculateUserTier } from "@/lib/ai/gamification";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const tierConfig = {
    starter: { color: "slate", next: "pro", pointsNeeded: 500 },
    pro: { color: "blue", next: "expert", pointsNeeded: 1500 },
    expert: { color: "purple", next: "master", pointsNeeded: 3000 },
    master: { color: "gold", next: null, pointsNeeded: null }
  };

  const currentTier = tierConfig[mockUserProfile.tier];
  const progressToNext = currentTier.next
    ? ((mockUserProfile.loyaltyPoints / (currentTier.pointsNeeded || 1)) * 100).toFixed(0)
    : 100;

  const unlockedAchievements = mockUserProfile.achievements.filter((a) => a.unlockedAt);
  const lockedAchievements = ACHIEVEMENTS_CATALOG.filter(
    (a) => !mockUserProfile.achievements.find((ua) => ua.title === a.title)
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-6 py-10">
        <AnimatedContainer>
          <h1 className="text-4xl font-display font-extrabold mb-10 bg-accent-gradient bg-clip-text text-transparent">
            Profile & Achievements
          </h1>
        </AnimatedContainer>

        {/* Profile Card */}
        <AnimatedContainer delay={0.1}>
          <GlassCard className="mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <img
                src={mockUserProfile.avatar}
                alt={mockUserProfile.name}
                className="h-24 w-24 rounded-full border-4 border-accent-blue/30"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-1">{mockUserProfile.name}</h2>
                <p className="text-slate-400 mb-4">{mockUserProfile.email}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Member Since:</span>{" "}
                    <span className="font-semibold">March 2024</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Services Completed:</span>{" "}
                    <span className="font-semibold">{mockUserProfile.servicesCompleted}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Total KM Tracked:</span>{" "}
                    <span className="font-semibold">{mockUserProfile.totalKm.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Link href="/leaderboard" className="btn-primary">
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Link>
            </div>
          </GlassCard>
        </AnimatedContainer>

        {/* Loyalty & Tier */}
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          <AnimatedContainer delay={0.15}>
            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-cyan/20">
                  <Award className="h-6 w-6 text-accent-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Loyalty Points</h3>
                  <p className="text-3xl font-extrabold text-accent-cyan">
                    {mockUserProfile.loyaltyPoints}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-400">
                Earn points for services, reviews, and referrals. Redeem for discounts!
              </p>
            </GlassCard>
          </AnimatedContainer>

          <AnimatedContainer delay={0.2}>
            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-magenta/20">
                  <Zap className="h-6 w-6 text-accent-magenta" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Tier: {mockUserProfile.tier.toUpperCase()}</h3>
                  {currentTier.next && (
                    <p className="text-sm text-slate-400">
                      {currentTier.pointsNeeded! - mockUserProfile.loyaltyPoints} pts to{" "}
                      {currentTier.next.toUpperCase()}
                    </p>
                  )}
                </div>
              </div>
              {currentTier.next && (
                <div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressToNext}%` }}
                      className="h-full bg-accent-gradient"
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">{progressToNext}% to next tier</p>
                </div>
              )}
            </GlassCard>
          </AnimatedContainer>
        </div>

        {/* Achievements */}
        <AnimatedContainer delay={0.25}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold">Achievements</h2>
            <span className="text-sm text-slate-400">
              {unlockedAchievements.length} / {ACHIEVEMENTS_CATALOG.length} unlocked
            </span>
          </div>
        </AnimatedContainer>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <AnimatedContainer delay={0.3}>
            <h3 className="text-lg font-semibold mb-4 text-accent-cyan">Unlocked</h3>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-10">
              {unlockedAchievements.map((achievement, idx) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <Badge achievement={achievement} size="md" />
                </motion.div>
              ))}
            </div>
          </AnimatedContainer>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <AnimatedContainer delay={0.35}>
            <h3 className="text-lg font-semibold mb-4 text-slate-500">Locked</h3>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {lockedAchievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <Badge
                    achievement={{ ...achievement, id: `locked-${idx}`, progress: 0 }}
                    size="md"
                    showProgress
                  />
                </motion.div>
              ))}
            </div>
          </AnimatedContainer>
        )}
      </main>
    </div>
  );
}
