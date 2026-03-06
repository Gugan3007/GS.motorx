"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { AlertTriangle, Sparkles, TrendingDown, CheckCircle2, ArrowLeft } from "lucide-react";
import { mockVehicles, mockServiceHistory } from "@/lib/data/mock-data";
import { predictPartFailures } from "@/lib/ai/predictive-maintenance";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

export default function PredictionsPage() {
  const predictions = useMemo(() => {
    return mockVehicles.flatMap((vehicle) => {
      const history = mockServiceHistory.filter((s) => s.vehicleId === vehicle.id);
      const preds = predictPartFailures(vehicle, history);
      return preds.map((p) => ({ ...p, vehicleName: vehicle.name }));
    });
  }, []);

  const criticalPredictions = predictions.filter((p) => p.severity === "critical");
  const highPredictions = predictions.filter((p) => p.severity === "high");
  const mediumPredictions = predictions.filter((p) => p.severity === "medium");

  const totalEstimatedCost = predictions
    .filter((p) => p.severity === "critical" || p.severity === "high")
    .reduce((sum, p) => sum + p.estimatedCost, 0);

  const severityConfig = {
    critical: { color: "red", icon: AlertTriangle, label: "Critical" },
    high: { color: "orange", icon: TrendingDown, label: "High Priority" },
    medium: { color: "yellow", icon: Sparkles, label: "Monitor" },
    low: { color: "blue", icon: CheckCircle2, label: "Good" }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-6 py-10">
        <AnimatedContainer>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-accent-blue mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-display font-extrabold mb-2 bg-accent-gradient bg-clip-text text-transparent">
            AI Predictive Maintenance
          </h1>
          <p className="text-slate-400 mb-10">
            Advanced AI analysis of your vehicles' health and upcoming maintenance needs.
          </p>
        </AnimatedContainer>

        {/* Summary Cards */}
        <div className="mb-10 grid gap-4 md:grid-cols-4">
          <AnimatedContainer delay={0.1}>
            <GlassCard className="border-2 border-red-500/30">
              <div className="text-center">
                <p className="text-3xl font-bold text-red-400">{criticalPredictions.length}</p>
                <p className="text-xs text-slate-400">Critical Issues</p>
              </div>
            </GlassCard>
          </AnimatedContainer>
          <AnimatedContainer delay={0.15}>
            <GlassCard className="border-2 border-orange-500/30">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-400">{highPredictions.length}</p>
                <p className="text-xs text-slate-400">High Priority</p>
              </div>
            </GlassCard>
          </AnimatedContainer>
          <AnimatedContainer delay={0.2}>
            <GlassCard className="border-2 border-yellow-500/30">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-400">{mediumPredictions.length}</p>
                <p className="text-xs text-slate-400">Monitor</p>
              </div>
            </GlassCard>
          </AnimatedContainer>
          <AnimatedContainer delay={0.25}>
            <GlassCard className="border-2 border-accent-blue/30">
              <div className="text-center">
                <p className="text-3xl font-bold text-accent-blue">{formatCurrency(totalEstimatedCost)}</p>
                <p className="text-xs text-slate-400">Est. Cost</p>
              </div>
            </GlassCard>
          </AnimatedContainer>
        </div>

        {/* Predictions List */}
        <div className="space-y-4">
          {predictions.length === 0 ? (
            <AnimatedContainer>
              <GlassCard>
                <div className="text-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">All Systems Normal</h3>
                  <p className="text-slate-400">No maintenance predictions at this time. Keep up the great work!</p>
                </div>
              </GlassCard>
            </AnimatedContainer>
          ) : (
            predictions.map((pred, idx) => {
              const config = severityConfig[pred.severity];
              const Icon = config.icon;
              const isUrgent = pred.severity === "critical" || pred.severity === "high";

              return (
                <AnimatedContainer key={pred.id} delay={0.05 * idx}>
                  <motion.div whileHover={{ x: 4 }}>
                    <GlassCard
                      className={`border-2 ${isUrgent ? `border-${config.color}-500/30 bg-${config.color}-500/5` : ""}`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-${config.color}-500/20`}
                        >
                          <Icon className={`h-6 w-6 text-${config.color}-400`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-bold">{pred.part}</h3>
                              <p className="text-sm text-slate-400">{pred.vehicleName}</p>
                            </div>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold bg-${config.color}-500/20 text-${config.color}-400`}
                            >
                              {config.label}
                            </span>
                          </div>

                          <p className="text-sm text-slate-300 mb-3">{pred.description}</p>
                          <p className="text-sm text-slate-400 mb-4">{pred.recommendation}</p>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div>
                              <span className="text-slate-500">KM Remaining:</span>{" "}
                              <span className="font-semibold text-white">
                                {pred.kmRemaining === 0 ? "Overdue" : `${pred.kmRemaining.toLocaleString()} km`}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500">Est. Cost:</span>{" "}
                              <span className="font-semibold text-accent-cyan">
                                {formatCurrency(pred.estimatedCost)}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500">Confidence:</span>{" "}
                              <span className="font-semibold text-white">{pred.confidence}%</span>
                            </div>
                          </div>

                          {isUrgent && (
                            <Link
                              href={`/bookings/new?vehicleId=${pred.vehicleId}&service=${pred.part}`}
                              className="btn-primary mt-4 text-xs inline-flex"
                            >
                              Schedule Service Now
                            </Link>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </AnimatedContainer>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
