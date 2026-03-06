"use client";

import { Navbar } from "@/components/layout/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { ProgressRing } from "@/components/ui/progress-ring";
import { AnimatedTrafficScene } from "@/components/ui/animated-traffic";
import { Car, Bike, Plus } from "lucide-react";
import Link from "next/link";
import { mockVehicles, mockServiceHistory } from "@/lib/data/mock-data";
import { predictPartFailures, calculateVehicleHealth } from "@/lib/ai/predictive-maintenance";

export default function VehiclesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedTrafficScene dimmed />
      <Navbar />
      <main className="container mx-auto px-6 py-10">
        <AnimatedContainer>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl font-display font-extrabold mb-2 bg-accent-gradient bg-clip-text text-transparent">
                My Vehicles
              </h1>
              <p className="text-slate-400">Manage your cars and bikes</p>
            </div>
            <Link href="/vehicles/new" className="btn-primary">
              <Plus className="h-4 w-4" />
              Add Vehicle
            </Link>
          </div>
        </AnimatedContainer>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockVehicles.map((vehicle, idx) => {
            const history = mockServiceHistory.filter((s) => s.vehicleId === vehicle.id);
            const predictions = predictPartFailures(vehicle, history);
            const health = calculateVehicleHealth(vehicle, predictions);

            return (
              <AnimatedContainer key={vehicle.id} delay={0.1 * idx}>
                <GlassCard hover>
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        vehicle.type === "car" ? "bg-accent-blue/20" : "bg-accent-cyan/20"
                      }`}
                    >
                      {vehicle.type === "car" ? (
                        <Car className="h-6 w-6 text-accent-blue" />
                      ) : (
                        <Bike className="h-6 w-6 text-accent-cyan" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{vehicle.name}</h3>
                      <p className="text-xs text-slate-400">
                        {vehicle.model} • {vehicle.year}
                      </p>
                    </div>
                    <ProgressRing progress={health} size={50} strokeWidth={4} />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Fuel Type</span>
                      <span className="font-medium">{vehicle.fuel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Kilometers</span>
                      <span className="font-medium">{vehicle.km.toLocaleString()} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Service</span>
                      <span className="font-medium">{vehicle.lastServiceDate || "N/A"}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/vehicles/${vehicle.id}`}
                      className="btn-ghost text-xs flex-1 text-center"
                    >
                      Service History
                    </Link>
                    <Link
                      href={`/bookings/new?vehicleId=${vehicle.id}`}
                      className="btn-primary text-xs flex-1 text-center"
                    >
                      <span className="flex items-center justify-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <circle cx="12" cy="12" r="8" />
                          <circle cx="12" cy="12" r="2" />
                          <path d="M12 4v3" />
                          <path d="M12 20v-3" />
                          <path d="M4 12h3" />
                          <path d="M20 12h-3" />
                        </svg>
                        Book Now
                      </span>
                    </Link>
                  </div>
                </GlassCard>
              </AnimatedContainer>
            );
          })}
        </div>
      </main>
    </div>
  );
}
