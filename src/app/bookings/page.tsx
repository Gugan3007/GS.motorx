"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { AnimatedTrafficScene } from "@/components/ui/animated-traffic";
import { Modal } from "@/components/ui/modal";
import { Calendar, MapPin, Clock, Plus, X } from "lucide-react";
import { mockBookings, mockVehicles, mockGarages } from "@/lib/data/mock-data";
import { Booking } from "@/types";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviewBookingId, setReviewBookingId] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const storedBookings = localStorage.getItem("gs-motorx-bookings");
    if (storedBookings) {
      try {
        setBookings(JSON.parse(storedBookings));
      } catch (e) {
        setBookings(mockBookings);
      }
    } else {
      setBookings(mockBookings);
    }
  }, []);

  const bookingsWithRefs = useMemo(
    () =>
      bookings.map((booking) => ({
        ...booking,
        vehicle: mockVehicles.find((v) => v.id === booking.vehicleId),
        garage: mockGarages.find((g) => g.id === booking.garageId)
      })),
    [bookings]
  );

  const handleCancel = (id: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b));
      localStorage.setItem("gs-motorx-bookings", JSON.stringify(updated));
      return updated;
    });
  };

  const handleOpenReview = (id: string) => {
    setReviewBookingId(id);
    setReviewText("");
    setReviewRating(5);
  };

  const handleSubmitReview = () => {
    setReviewBookingId(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedTrafficScene dimmed />
      <Navbar />
      <main className="container mx-auto px-6 py-10">
        <AnimatedContainer>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl font-display font-extrabold mb-2 bg-accent-gradient bg-clip-text text-transparent">
                My Bookings
              </h1>
              <p className="text-slate-400">View and manage service appointments</p>
            </div>
            <Link href="/bookings/new" className="btn-primary">
              <Plus className="h-4 w-4" />
              New Booking
            </Link>
          </div>
        </AnimatedContainer>

        <div className="space-y-6">
          {bookingsWithRefs.map((booking, idx) => {
            const vehicle = booking.vehicle;
            const garage = booking.garage;

            return (
              <AnimatedContainer key={booking.id} delay={0.1 * idx}>
                <GlassCard hover>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">{vehicle?.name}</h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            booking.status === "confirmed"
                              ? "bg-green-500/20 text-green-400"
                              : booking.status === "completed"
                                ? "bg-blue-500/20 text-blue-400"
                                : booking.status === "cancelled"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent-blue" />
                          <span>{garage?.name} - {garage?.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-accent-cyan" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent-magenta" />
                          <span>{booking.time}</span>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-slate-400">Service: </span>
                        <span className="font-medium">{booking.serviceType}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {booking.status === "confirmed" && (
                        <>
                          {garage?.address && (
                            <Link
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(garage.address)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-ghost text-xs"
                            >
                              <MapPin className="h-3 w-3" />
                              View Location
                            </Link>
                          )}
                          <button
                            className="btn-ghost text-xs text-red-400 hover:bg-red-500/10"
                            onClick={() => handleCancel(booking.id)}
                          >
                            Cancel Booking
                          </button>
                        </>
                      )}
                      {booking.status === "completed" && (
                        <button
                          className="btn-primary text-xs"
                          onClick={() => handleOpenReview(booking.id)}
                        >
                          Write Review
                        </button>
                      )}
                      {booking.status === "pending" && (
                        <Link
                          href={`/bookings/new?vehicleId=${booking.vehicleId}&garageId=${booking.garageId}`}
                          className="btn-ghost text-xs"
                        >
                          Complete Booking
                        </Link>
                      )}
                      {booking.status === "cancelled" && (
                        <div className="text-xs text-slate-500 italic">Cancelled by user</div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </AnimatedContainer>
            );
          })}
        </div>

        {/* Review Modal */}
        {reviewBookingId && (
          <Modal
            isOpen={!!reviewBookingId}
            onClose={() => setReviewBookingId(null)}
            title="Write a Review"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      className={`btn-ghost text-xs ${reviewRating === r ? "bg-white/10 border border-white/10" : ""}`}
                      onClick={() => setReviewRating(r)}
                    >
                      {r} ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Comments</label>
                <textarea
                  className="input min-h-[120px]"
                  placeholder="Share your experience"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button className="btn-ghost" onClick={() => setReviewBookingId(null)}>
                  <X className="h-4 w-4" />
                  Close
                </button>
                <button className="btn-primary" onClick={handleSubmitReview}>
                  Submit Review
                </button>
              </div>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
}
