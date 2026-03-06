"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { ProgressRing } from "@/components/ui/progress-ring";
import {
  Car,
  Bike,
  AlertTriangle,
  Calendar,
  Wrench,
  TrendingUp,
  Sparkles,
  Award,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { mockVehicles, mockServiceHistory, mockUserProfile } from "@/lib/data/mock-data";
import {
  predictPartFailures,
  calculateVehicleHealth,
  estimateTotalMaintenanceCost
} from "@/lib/ai/predictive-maintenance";
import { formatCurrency } from "@/lib/utils";
import { AnimatedTrafficScene } from "@/components/ui/animated-traffic";

const upcomingReminders = [
  { id: 1, type: "Service", vehicle: "Honda City", date: "2025-12-28", urgency: "high" as const },
  {
    id: 2,
    type: "Insurance",
    vehicle: "Royal Enfield",
    date: "2026-01-15",
    urgency: "medium" as const
  },
  {
    id: 3,
    type: "Pollution",
    vehicle: "Honda City",
    date: "2026-02-10",
    urgency: "low" as const
  }
];

export default function DashboardPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(mockVehicles[0]);

  // Calculate predictions for all vehicles
  const allPredictions = useMemo(() => {
    return mockVehicles.flatMap((vehicle) => {
      const history = mockServiceHistory.filter((s) => s.vehicleId === vehicle.id);
      return predictPartFailures(vehicle, history);
    });
  }, []);

  const criticalPredictions = allPredictions.filter(
    (p) => p.severity === "critical" || p.severity === "high"
  );

  const totalMaintenanceCost = estimateTotalMaintenanceCost(allPredictions);

  return (
    <div className="relative min-h-screen">
      <AnimatedTrafficScene dimmed />

      <Navbar />

      <main className="container mx-auto px-6 py-10">
        <AnimatedContainer>
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-extrabold mb-2 bg-accent-gradient bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-slate-400">
                Welcome back, {mockUserProfile.name}! Here's your vehicle summary.
              </p>
            </div>
            <Link href="/profile" className="btn-ghost">
              <Award className="h-4 w-4" />
              {mockUserProfile.loyaltyPoints} pts
            </Link>
          </div>
        </AnimatedContainer>

        {/* Predictive Maintenance Alert */}
        {criticalPredictions.length > 0 && (
          <AnimatedContainer delay={0.05}>
            <GlassCard className="mb-6 border-2 border-red-500/30 bg-red-500/5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                  <Sparkles className="h-6 w-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-400 mb-1">
                    AI Predictive Maintenance Alert
                  </h3>
                  <p className="text-sm text-slate-300 mb-3">
                    {criticalPredictions.length} critical{" "}
                    {criticalPredictions.length === 1 ? "issue" : "issues"} detected across your
                    vehicles. Immediate attention recommended.
                  </p>
                  <Link href="/predictions" className="btn-primary text-xs">
                    <AlertTriangle className="h-3 w-3" />
                    View Predictions
                  </Link>
                </div>
              </div>
            </GlassCard>
          </AnimatedContainer>
        )}

        {/* Vehicles Grid */}
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          {mockVehicles.map((vehicle, idx) => {
            const history = mockServiceHistory.filter((s) => s.vehicleId === vehicle.id);
            const predictions = predictPartFailures(vehicle, history);
            const health = calculateVehicleHealth(vehicle, predictions);

            return (
              <AnimatedContainer key={vehicle.id} delay={0.1 * idx}>
                <GlassCard hover>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-blue/20">
                        {vehicle.type === "car" ? (
                          <Car className="h-7 w-7 text-accent-blue" />
                        ) : (
                          <Bike className="h-7 w-7 text-accent-cyan" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                        <p className="text-sm text-slate-400">{vehicle.km.toLocaleString()} km</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Next service: {vehicle.nextServiceKm.toLocaleString()} km
                        </p>
                      </div>
                    </div>
                    <ProgressRing progress={health} size={60} strokeWidth={5} />
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/vehicles/${vehicle.id}`}
                      className="btn-ghost text-xs flex-1 text-center"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/bookings/new?vehicleId=${vehicle.id}`}
                      className="btn-primary text-xs flex-1 text-center"
                    >
                      Book Service
                    </Link>
                  </div>
                </GlassCard>
              </AnimatedContainer>
            );
          })}
        </div>

        {/* Quick Stats */}
        <AnimatedContainer delay={0.2}>
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <GlassCard>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-magenta/20">
                  <Wrench className="h-5 w-5 text-accent-magenta" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockVehicles.length}</p>
                  <p className="text-xs text-slate-400">Active Vehicles</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-cyan/20">
                  <Calendar className="h-5 w-5 text-accent-cyan" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{upcomingReminders.length}</p>
                  <p className="text-xs text-slate-400">Upcoming Reminders</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/20">
                  <TrendingUp className="h-5 w-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(totalMaintenanceCost)}</p>
                  <p className="text-xs text-slate-400">Est. Maintenance</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </AnimatedContainer>

        {/* Reminders */}
        <AnimatedContainer delay={0.3}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold">Upcoming Reminders</h2>
            <Link href="/notifications" className="text-sm text-accent-blue hover:underline">
              View All
              <ArrowRight className="ml-1 inline h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingReminders.map((reminder) => (
              <motion.div
                key={reminder.id}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <AlertTriangle
                    className={`h-5 w-5 ${
                      reminder.urgency === "high"
                        ? "text-red-400"
                        : reminder.urgency === "medium"
                          ? "text-yellow-400"
                          : "text-blue-400"
                    }`}
                  />
                  <div>
                    <p className="font-semibold">{reminder.type}</p>
                    <p className="text-sm text-slate-400">{reminder.vehicle}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">{reminder.date}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedContainer>
      </main>
    </div>
  );
}
