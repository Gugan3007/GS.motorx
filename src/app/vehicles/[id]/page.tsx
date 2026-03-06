"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { ProgressRing } from "@/components/ui/progress-ring";
import {
  ArrowLeft,
  Car,
  Bike,
  Calendar,
  Gauge,
  Droplet,
  Wrench,
  AlertTriangle
} from "lucide-react";
import { mockVehicles, mockServiceHistory } from "@/lib/data/mock-data";
import { predictPartFailures, calculateVehicleHealth } from "@/lib/ai/predictive-maintenance";
import { formatDate, formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";

export default function VehicleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const vehicle = mockVehicles.find((v) => v.id === id);

  const serviceHistory = useMemo(
    () => mockServiceHistory.filter((s) => s.vehicleId === id),
    [id]
  );

  const predictions = useMemo(() => {
    if (!vehicle) return [];
    return predictPartFailures(vehicle, serviceHistory);
  }, [vehicle, serviceHistory]);

  const health = vehicle ? calculateVehicleHealth(vehicle, predictions) : 0;

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-6 py-10">
        <AnimatedContainer>
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 text-accent-blue mb-6 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vehicles
          </Link>
        </AnimatedContainer>

        {/* Vehicle Header */}
        <AnimatedContainer delay={0.1}>
          <GlassCard className="mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-blue/20">
                {vehicle.type === "car" ? (
                  <Car className="h-10 w-10 text-accent-blue" />
                ) : (
                  <Bike className="h-10 w-10 text-accent-cyan" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-display font-extrabold mb-2">{vehicle.name}</h1>
                <p className="text-slate-400 mb-3">
                  {vehicle.model} • {vehicle.year} • {vehicle.fuel.toUpperCase()}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-accent-blue" />
                    <span>{vehicle.km.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-accent-cyan" />
                    <span>{vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-accent-magenta" />
                    <span>Last Service: {vehicle.lastServiceDate ? formatDate(vehicle.lastServiceDate) : "N/A"}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ProgressRing progress={health} size={80} strokeWidth={6} />
                <p className="text-xs text-slate-400">Vehicle Health</p>
              </div>
            </div>
          </GlassCard>
        </AnimatedContainer>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Predictions */}
          <AnimatedContainer delay={0.15}>
            <GlassCard>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Maintenance Predictions
              </h2>
              {predictions.length === 0 ? (
                <p className="text-sm text-slate-400">No maintenance issues predicted.</p>
              ) : (
                <div className="space-y-3">
                  {predictions.slice(0, 5).map((pred) => (
                    <div
                      key={pred.id}
                      className="flex items-start justify-between rounded-xl border border-white/10 bg-white/5 p-3"
                    >
                      <div>
                        <p className="font-semibold text-sm">{pred.part}</p>
                        <p className="text-xs text-slate-400">{pred.description}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${
                          pred.severity === "critical"
                            ? "bg-red-500/20 text-red-400"
                            : pred.severity === "high"
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {pred.severity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <Link href="/predictions" className="btn-primary mt-4 w-full text-center text-sm">
                View All Predictions
              </Link>
            </GlassCard>
          </AnimatedContainer>

          {/* Service History */}
          <AnimatedContainer delay={0.2}>
            <GlassCard>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-accent-cyan" />
                Service History
              </h2>
              {serviceHistory.length === 0 ? (
                <p className="text-sm text-slate-400">No service history available.</p>
              ) : (
                <div className="space-y-4">
                  {serviceHistory.map((service) => (
                    <div
                      key={service.id}
                      className="rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{service.type}</p>
                          <p className="text-sm text-slate-400">{service.garage}</p>
                        </div>
                        <p className="text-sm font-semibold text-accent-cyan">
                          {formatCurrency(service.cost)}
                        </p>
                      </div>
                      <div className="text-xs text-slate-500 space-y-1">
                        <p>{formatDate(service.date)} • {service.km.toLocaleString()} km</p>
                        <p>Parts: {service.parts.join(", ")}</p>
                        {service.notes && <p className="text-slate-400 italic">{service.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </AnimatedContainer>
        </div>

        {/* Quick Actions */}
        <AnimatedContainer delay={0.25}>
          <div className="mt-6 flex gap-4">
            <Link href={`/bookings/new?vehicleId=${vehicle.id}`} className="btn-primary flex-1 text-center">
              Schedule Service
            </Link>
            <Link href="/assistant" className="btn-ghost flex-1 text-center">
              Ask AI Assistant
            </Link>
          </div>
        </AnimatedContainer>
      </main>
    </div>
  );
}
