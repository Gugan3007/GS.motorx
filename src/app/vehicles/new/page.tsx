"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { GlassCard } from "@/components/ui/glass-card";
import { Car, Bike, Fuel, Gauge, Calendar, CheckCircle2 } from "lucide-react";

export default function NewVehiclePage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving">("idle");
  const [form, setForm] = useState({
    name: "",
    model: "",
    year: "",
    type: "car",
    fuel: "Petrol",
    km: ""
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.model || !form.year || !form.km) return;
    setStatus("saving");
    setTimeout(() => {
      setSuccess(true);
      setStatus("idle");
      setTimeout(() => router.push("/vehicles"), 900);
    }, 700);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-10">
        <AnimatedContainer>
          <div className="mb-8">
            <h1 className="text-4xl font-display font-extrabold mb-2 bg-accent-gradient bg-clip-text text-transparent">
              Add Vehicle
            </h1>
            <p className="text-slate-400">Save a new car or bike to your garage.</p>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.05}>
          <GlassCard className="max-w-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-200">
                  Name
                  <input
                    className="input"
                    placeholder="e.g., Honda City"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-200">
                  Model
                  <input
                    className="input"
                    placeholder="e.g., ZX CVT"
                    value={form.model}
                    onChange={(e) => handleChange("model", e.target.value)}
                    required
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-200">
                  Year
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-accent-cyan" />
                    <input
                      className="input"
                      type="number"
                      min="1990"
                      max="2030"
                      placeholder="2022"
                      value={form.year}
                      onChange={(e) => handleChange("year", e.target.value)}
                      required
                    />
                  </div>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-200">
                  Kilometers Driven
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-accent-blue" />
                    <input
                      className="input"
                      type="number"
                      min="0"
                      placeholder="45000"
                      value={form.km}
                      onChange={(e) => handleChange("km", e.target.value)}
                      required
                    />
                  </div>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-200">
                  Type
                  <div className="flex gap-2">
                    {[
                      { key: "car", label: "Car", icon: <Car className="h-4 w-4" /> },
                      { key: "bike", label: "Bike", icon: <Bike className="h-4 w-4" /> }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleChange("type", opt.key)}
                        className={`btn-ghost text-xs ${form.type === opt.key ? "bg-white/10 border border-white/10" : ""}`}
                      >
                        {opt.icon}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-200">
                  Fuel Type
                  <div className="flex gap-2">
                    {["Petrol", "Diesel", "EV", "CNG"].map((fuel) => (
                      <button
                        key={fuel}
                        type="button"
                        onClick={() => handleChange("fuel", fuel)}
                        className={`btn-ghost text-xs ${form.fuel === fuel ? "bg-white/10 border border-white/10" : ""}`}
                      >
                        <Fuel className="h-4 w-4" />
                        {fuel}
                      </button>
                    ))}
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button type="button" className="btn-ghost" onClick={() => router.push("/vehicles")}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={status === "saving"}>
                  {status === "saving" ? "Saving..." : "Save Vehicle"}
                </button>
              </div>

              {success && (
                <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">
                  <CheckCircle2 className="h-4 w-4" />
                  Vehicle saved! Redirecting to My Vehicles...
                </div>
              )}
            </form>
          </GlassCard>
        </AnimatedContainer>
      </main>
    </div>
  );
}
