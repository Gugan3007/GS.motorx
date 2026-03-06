"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { AnimatedTrafficScene } from "@/components/ui/animated-traffic";
import { ArrowLeft, Calendar, Clock, MapPin, Car as CarIcon } from "lucide-react";
import { mockVehicles, mockGarages } from "@/lib/data/mock-data";
import Link from "next/link";
import { motion } from "framer-motion";

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vehicleId = searchParams.get("vehicleId");
  const garageId = searchParams.get("garageId");

  const [selectedVehicle, setSelectedVehicle] = useState(vehicleId || mockVehicles[0].id);
  const [selectedGarage, setSelectedGarage] = useState(garageId || mockGarages[0].id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [serviceType, setServiceType] = useState("Regular Service");
  const [notes, setNotes] = useState("");

  const vehicle = mockVehicles.find((v) => v.id === selectedVehicle);
  const garage = mockGarages.find((g) => g.id === selectedGarage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!date || !time) {
      alert("Please select both date and time");
      return;
    }

    // Create new booking
    const newBooking = {
      id: `b${Date.now()}`,
      vehicleId: selectedVehicle,
      garageId: selectedGarage,
      date,
      time,
      status: "confirmed" as const,
      serviceType,
      estimatedCost: 3500,
      notes
    };

    // Get existing bookings from localStorage
    const existingBookingsStr = localStorage.getItem("gs-motorx-bookings");
    const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];

    // Add new booking
    const updatedBookings = [newBooking, ...existingBookings];
    localStorage.setItem("gs-motorx-bookings", JSON.stringify(updatedBookings));

    // Show success message
    alert(`✓ Booking confirmed!\n\n${vehicle?.name}\n${garage?.name}\n${date} at ${time}`);
    router.push("/bookings");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedTrafficScene dimmed />
      <Navbar />

      <main className="container mx-auto px-6 py-10 max-w-4xl">
        <AnimatedContainer>
          <Link
            href="/bookings"
            className="inline-flex items-center gap-2 text-accent-blue mb-6 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Bookings
          </Link>
          <h1 className="text-4xl font-display font-extrabold mb-2 bg-accent-gradient bg-clip-text text-transparent">
            Book a Service
          </h1>
          <p className="text-slate-400 mb-10">Schedule your vehicle maintenance</p>
        </AnimatedContainer>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Vehicle Selection */}
            <AnimatedContainer delay={0.1}>
              <GlassCard>
                <label className="block text-sm font-semibold mb-3">Select Vehicle</label>
                <select
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:border-accent-blue focus:outline-none"
                  required
                >
                  {mockVehicles.map((v) => (
                    <option key={v.id} value={v.id} className="bg-night-800 text-white">
                      {v.name} - {v.km.toLocaleString()} km
                    </option>
                  ))}
                </select>
                {vehicle && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                    <CarIcon className="h-4 w-4" />
                    {vehicle.type} • {vehicle.fuel}
                  </div>
                )}
              </GlassCard>
            </AnimatedContainer>

            {/* Garage Selection */}
            <AnimatedContainer delay={0.15}>
              <GlassCard>
                <label className="block text-sm font-semibold mb-3">Select Garage</label>
                <select
                  value={selectedGarage}
                  onChange={(e) => setSelectedGarage(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:border-accent-blue focus:outline-none"
                  required
                >
                  {mockGarages.map((g) => (
                    <option key={g.id} value={g.id} className="bg-night-800 text-white">
                      {g.name} - {g.rating}★
                    </option>
                  ))}
                </select>
                {garage && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="h-4 w-4" />
                    {garage.address}
                  </div>
                )}
                <Link href="/garages" className="mt-2 inline-block text-xs text-accent-blue hover:underline">
                  Browse all garages
                </Link>
              </GlassCard>
            </AnimatedContainer>
          </div>

          {/* Service Details */}
          <AnimatedContainer delay={0.2}>
            <GlassCard className="mt-6">
              <h3 className="text-lg font-bold mb-4">Service Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">Service Type</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:border-accent-blue focus:outline-none"
                    required
                  >
                    <option value="Regular Service" className="bg-night-800">Regular Service</option>
                    <option value="Major Service" className="bg-night-800">Major Service</option>
                    <option value="AC Repair" className="bg-night-800">AC Repair</option>
                    <option value="Brake Service" className="bg-night-800">Brake Service</option>
                    <option value="Battery Replacement" className="bg-night-800">Battery Replacement</option>
                    <option value="Tire Replacement" className="bg-night-800">Tire Replacement</option>
                    <option value="Engine Repair" className="bg-night-800">Engine Repair</option>
                    <option value="Other" className="bg-night-800">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:border-accent-blue focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:border-accent-blue focus:outline-none"
                    required
                  >
                    <option value="" className="bg-night-800">Select time</option>
                    <option value="09:00 AM" className="bg-night-800">09:00 AM</option>
                    <option value="10:00 AM" className="bg-night-800">10:00 AM</option>
                    <option value="11:00 AM" className="bg-night-800">11:00 AM</option>
                    <option value="12:00 PM" className="bg-night-800">12:00 PM</option>
                    <option value="02:00 PM" className="bg-night-800">02:00 PM</option>
                    <option value="03:00 PM" className="bg-night-800">03:00 PM</option>
                    <option value="04:00 PM" className="bg-night-800">04:00 PM</option>
                    <option value="05:00 PM" className="bg-night-800">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Additional Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific requests or issues..."
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-slate-500 focus:border-accent-blue focus:outline-none resize-none"
                />
              </div>
            </GlassCard>
          </AnimatedContainer>

          {/* Submit */}
          <AnimatedContainer delay={0.25}>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="btn-primary mt-6 w-full py-4 text-base"
            >
              Confirm Booking
            </motion.button>
          </AnimatedContainer>
        </form>
      </main>
    </div>
  );
}

export default function NewBookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}
